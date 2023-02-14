import { v4 as uuid } from 'uuid';

type UploadCreationParams = {
  id?: string;
  file: string;
  miliseconds: number;
}

export default class Upload {
  public id: string;
  public file: string;
  public miliseconds: number;

  constructor(upload: UploadCreationParams) {
    this.id = upload.id ?? uuid();
    this.file = upload.file;
    this.miliseconds = upload.miliseconds;
  }
}
