module.exports = function(app) {

  app.on('error', function(error) {
    if (error.stack) return console.error(error.stack);

    console.error(error.message);
  });

};
