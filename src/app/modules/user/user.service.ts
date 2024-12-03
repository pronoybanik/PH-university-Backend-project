import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.module';
import { TUser } from './user.interface';
import { UserModel } from './user.module';
import { generateStudentId } from './user.utils';

const createStudentIntoBD = async (payload: Student, password: string) => {
  const userData: Partial<TUser> = {};
  // set password
  userData.password = password || (config.default_password as string);
  // set role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  // set  generated id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await StudentModel.create(payload);

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoBD,
};
