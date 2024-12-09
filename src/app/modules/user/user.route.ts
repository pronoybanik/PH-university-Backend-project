import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.vlidator';
import validateZodRequest from '../../middlewares/validateZodRequest';
const route = express.Router();

route.post(
  '/create-student',
  validateZodRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

route.get('/', UserController.getStudent);

export const UserRoute = route;
