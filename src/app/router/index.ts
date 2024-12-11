import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicFaculty.route';
import { CourseRoute } from '../modules/course/course.route';
import { semesterRegistrationRoutes } from '../modules/semisterRegistration/semesterRegistration.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRoute,
  },
  {
    path: '/students',
    router: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    router: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    router: AcademicDepartmentRoute,
  },
  {
    path: '/course',
    router: CourseRoute,
  },
  {
    path: '/semester-registrations',
    router: semesterRegistrationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
