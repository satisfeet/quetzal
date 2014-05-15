import page   from 'page';
import layout from 'layout';

page('/products', function(context, next) {
  layout.content.element.innerHTML = '<p>products</p>';
});
