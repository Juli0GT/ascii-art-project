import expressWs from 'express-ws';
import { WebSocket } from 'ws';

import { Statuses, UploadPaylod } from '../../../usecases/Upload/upload.usecases';

export type SendMessagePayload = {
  line: string,
  percentage: number,
  status: Statuses,
}

type SendMessageFun = (data: SendMessagePayload) => void

type UploadUsecases = {
  getUploadAndPrintLines: (data: SendMessageFun) => Promise<void>,
  createUpload: (payload: UploadPaylod) => void,
}

export const startWebSocket = (app: expressWs.Application, uploadUsecases: UploadUsecases) => {
  app.ws('/ws', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
      const parsedMessage = JSON.parse(message);
      const sendMessage = ({
        line,
        percentage,
        status,
      }: SendMessagePayload) => ws.send(JSON.stringify({ line, percentage, status }));
      if (parsedMessage['message'] === 'start_printing') { uploadUsecases.getUploadAndPrintLines(sendMessage); }
    });
  });
};
