import statusCodes from 'http-status-codes';
import AgencyResponse from '../../domain/definitions/agencyResponse';

export const UploadCreatedOk = new AgencyResponse({ code: 'UP20101', statusCode: statusCodes.CREATED, message: 'Upload created successfully' });
