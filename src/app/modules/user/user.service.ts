import mongoose from 'mongoose';
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

  // start session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set  generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new Error('Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)
    const newStudent = await StudentModel.create([payload], { session });

    // convert object to array --> object.keys(value)

    if (!newStudent.length) {
      throw new Error('Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const UserService = {
  createStudentIntoBD,
};
