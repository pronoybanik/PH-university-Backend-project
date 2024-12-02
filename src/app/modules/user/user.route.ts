import express from 'express';
import { UserController } from './user.controller';
import { StudentValidations } from '../student/student.vlidator';
import validateRequest from '../../middlewares/validateRequest';
const route = express.Router();

route.post(
  '/create-student',
  validateRequest(StudentValidations.StudentValidationSchema),
  UserController.createStudent,
);

export const UserRoute = route;
