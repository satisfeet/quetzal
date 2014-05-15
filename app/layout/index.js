import page    from 'page';

import Body    from './body';
import Overlay from './overlay';
import Sidebar from './sidebar';
import Content from './content';

export var body    = new Body();
export var overlay = new Overlay();
export var content = new Content();

page(function(context, next) {
  new Sidebar(context).select(context.path);

  next();
});

overlay.on('opened', toggleBlur);
overlay.on('closed', toggleBlur);
content.on('appended', closeOverlay);

function toggleBlur() {
  body.toggleBlur();
}

function closeOverlay() {
  if (overlay.opened) overlay.close();
}
