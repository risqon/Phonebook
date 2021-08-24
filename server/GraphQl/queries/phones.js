const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')
const { getPhones, searchPhones } = require('../../services');
const { phoneType } = require('../types/phone')
const PaginationArgType = require('../types/paginationParam');
const PaginatedListType = require('../types/paginationOutput');


exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      phones: {
        type: PaginatedListType(phoneType),
        args: {
          name: { type: GraphQLString },
          phone: { type: GraphQLString },
          image: { type: GraphQLString },
          pagination: {
            type: PaginationArgType,
            defaultValue: { offset: 0, limit: 3 }
          },
        },
        resolve: async (root, args) => {
          const { name, phone, image, pagination: { offset, limit } } = args

          if (name || phone || image) {
            const data = await searchPhones(name, phone, image, offset, limit)
            return {
              items: data.listData,
              totalData: data.dataLength
            }
          } else {
            const data = await getPhones(offset, limit)
            return {
              items: data.listData,
              totalData: data.totalData
            }
          }

        }
      }
    }
  }
})