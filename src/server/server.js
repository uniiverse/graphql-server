import Router from 'koa-router';
import koa from 'koa';
import mongoose from 'mongoose';
import parseBody from 'co-body';
import qs from 'koa-qs';
import {graphql} from 'graphql';

import schema from './schema';

let port = process.env.PORT || 3000;
let routes = new Router();
let DATABASE = 'uniiverse_development';
var app = koa();

// support nested query tring params
qs(app);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/' + DATABASE);
}

routes.get('/data', function* () {
  var query = this.query.query;
  var params = this.query.params;

  var resp = yield graphql(schema, query, '', params);

  if (resp.errors) {
    this.status = 400;
    this.body = {
      errors: resp.errors
    };
    return;
  }

  this.body = resp;
});

routes.post('/data', function* () {
  var payload = yield parseBody(this);
  var resp = yield graphql(schema, payload.query, '', payload.params);

  if (resp.errors) {
    this.status = 400;
    this.body = {
      errors: resp.errors
    };
    return;
  }

  this.body = resp;
});

app.use(routes.middleware());

app.listen(port, () => {
  console.log('app is listening on ' + port);
});

module.exports = app;
