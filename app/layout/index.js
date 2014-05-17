import Overlay from './overlay';
import Content from './content';

export var overlay = new Overlay();
export var content = new Content();

overlay.on('opened', toggleBlur);
overlay.on('closed', toggleBlur);
content.on('inserted', closeOverlay);

function toggleBlur() {
  content.blur();
}

function closeOverlay() {
  if (overlay.opened) overlay.close();
}
