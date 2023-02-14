import { Dependencies } from '../../container';
import Upload from '../../domain/Upload/Upload';
import UploadRepositoryInterface from '../../domain/abstractions/uploadRepository.interface';

export default ({ dbAdapter }: Dependencies): UploadRepositoryInterface => ({
  create(upload: Upload) {
    dbAdapter.insert(upload);
  },

  getUpload() {
    const dbUpload = dbAdapter.get();
    return restore(dbUpload);
  },

  delete() {
    dbAdapter.delete();
  },
});

function restore(dbDestination): Upload {
  return new Upload({
    id: dbDestination.id,
    file: dbDestination.file,
    miliseconds: dbDestination.miliseconds,
  });
}
