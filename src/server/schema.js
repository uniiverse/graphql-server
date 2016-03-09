import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';
import co from 'co';

import Listing from './listing';

var listingType = new GraphQLObjectType({
  name: 'Listing',
  description: 'An event listing',
  fields: function() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the listing.'
      },
      title: {
        type: GraphQLString,
        description: 'The title of the listing.'
      }
    };
  }
});

var rootQueryType =  new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: function() {
        return 'world';
      }
    },
    listings: {
      type: new GraphQLList(listingType),
      resolve: function() {
        return Listing.find().limit(10);
      }
    }
  }
});

var schema = new GraphQLSchema({
  query: rootQueryType
});

export var getProjection;
export default schema;
