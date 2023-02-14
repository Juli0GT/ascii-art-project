import Upload from '../Upload/Upload';

interface UploadRepositoryInterface {
  create(user: Upload): void;
  getUpload(): Upload;
  delete(): void;
}

export default UploadRepositoryInterface;
