var lodash = require('lodash');

function Product() {

}

Product.prototype.fromForm = function(body) {
  body.images = lodash.chain(body.images.split(','))
    .map(function(item)    {
      var parts = item.split(':');

      return {
        name: parts.shift().trim().toLowerCase(),
        url: parts.join(':').trim().toLowerCase()
      };
    })
    .value();

  body.details = lodash.chain(body.details.split(','))
    .map(mapKeyValue)
    .reduce(reduceFirst, [])
    .reduce(reduceSecond, {})
    .value();

  body.details.material = lodash.chain(body.details.material)
    .mapValues(function(value) {
      if (lodash.isArray(value) && value.length === 1) {
        return value.shift();
      } else {
        return value;
      }
    })
    .value();


  body.variations = lodash.chain(body.variations.split(','))
    .map(mapKeyValue)
    .reduce(reduceFirst, [])
    .reduce(reduceSecond, {})
    .value();

  return lodash.chain(this)
    .merge(body)
    .value();
};

Product.prototype.toForm = function() {
  var object = lodash.cloneDeep(this);

  object.images = lodash.chain(object.images)
    .map(function(item) {
      return item.name + ':' + item.url;
    })
    .join(', ')
    .value();

  object.details = lodash.chain(object.details)
    .transform(function(result, value, key) {
      if (this.key) key = this.key + ':' + key;

      if (lodash.isPlainObject(value)) {
        this.key = key;


        // NEEDS REWORK!!!!
        lodash.transform(value, this, result, this);
      } else {
        result[key] = value;
      }
    }, {})
    .value();

  object.variations = lodash.chain(object.variations)
    .value();

  return object;
};

module.exports = Product;

function mapKeyValue(item) {
  var parts = item.split(':');

  return {
    key: parts.shift().trim(),
    value: parts.join(':').trim()
  };
}

function reduceFirst(prev, curr) {
  var pair = prev.find(function(item) {
    return item.key === curr.key;
  });

  if (!pair) {
    pair = {
      key: curr.key,
      value: [curr.value]
    };
    prev.push(pair);
  } else {
    if (!~pair.value.indexOf(curr.value)) {
      pair.value.push(curr.value);
    }
  }

  return prev;
}

function reduceSecond(prev, curr) {
  if (Array.isArray(curr.value) && curr.value.join('').contains(':')) {
    curr.value = curr.value
      .map(mapKeyValue)
      .reduce(reduceFirst, [])
      .reduce(reduceSecond, {})
  }
  if (!prev[curr.key]) {
    prev[curr.key] = curr.value;
  }

  return prev;
}
