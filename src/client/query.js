import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');
var userId = '559645cd1a38532d14349246';

var port = process.env.PORT || 3000;
var dataUrl = `http://localhost:${port}/data`;


graphQuery(`{ listings { id, title } }`, function(data) {
  var listings = data.listings;
  var i;
  console.log('Listings!');
  for (i = 0; i < listings.length; i += 1) {
    console.log(`${i + 1}) ${listings[i].title}: ${listings[i].id}`);
  }
});

graphQuery(`{ listings { id, title, slug, hashtag, category_id } }`, function(data) {
  printObjects(data.listings);
  var id = data.listings[0].id;
  graphQuery(`{ listing(id: "${id}") { id, title, website, capacity, state } }`, function(data) {
    var listing = data.listing;
    console.log(`${listing.id}: ${listing.title}, ${listing.website}, ${listing.capacity}, ${listing.state}`);
  });
});

function graphQuery(queryString, callback) {
  return request.get(dataUrl).query({
    query: queryString
  }).end(function(err, res) {
    debug(err || res.body);
    if (err) {
      debug(res);
    } else {
      callback(res.body.data);
    }
  });
}

function printObjects(objs) {
  var i;
  console.log('Objects!');
  for (i = 0; i < objs.length; i += 1) {
    console.log(objs[i]);
  }
}
