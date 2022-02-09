exports.swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API-KEYS",
      version: "1.0.0",
      description: "An API tracker",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};
