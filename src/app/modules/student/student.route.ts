import express from 'express';
import { StudentControllers } from './student.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { studentValidations } from './student.vlidator';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const route = express.Router();

route.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty), StudentControllers.getAllStudents);
route.get('/:id', StudentControllers.getSingleStudent);
route.delete('/:id', StudentControllers.deleteStudent);
route.patch(
  '/:id',
  validateZodRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = route;
