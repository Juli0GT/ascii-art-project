import Upload from '../../../domain/Upload/Upload';

export type UploadOutput = {
  id: string;
  file: string;
  miliseconds: number;
}

export default function uploadModel(upload: Upload): UploadOutput {
  return {
    id: upload.id,
    file: upload.file,
    miliseconds: upload.miliseconds,
  };
}
