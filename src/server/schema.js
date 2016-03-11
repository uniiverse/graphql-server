import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} from 'graphql/type';
import co from 'co';
import mongoose from 'mongoose';

import models from './models';

var makeGQLString = function(desc) {
  return {
    type: GraphQLString,
    description: desc
  };
};

var makeNonNullGQLString = function(desc) {
  return {
    type: new GraphQLNonNull(GraphQLString),
    description: desc
  };
};

var makeGQLBoolean = function(desc) {
  return {
    type: GraphQLBoolean,
    description: desc
  };
};

var makeGQLInt = function(desc) {
  return {
    type: GraphQLInt,
    description: desc
  };
};

var listingType = new GraphQLObjectType({
  name: 'Listing',
  description: 'An event listing',
  fields: function() {
    return {
      id: makeNonNullGQLString('The id of the listing.'),
      slug: makeNonNullGQLString('slug'),
      title: makeGQLString('The title of the listing.'),
      description: makeGQLString('description'),
      description_html: makeGQLString('description_html'),
      category_id: GraphQLID,
      category_key: makeGQLString('category_key'),
      hashtag: makeGQLString('hashtag'),
      location: makeGQLString('location'),
      website: makeGQLString('website'),
      show_count: makeGQLInt('show count'),
      show_avatars_of_bookers: makeGQLBoolean('show_avatars_of_bookers'),
      show_tickets_sold_count: makeGQLBoolean('show_tickets_sold_count'),
      hide_date: makeGQLBoolean('hide_date'),
      capacity: makeGQLString('Capacity of the listing'),
      state: makeNonNullGQLString('State of the listing')
    };
  }
});

var eventType = new GraphQLObjectType({
  name: 'Event',
  description: 'An event',
  fields: function() {
    return {
      id: makeNonNullGQLString('Event id'),
      start_stamp: makeNonNullGQLString('Start of the event, timestamp'),
      end_stamp: makeNonNullGQLString('End of the event, timestamp'),
      city_name: makeGQLString('Event that the city is in')
    };
  }
});

var rootQueryType =  new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    listings: {
      type: new GraphQLList(listingType),
      resolve: function(parent, args, ast) {
        return models.Listing.find().limit(10);
      }
    },
    listing: {
      type: listingType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function(parent, args, ast) {
        return models.Listing.findOne({ _id: args.id });
      }
    },
    events: {
      type: new GraphQLList(eventType),
      args: {
        listing_id: {
          name: 'listing_id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function(parent, args, ast) {
        return models.Event.find({ listing_id: args.listing_id });
      }
    }
  }
});

var schema = new GraphQLSchema({
  query: rootQueryType
});

export var getProjection;
export default schema;
