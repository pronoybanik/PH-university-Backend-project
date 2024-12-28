import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.vlidator';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
const route = express.Router();

route.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateZodRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

route.post(
  '/create-faculty',
  validateZodRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

route.post(
  '/create-admin',
  validateZodRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

route.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateZodRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

route.get('/', UserController.getStudent);

route.get('/me', auth('student', 'faculty', 'admin'), UserController.getMe);

export const UserRoute = route;
