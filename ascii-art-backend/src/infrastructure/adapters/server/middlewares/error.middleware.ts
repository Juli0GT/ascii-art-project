import httpStatusCodes from 'http-status-codes';
import APIResponse from '../response.model';
import { ServerRequest } from '../server.adapter';
import AgencyResponse from '../../../../domain/definitions/agencyResponse';

export default (error, req: ServerRequest, res, next) => {
  let agencyResponse: AgencyResponse;
  let errors: string[];

  if (error instanceof Error) {
    agencyResponse = new AgencyResponse({
      statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
      message: httpStatusCodes.getStatusText(httpStatusCodes.INTERNAL_SERVER_ERROR),
      code: 'ASCII50000',
    });
    errors = [ error.message ];
  }
  if (error.code === 'SCHEMA_VALIDATION_FAILED') {
    agencyResponse = new AgencyResponse({
      statusCode: httpStatusCodes.BAD_REQUEST,
      message: error.message,
      code: 'ASCII40000',
    });
    errors = error.results.errors.map(({ message }) => message);
  }

  const response = new APIResponse(agencyResponse, req.id, { errors });
  res.status(response.statusCode).json(response.build());

  next();
};
