import container, { Dependencies } from '../../../container';

const uploadController = container.resolve('uploadController') as Dependencies['uploadController'];

export = uploadController
