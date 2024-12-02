import express from 'express';
import { UserController } from './user.controller';
import { StudentValidations } from '../student/student.vlidator';
import validateJoiRequest from '../../middlewares/validateJoiRequest';
const route = express.Router();

route.post(
  '/create-student',
  validateJoiRequest(StudentValidations.CreateStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoute = route;
