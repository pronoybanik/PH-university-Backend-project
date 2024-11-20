import { StudentModel } from '../student.module';
import { Student } from './student.interface';

const createStudentIntoBD = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  createStudentIntoBD,
};
