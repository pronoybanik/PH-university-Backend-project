import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.module';
import { TUser } from './user.interface';
import { UserModel } from './user.module';

const createStudentIntoBD = async (studentData: Student, password: string) => {
  const userData: Partial<TUser> = {};
  // set password
  userData.password = password || (config.default_password as string);
  // set role
  userData.role = 'student';
  // set id
  userData.id = '23223424';

  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    const newStudent = await StudentModel.create(studentData);

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoBD,
};
