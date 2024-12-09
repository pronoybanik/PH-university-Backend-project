import express from 'express';
import { CourseController } from './course.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { CourseValidation } from './course.validation';
const route = express.Router();

route.post(
  '/',
  validateZodRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
route.get('/', CourseController.getAllCourse);
route.get('/:id', CourseController.getSingleCourseFaculty);
route.delete('/:id', CourseController.deleteCourse);
route.patch(
  '/:id',
  validateZodRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);
route.put('/:courseId/assign-faculties', CourseController.assignFaculties);

route.delete('/:courseId/remove-faculties', CourseController.removeFaculties);

export const CourseRoute = route;
