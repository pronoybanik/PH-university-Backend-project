import express from 'express';
import { StudentControllers } from './student.controller';
const route = express.Router();

route.get('/', StudentControllers.getAllStudents);
route.get('/:id', StudentControllers.getSingleStudent);
route.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = route;
