import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
