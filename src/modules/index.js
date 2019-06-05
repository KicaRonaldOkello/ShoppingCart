import authenticationRouter from './authentication';


const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, authenticationRouter);
  return app;
}

export default routes;