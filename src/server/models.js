import mongoose from 'mongoose';

var ListingSchema = new mongoose.Schema({
  _id: { type: String }, // HACK: "developer-friendliness" of Listing ids -_-'
  slug: { type: String },
  title: { type: String },
  description: { type: String },
  description_html: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId },
  category_key: { type: String },
  hashtag: { type: String },
  location: { type: String },
  website: { type: String },
  show_count: { type: Boolean },
  show_avatars_of_bookers: { type: Boolean },
  show_tickets_sold_count: { type: Boolean },
  hide_date: { type: Boolean },
  capacity: { type: Number },
  state: { type: String }
}, { collection: 'listings' });

var EventSchema = new mongoose.Schema({
  _id: { type: String },
  listing_id: { type: String },
  start_stamp: { type: String },
  end_stamp: { type: String },
  city_name: { type: String }
}, { collection: 'events' });

var RateSchema = new mongoose.Schema({

});

var CapacitySchema = new mongoose.Schema({

});

var CategorySchema = new mongoose.Schema({

});

export default {
  Listing: mongoose.model('Listing', ListingSchema),
  Event: mongoose.model('Event', EventSchema),
  Rate: mongoose.model('Rate', RateSchema),
  Capacity: mongoose.model('Capacity', CapacitySchema),
  Category: mongoose.model('Category', CategorySchema)
};
