import agent from 'agent';

function Manager() {

}

Manager.prototype.find = function(callback) {
  var self = this;

  agent.get('/customers').end(function(err, res) {
    if (err) return callback(err);

    callback(null, res.body);
  });

  return this;
};

Manager.prototype.persist = function(customer, callback) {
  var self = this;

  sanitize(customer);

  agent.post('/customers').send(customer).end(function(err, res) {
    if (err) return callback(err);

    callback(null);
  });

  return this;
};

export default Manager;

function sanitize(customer) {
  if (!customer.address.city) {
    delete customer.address;
  }
}
