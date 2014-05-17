var Modal   = require('./modal');
var Content = require('./content');

var modal   = new Modal();
var content = new Content();

modal.on('opened', toggleBlur);
modal.on('closed', toggleBlur);
content.on('inserted', closeModal);

exports.modal = modal;
exports.content = content;

function toggleBlur() {
  content.blur();
}

function closeModal() {
  if (modal.opened) modal.close();
}
