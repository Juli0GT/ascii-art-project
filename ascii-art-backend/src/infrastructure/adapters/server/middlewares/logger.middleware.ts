import LoggerInterface from '../../../../domain/definitions/logger.interface';
import { ServerRequest } from '../server.adapter';

export default (logger: LoggerInterface) => (req: ServerRequest, _res, next) => {
  req.logger = logger.child({ requestUuid: req.id });
  next();
};
