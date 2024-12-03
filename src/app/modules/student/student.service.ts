import { StudentModel } from './student.module';
import { Student } from './student.interface';
import mongoose from 'mongoose';
import { UserModel } from '../user/user.module';

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate('academicDepartment')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id })
    .populate('admissionSemester')
    .populate('academicDepartment')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // const result = await StudentModel.aggregate([{ $match: { id } }]);
  return result;
};

const deletedStudentsFromDB = async (id: string) => {
  console.log("log 2", id);
  
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new Error('Failed to delete student');
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new Error('Failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deletedStudentsFromDB,
};
