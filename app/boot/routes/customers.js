import page      from 'page';
import layout    from '../layout';
import customers from 'customers';

console.log(customers);

page('/customers', resolve, function(context, next) {
  customers.table.list(context.state.customers);

  layout.empty().insert(customers.table.element);
});

function resolve(context, next) {
  if (context.state.customers) return next();

  customers.manager.find(function(customers) {
    context.state.customers = customers;

    next();
  });
}
