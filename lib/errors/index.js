module.exports = function(app) {

  app.on('error', function(erorr) {
    if (error.stack) return console.error(error.stack);

    console.error(error);
  });

};
