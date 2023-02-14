import apiDefinition from './src/infrastructure/api/definition';
import config from './src/config';
import path from 'path';
import container, { Dependencies } from './src/container';

const serverAdapter = container.resolve('serverAdapter') as Dependencies['serverAdapter'];

serverAdapter({
  port: config.SERVER.PORT,
  host: config.SERVER.HOST,
  apiDefinition,
  controllersPath: path.join(__dirname, './src/infrastructure/api/entrypoints'),
});
