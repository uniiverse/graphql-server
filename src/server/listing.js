import mongoose from 'mongoose';

var ListingSchema = new mongoose.Schema({
  title: {
    type: String
  }
});

var Listing = mongoose.model('Listing', ListingSchema);

export default Listing;
