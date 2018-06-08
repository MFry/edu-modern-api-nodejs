// Example: https://www.apollographql.com/docs/graphql-tools/#example
const { makeExecutableSchema } = require("graphql-tools");
const PaintingType = require("./PaintingType");
const Painting = require("./../models/Painting");

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

const resolvers = {
  Query: { books: () => books }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
