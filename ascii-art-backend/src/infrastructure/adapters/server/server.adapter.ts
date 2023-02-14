import cors from 'cors';

import { Dependencies } from '../../../container';
import { SwaggerRequestParameters } from 'swagger-tools';
import errorMiddleware from './middlewares/error.middleware';
import LoggerInterface from '../../../domain/definitions/logger.interface';
import loggerMiddleware from './middlewares/logger.middleware';
import swaggerParamsMiddleware from './middlewares/swaggerParams.middleware';
import { startWebSocket } from './websocket';


type ServerConfig = {
  port: number;
  host: string,
  controllersPath: string;
  apiDefinition;
}

export type ServerRequest = Express.Request & {
  swagger: {
    params: SwaggerRequestParameters
  };
  params: Record<string, unknown>;
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  logger: LoggerInterface;
  id: string;
};

export default ({ express, expressWs, swaggerTools, logger, expressRequestId, uploadUsecases }: Dependencies) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = express() as any;
  expressWs(app);
  startWebSocket(app, uploadUsecases);
  app.use(cors({
    origin: '*',
  }));

  return (serverConfig: ServerConfig) => {
    const options = {
      controllers: serverConfig.controllersPath,
    };

    // Initialize the Swagger middleware
    swaggerTools.initializeMiddleware(serverConfig.apiDefinition, function (middleware) {
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      app.use(middleware.swaggerMetadata());

      // Validate Swagger requests
      app.use(middleware.swaggerValidator());

      app.use(expressRequestId());

      app.use(loggerMiddleware(logger));

      // Serve parameters normally
      app.use(swaggerParamsMiddleware);

      // Route validated requests to appropriate controller
      app.use(middleware.swaggerRouter(options));

      // Handle errors in a better format
      app.use(errorMiddleware);

      // Serve the Swagger documents and Swagger UI
      app.use(middleware.swaggerUi());

      // Start the server
      app.listen(serverConfig.port, serverConfig.host);
      console.debug(`Your server is listening on port ${serverConfig.port} (http://${serverConfig.host}:${serverConfig.port})`);
      console.debug(`Swagger-ui is available on http://${serverConfig.host}:${serverConfig.port}/docs`);
    });
  };
};
