const env = require('./environment.js');


const defaultConfig = {
  databaseUrl: env.DATABASE_URL,
  dialect: env.DATABASE_DIALECT || 'postgres',
  logging: false,
  use_env_variable: 'DATABASE_URL',
};

const database = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  }
};

module.exports = database;
