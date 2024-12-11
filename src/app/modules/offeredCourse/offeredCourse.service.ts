import httpStatus from 'http-status';
import AppError from '../../middlewares/AppError';
import { SemesterRegistrationModule } from '../semisterRegistration/semisterRegistration.module';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModule } from './offeredCourse.module';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.module';
import { CourseModule } from '../course/course.module';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.module';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    // section,
    // faculty,
    // days,
    // startTime,
    // endTime,
  } = payload;

  //check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await SemesterRegistrationModule.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  const isAcademicFacultyExits =
    await AcademicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found !');
  }

  const isAcademicDepartmentExits =
    await AcademicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found !');
  }

  const isCourseExits = await CourseModule.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
  }

  //   const isFacultyExits = await Faculty.findById(faculty);

  //   if (!isFacultyExits) {
  //     throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  //   }

  const result = OfferedCourseModule.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async () => {
  // const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();

  const result = await OfferedCourseModule.find();
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourseModule.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  // deleteOfferedCourseFromDB,
  // updateOfferedCourseIntoDB,
};
