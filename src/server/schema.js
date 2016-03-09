import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';
import co from 'co';


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
