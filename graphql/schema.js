// Example: https://www.apollographql.com/docs/graphql-tools/#example
const { makeExecutableSchema } = require("graphql-tools");
const PaintingType = require("./PaintingType");
const Painting = require("./../models/Painting");

// The GraphQL schema in string form
const typeDefs = `
  scalar Date

  type Address {
    street: String
    city: String
    state: String
    zipcode: String
  }

  type Course {
    label: String
  }

  type Query {
     Events: [Event]
     Event(id: ID!): Event
  }

  type Event {
     id: ID!
     teacher: String
     title: String
     description: String
     start_date: Date
     address: Address
     open_slots: Int
     max_slots: Int
     courses: [Course]
  }

  
`;

const resolvers = {
  Query: { Events: () => events }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
