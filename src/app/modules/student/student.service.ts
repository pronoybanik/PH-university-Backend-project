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

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id.toString() })
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

// const getSingleStudentFromDB = async (id: string) => {
//   try {
//     console.log("Searching for student with ID:", id);

//     const result = await StudentModel.findOne({ id })
//       .populate('admissionSemester')
//       .populate('academicDepartment')
//       .populate({
//         path: 'academicDepartment',
//         populate: {
//           path: 'academicFaculty',
//         },
//       });

//     if (!result) {
//       console.log("No student found with the given ID.");
//       return null; // or throw an error
//     }

//     console.log("Found student:", result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching student:", error);
//     throw error; // Re-throw to handle at a higher level
//   }
// };

const updateStudentIntoDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deletedStudentFromDB = async (id: string) => {
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
    throw new Error('Failed to to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deletedStudentFromDB,
  updateStudentIntoDB,
};
