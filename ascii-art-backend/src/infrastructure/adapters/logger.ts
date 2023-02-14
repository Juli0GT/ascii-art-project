import { Dependencies } from '../../container';
import LoggerInterface from '../../domain/definitions/logger.interface';
import config from '../../config';

export default ({ pino }: Dependencies): LoggerInterface => pino({
  level: config.LOG_LEVEL,
  serializers: { err: pino.stdSerializers.err, error: pino.stdSerializers.err },
});
