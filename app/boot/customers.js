import shell     from 'shell';
import customers from 'customers';

export function list(context, next) {
  customers.manager.find(function(result) {
    shell.layout.empty().append(customers.table.list(result).element);
  });
}

export function create(context, next) {
  shell.layout.empty().append(customers.form.element);
}