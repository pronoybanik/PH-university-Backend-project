import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
