import { AppError } from './utils/app-error';
import express from 'express';
import mongoose from 'mongoose';
import { BASE_PATH, MONGODB_URI } from './config';
import { logger } from './utils/logger';
import { globalMiddlewares, errorHandler } from './middleware';

class App {
  constructor() {
    this.express = express();
    this.basePath = BASE_PATH || '';
    this.boot();
  }

  boot() {
    this.initializeDb();
    this.registerMiddlewares();
    this.mountRoutes();
    this.handleUncaughtErrorEvents();
  }

  mountRoutes() {
    // this.express.use(`${this.basePath}/auth`, authRouter);
    
  }

  registerMiddlewares() {
    globalMiddlewares(this.express);
  }

  initializeDb() {
    // stop ensureIndex deprecation warning
    mongoose.set('useCreateIndex', true);

    // Connect to our Database and handle any bad connections
    mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        logger.info('Database connection established');
      })
      .catch(err => {
        throw new AppError(`Error connecting to the database: ${err.message}`);
      });
  }

  // Error handlers
  handleUncaughtErrorEvents() {
    process.on('unhandledRejection', (reason, promise) => {
      throw reason;
    });

    process.on('uncaughtException', error => {
      logger.error(
        `Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`
      );
      process.exit(1);
    });

    process.on('SIGINT', () => {
      logger.info(' Alright! Bye bye!');
      process.exit();
    });

    this.express.use(errorHandler);
  }
}

const app = new App().express;
export default app;