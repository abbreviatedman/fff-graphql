const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql',)

const fetch = require('node-fetch',)
const util = require('util',)
const { parseString, } = require('xml2js',)

const API_KEY = '9dJimr5lVjOx8knHCjMGtw'

const parseXML = util.promisify(parseString,)

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '', // TODO: add desc.
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (xml,) => xml.GoodreadsResponse.author[0].name[0],
    },
  }),
},)

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '', // TODO: add desc.
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: {
            type: GraphQLInt,
          },
        },
        resolve: (parentValue, args,) =>
          fetch(
            `https://www.goodreads.com/author/show.xml?id=${
              args.id
            }&key=${API_KEY}`,
          )
            .then((response,) => response.text(),)
            .then(parseXML,),
      },
    }),
  },),
},)

module.exports = schema
