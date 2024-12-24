import express from 'express';
import { StudentControllers } from './student.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { studentValidations } from './student.vlidator';
import auth from '../../middlewares/auth';
const route = express.Router();

route.get('/', auth(), StudentControllers.getAllStudents);
route.get('/:id', StudentControllers.getSingleStudent);
route.delete('/:id', StudentControllers.deleteStudent);
route.patch(
  '/:id',
  validateZodRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = route;
