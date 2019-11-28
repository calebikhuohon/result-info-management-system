import { jwtStrategy } from './passport';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';

export const globalMiddlewares = (app) => {
  app.use(cors({ maxAge: 1728000 }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger('dev'));
  passport.use('jwt', jwtStrategy);
};
