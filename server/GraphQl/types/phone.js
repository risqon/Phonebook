
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql')

// Phone Type
// at this file we make a re-schema for our db
exports.phoneType = new GraphQLObjectType({
  name: 'phone',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLString
      },
      image: {
        type: GraphQLString
      }
    }
  }
});