import Body    from './body';
import Overlay from './overlay';
import Sidebar from './sidebar';
import Content from './content';

export var body    = new Body();
export var overlay = new Overlay();
export var sidebar = new Sidebar();
export var content = new Content();

overlay.on('opened', function() {
  body.addBlur();
});

overlay.on('closed', function() {
  body.removeBlur();
});