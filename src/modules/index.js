import authenticationRouter from './authentication';
import itemRouter from './item';


const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, authenticationRouter);
  app.use(apiPrefix, itemRouter);
  return app;
};

export default routes;
