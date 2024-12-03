import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.module';

const createAcademicFacultyIntoBD = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAcademicFacultyIntoBD = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleAcademicFacultyIntoBD = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const academicFacultyService = {
  createAcademicFacultyIntoBD,
  getAcademicFacultyIntoBD,
  getSingleAcademicFacultyIntoBD,
  updateAcademicFacultyIntoDB,
};
