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

      type: GraphQLString,
    },
    }
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: function() {
          return 'world';
        }
      }
    }
  })
});

export var getProjection;
export default schema;
