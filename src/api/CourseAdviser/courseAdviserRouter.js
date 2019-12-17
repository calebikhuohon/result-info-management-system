import express from 'express';
// import { validation } from '../../middleware';
import { controllerHandler } from '../../helpers/controllerHandler';
// import { authorize } from '../../middleware/authorization';
import { spreadsheetUpload } from '../../middleware/multer';
import {CourseAdviserController} from './courseAdviserController';

const router = express.Router();
const call = controllerHandler;
const CourseAdviser = new CourseAdviserController();

router.post('/upload', spreadsheetUpload('spreadsheet'), call(CourseAdviser.parseFile, (req, _res, _next) => [
  req.file,
]));

export const CourseAdviserRouter = router;