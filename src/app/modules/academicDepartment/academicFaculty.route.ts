import express from 'express';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicFaculty.controller';
const route = express.Router();

route.post(
  '/create-academic-department',
  validateZodRequest(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

route.get('/', AcademicDepartmentController.getAcademicDepartment);
route.get(
  '/:DepartmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);
route.patch(
  '/:DepartmentId',
  validateZodRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoute = route;
