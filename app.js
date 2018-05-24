const Hapi = require("hapi");

// Init Server
const server = new Hapi.Server({
  port: 8000,
  host: "localhost"
});

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
const start = async () => {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server started at: ${server.info.uri}`);
};
start();
