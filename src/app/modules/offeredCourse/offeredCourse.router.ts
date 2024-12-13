import express from 'express';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateZodRequest(
    OfferedCourseValidations.createOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);

router.get('/', OfferedCourseControllers.getAllOfferedCourses);

router.patch(
  '/:id',
  validateZodRequest(
    OfferedCourseValidations.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.updateOfferedCourse,
);

export const offeredCourseRoutes = router;
