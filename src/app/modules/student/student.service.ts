import { StudentModel } from './student.module';
import { Student } from './student.interface';



const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id } }])
  return result;
};

const deletedStudentsFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, {
    isDeleted: true
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deletedStudentsFromDB
};
