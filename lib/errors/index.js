module.exports = function(app) {

  app.on('error', function(error) {
    if (error.message) console.error(error.message);
    if (error.stack) console.error(error.stack);
  });

};
