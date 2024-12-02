import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';

import { AcademicSemesterValidation } from './academicSemester.vlidator';
import validateZodRequest from '../../middlewares/validateZodRequest';
const route = express.Router();

route.post(
  '/create-academic-semester',
  // validateRequest(),
  validateZodRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = route;
