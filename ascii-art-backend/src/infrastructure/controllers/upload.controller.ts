import { ServerRequest } from '../adapters/server/server.adapter';
import { Dependencies } from '../../container';
import { UploadCreatedOk } from './apiResponses';
import APIResponse from '../adapters/server/response.model';
import { getBodyPayload } from '../adapters/server/model/body.model';

export default ({ uploadUsecases }: Dependencies) => {
  return {
    async createUpload(req: ServerRequest, res) {
      const { file, miliseconds } = getBodyPayload(req.body);
      const bodyPayload = {
        file: file as string,
        miliseconds: miliseconds as number,
      };

      let response: APIResponse;
      try {
        const uploadCreated = uploadUsecases.createUpload(bodyPayload);
        response = new APIResponse(UploadCreatedOk, req.id, { data: uploadCreated });
      } catch (error) {
        response = new APIResponse(error, req.id);
      } finally {
        res.status(response.statusCode).json(response.build());
      }
    },
  };
};
