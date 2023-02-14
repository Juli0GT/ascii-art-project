import express from 'express';
import expressWs from 'express-ws';
import expressRequestId from 'express-request-id';
import { AwilixContainer, Lifetime, asValue, createContainer } from 'awilix';
import pino from 'pino';
import swaggerTools from 'swagger-tools';

import LoggerInterface from './domain/definitions/logger.interface';

import serverAdapter from './infrastructure/adapters/server/server.adapter';
import dbAdapter from './infrastructure/adapters/db.adapter';

import uploadController from './infrastructure/controllers/upload.controller';
import uploadUsecases from './usecases/Upload/upload.usecases';
import UploadRepositoryInterface from './domain/abstractions/uploadRepository.interface';

const container: AwilixContainer = createContainer();

container.loadModules(
  [
    `${__dirname}/**/*.usecases.{ts,js}`,
    `${__dirname}/**/*.adapter.{ts,js}`,
    `${__dirname}/**/logger.{ts,js}`,
    `${__dirname}/**/*.controller.{ts,js}`,
    `${__dirname}/**/*.repository.{ts,js}`,
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
    },
  }
);

container.register({
  express: asValue(express),
  expressRequestId: asValue(expressRequestId),
  expressWs: asValue(expressWs),
  swaggerTools: asValue(swaggerTools),
  pino: asValue(pino),
});

export default container;

export type Dependencies = {
  // Libraries
  express: typeof express;
  expressWs: typeof expressWs;
  swaggerTools: typeof swaggerTools;
  pino: pino;
  expressRequestId: typeof expressRequestId;

  // Definitions
  logger: LoggerInterface;

  // Adapters
  serverAdapter: ReturnType<typeof serverAdapter>;
  dbAdapter: ReturnType<typeof dbAdapter>;

  // Controllers
  uploadController: ReturnType<typeof uploadController>

  // Usecases
  uploadUsecases: ReturnType<typeof uploadUsecases>;

  // Repositories
  uploadRepository: UploadRepositoryInterface
};
