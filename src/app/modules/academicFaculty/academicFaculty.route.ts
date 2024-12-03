import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
const route = express.Router();

route.post(
  '/create-academic-faculty',
  validateZodRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

route.get('/', AcademicFacultyController.getAcademicFaculty);
route.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
route.patch(
  '/:facultyId',
  validateZodRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoute = route;
