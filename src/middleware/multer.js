import multer from 'multer';

const storage = multer.memoryStorage();

export const spreadsheetUpload = (spreadSheet) => {
  console.log('multer', spreadSheet);
  return multer({
    storage,
  }).single(spreadSheet);
};