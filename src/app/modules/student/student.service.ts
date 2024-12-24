import { StudentModel } from './student.module';
import { Student } from './student.interface';
import mongoose from 'mongoose';
import { UserModel } from '../user/user.module';

// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
//   console.log('base query', query);

//   const queryObj = { ...query }

//   const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

//   let searchTerm = '';

//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//   }

//   const searchQuery = StudentModel.find({
//     $or: studentSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   // Filtering
//   const excludeFields = ["searchTerm", "sort", "limit"];

//   excludeFields.forEach((el) => delete queryObj[el])
//   // console.log("query 2",{query, queryObj});

//   const filterQuery = await searchQuery
//     .find(queryObj)
//     .populate('admissionSemester')
//     .populate('academicDepartment')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   let sort = '-createdAt';

//   if (query.sort) {
//     sort = query.sort as string;
//   }

//   const sortQuery =  filterQuery.sort(sort)

//   let limit = 1;
//   if (query.limit) {
//     limit = query.limit as string
//   }

//   const limitQuery = await sortQuery.limit(limit)

//   return limitQuery;

// };

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

  const queryObj = { ...query };

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // Extract searchTerm from the query
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  // Create the search query only if searchTerm is non-empty
  let searchConditions: any = [];
  if (searchTerm.trim()) {
    searchConditions = studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    }));
  }

  const searchQuery = StudentModel.find(
    searchConditions.length > 0 ? { $or: searchConditions } : {}, // If no searchTerm, fallback to an empty condition
  );

  // Exclude unnecessary fields from the filtering query
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);



  // Apply additional filters
  searchQuery.find(queryObj);

  // Populate related fields
  searchQuery
    .populate('user')
    .populate('admissionSemester')
    .populate('academicDepartment')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // Sorting
  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  searchQuery.sort(sort);

  // Pagination
  let page = 1;
  let limit = 10; // Default limit
  let skip = 0;

  if (query.limit) {
    limit = parseInt(query.limit as string, 10);
  }

  if (query.page) {
    page = parseInt(query.page as string, 10);
    skip = (page - 1) * limit;
  }

  searchQuery.skip(skip).limit(limit);

  // Field limiting
  let fields = '-__v'; // Default to excluding `__v`

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  searchQuery.select(fields);

  // Execute the query
  const students = await searchQuery.exec(); // Use `exec` for consistency

  return students;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id)
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



  const result = await StudentModel.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletedStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await StudentModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new Error('Failed to delete student');
    }

    const userId = deleteStudent.user;

    const deletedUser = await UserModel.findOneAndUpdate(
      userId,
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
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deletedStudentFromDB,
  updateStudentIntoDB,
};
