export default {
  client: {
    output: "./generated/prisma",
    moduleFormat: "cjs",
  },
  datasources: {
    db: {
      adapter: "postgresql",
      url: process.env.DATABASE_URL, // connection from .env
    },
  },
};
