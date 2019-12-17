// import { authorize } from '../../middleware/authorization';
import { controllerHandler } from './../../helpers/controllerHandler';
import express from 'express';
import { validation } from '../../middleware/validation';
import { StudentController } from './studentController';
import {studentValidationSchema} from './studentValidation';

const router = express.Router();
const call = controllerHandler;
const Student = new StudentController();

router.post('/', validation(studentValidationSchema), call(Student.saveStudent, (req, _res, _next) => [req.body]));

router.get('/', call(Student.getStudents, (_req, _res, _next) => []));

router.get('/:studentId', call(Student.getStudent, (req, _res, _next) => [req.params.studentId]));

export const studentRouter = router;
