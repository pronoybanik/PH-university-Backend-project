import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModule } from './semisterRegistration.module';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new Error('This academic semester not found !');
  }

  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistrationModule.findOne(
    {
      academicSemester,
    },
  );

  if (isSemesterRegistrationExists) {
    throw new Error('This semester is already registered!');
  }

  const result = await SemesterRegistrationModule.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async () => {
  const result =
    await SemesterRegistrationModule.find().populate('academicSemester');

  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
};
