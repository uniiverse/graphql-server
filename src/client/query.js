import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');
var userId = '559645cd1a38532d14349246';

var port = process.env.PORT || 3000;
var dataUrl = `http://localhost:${port}/data`;

function graphQuery(queryString, callback) {
  return request.get(dataUrl).query({
    query: queryString
  }).end(function(err, res) {
    debug(err || res.body);
    debug(res);
    if (err) {
    } else {
      callback(res.body.data);
    }
  });
}

graphQuery(`{ hello, listings { id, title } }`, function(data) {
  var listings = data.listings;
  var i;
  console.log('Listings!');
  for (i = 0; i < listings.length; i += 1) {
    console.log(`i) ${listings[i].title}: ${listings[i].id}`);
  }
});
