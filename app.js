const Hapi = require("hapi");
const mongoose = require("mongoose");
const { graphqlHapi, graphiqlHapi } = require("apollo-server-hapi");
const Painting = require("./models/Painting");
const schema = require("./graphql/schema");


// Init Server
const server = new Hapi.Server({
  port: 8000,
  host: "localhost"
});

//Connect to db
mongoose.connect("mongodb://test:testing1@ds151180.mlab.com:51180/modern-api");
mongoose.connection.once("open", () => {
  console.log("Successful connection to db.");
});

// Painting Routes
server.route([
  {
    method: "GET",
    path: "/api/v1/paintings",
    handler: (request, h) => {
      return Painting.find();
    }
  },
  {
    method: "POST",
    path: "/api/v1/paintings",
    handler: (request, h) => {
      const { name, url, techniques } = request.payload;
      const painting = new Painting({
        name,
        url,
        techniques
      });
      return painting.save();
    }
  }
]);

//Add the route
server.route({
  method: "GET",
  path: "/hello",
  handler: (request, h) => {
    return "Hello World";
  }
});

server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return h.response("Hello World").code(200);
  }
});

//Dynamic Route
server.route({
  method: "GET",
  path: "/user/{name}",
  handler: (request, h) => {
    return h.response(`Hello ${request.params.name}`);
  }
});

//Start Server
const init = async () => {
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: "/graphiql",
      graphiqlOptions: {
        endpointURL: "/graphql"
      }
    },
    route: {
      cors: true
    }
  });
  await server.register({
    plugin: graphqlHapi,
    options: {
      path: "/graphql",
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  });
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server started at: ${server.info.uri}`);
};
init();
