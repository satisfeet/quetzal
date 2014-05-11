import shell     from 'shell';
import customers from 'customers';

var manager = new customers.Manager();

export function list(context, next) {
  var table = new customers.Table();

  manager.find(function(err, result) {
    shell.layout.empty().append(table.list(result).element);
  });
}

export function create(context, next) {
  var form = new customers.Form().once('submit', persist);

  shell.layout.empty().append(form.element);
}

function persist(customer) {
  manager.persist(customer, function(err) {
    if (err) throw err;
  });
}