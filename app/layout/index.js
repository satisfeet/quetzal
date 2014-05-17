var Overlay = require('./overlay');
var Content = require('./content');

var overlay = new Overlay();
var content = new Content();

overlay.on('opened', toggleBlur);
overlay.on('closed', toggleBlur);
content.on('inserted', closeOverlay);

exports.overlay = overlay;
exports.content = content;

function toggleBlur() {
  content.blur();
}

function closeOverlay() {
  if (overlay.opened) overlay.close();
}