import Upload from '../../domain/Upload/Upload';
import { SendMessagePayload } from '../../infrastructure/adapters/server/websocket';
import config from '../../config';

export type UploadPaylod = {
  file: string
  miliseconds: number
}

export enum Statuses {
  IN_PROGRESS = 'inProgress',
  FINISHED = 'finished',
}

export default ({ uploadRepository }) => {
  function printUploadLines(
    { file, miliseconds }: UploadPaylod,
    callback: (callbackPayload:
  SendMessagePayload) => void): void {
    const fileLines = file.split('\n');
    const linesTotalAmount = fileLines.length;
    let linesPrinted = 0;
    setInterval(() => {
      const line = fileLines[linesPrinted];
      const percentage = (linesPrinted + 1) / linesTotalAmount * config.PER_CENT_DIVIDER;
      if (linesPrinted < linesTotalAmount - 1) {
        callback({
          line,
          percentage,
          status: Statuses.IN_PROGRESS,
        });
      } else if (linesPrinted === linesTotalAmount - 1) {
        callback({
          line,
          percentage,
          status: Statuses.FINISHED,
        });
      }
      linesPrinted += 1;
    }, miliseconds);
  }

  return {
    async getUploadAndPrintLines(callback: (data: SendMessagePayload) => void): Promise<void> {
      const upload = await uploadRepository.getUpload();
      printUploadLines(upload, callback);
    },
  
    createUpload({ file, miliseconds }: UploadPaylod): void {
      const upload = new Upload({ file, miliseconds });
      uploadRepository.create(upload);
    },
  };
};
