const{GraphQLNonNull,GraphQLID,GraphQLString}=require('graphql')
const { phoneType } = require('../types/phone');
const services = require('../../services');
exports.updateContact = {
  type: phoneType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(root, params) {
    return services.updatePhone(params)
  }
}