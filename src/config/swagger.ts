const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Autenticação JWE",
      version: "1.0.0",
      description: "API documentation for the application",
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
