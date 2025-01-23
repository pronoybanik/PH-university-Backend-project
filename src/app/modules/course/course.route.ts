import express from 'express';
import { CourseController } from './course.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { CourseValidation } from './course.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
const route = express.Router();

route.post(
  '/create-course',
  auth(
    USER_ROLE.admin,
  ),
  validateZodRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

route.get('/', CourseController.getAllCourse);
route.get('/:id', CourseController.getSingleCourseFaculty);

route.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseController.getFacultiesWithCourse,
);

route.delete('/:id', auth(
  USER_ROLE.admin,
), CourseController.deleteCourse);

route.patch(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.faculty
  ),
  validateZodRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

route.put('/:courseId/assign-faculties',
  auth(
    USER_ROLE.admin,
    USER_ROLE.faculty
  ),
  CourseController.assignFaculties);

route.delete('/:courseId/remove-faculties', auth(
  USER_ROLE.admin,
  USER_ROLE.faculty,
), CourseController.removeFaculties);

export const CourseRoute = route;
