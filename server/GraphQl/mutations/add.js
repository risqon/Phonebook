const{GraphQLNonNull,GraphQLString,GraphQLID, GraphQLInt}=require('graphql')
const { phoneType } = require('../types/phone');
var services = require('../../services');

exports.add = {
    type: phoneType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString),
        },
        image: {
            type: new GraphQLNonNull(GraphQLString)
        },

    },
    resolve(root, params) {
        return services.addPhones(params);
    }
}