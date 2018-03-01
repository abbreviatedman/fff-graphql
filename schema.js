import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql'

const fetch = require('node-fetch',)
const util = require('util',)
const { parseString, } = require('xml2js',)

const parseXML = util.promisify(parseString,)
const API_KEY = '9dJimr5lVjOx8knHCjMGtw'
const DUMMY_URI = `https://www.goodreads.com/author/show.xml?id=4432&key=${API_KEY}`

// const dummyData = fetch(DUMMY_URI)
//   .then(response => response.text())
//   .then(parseXML)

const AuthorType = new GraphQLSchema({
  name: 'Author',
  description: '', // TODO: add desc.
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
      },
    }),
  },),
},)

module.exports = schema
