import shell     from 'shell';
import customers from 'customers';

export default = function(context, next) {
  customers.manager.find(function(result) {
    shell.layout.empty().append(customers.table.list(result).element);
  });
};