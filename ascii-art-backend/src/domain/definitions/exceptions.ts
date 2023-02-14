import AgencyResponse from './agencyResponse';
import statusCodes from 'http-status-codes';
import config from '../../config';

const { CONSTRAINTS } = config;

export const UploadInvalidFileFormat = new AgencyResponse({ code: 'TP40001', statusCode: statusCodes.BAD_REQUEST, message: `Upload file must have ${CONSTRAINTS.FORMAT} format` });
export const UploadNotFound = new AgencyResponse({ code: 'UP40401', statusCode: statusCodes.NOT_FOUND, message: 'The upload provided is not registered in the system' });
