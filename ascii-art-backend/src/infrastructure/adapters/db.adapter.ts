import Upload from '../../domain/Upload/Upload';

type Database = {
  currentUpload: Upload | null
}

const database: Database = {
  currentUpload: null,
};

export default () => ({
  get(): Database['currentUpload'] {
    const { currentUpload } = database;
    return currentUpload;
  },

  insert(upload: Upload): void {
    Object.assign(database, { currentUpload: upload });
  },

  delete(): void {
    Object.assign(database, { currentUpload: null });
  },
});
