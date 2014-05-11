import page      from 'page';
import shell     from 'shell';
import customers from 'customers';

page('/customers', resolve, function(context, next) {
  var models = context.state.customers;

  shell.layout
    .empty()
    .append(customers.table.list(models).element);
});

function resolve(context, next) {
  if (context.state.customers) return next();

  customers.manager.find(function(customers) {
    context.state.customers = customers;

    next();
  });
}
