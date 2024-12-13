import httpStatus from 'http-status';
import AppError from '../../middlewares/AppError';
import { SemesterRegistrationModule } from '../semisterRegistration/semisterRegistration.module';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModule } from './offeredCourse.module';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.module';
import { CourseModule } from '../course/course.module';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.module';
import { scheduler } from 'timers/promises';
import { hasTimeConflict } from './OfferedCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
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

  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourseModule.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  //get the schedules of the faculties

  const assignedSchedules = await OfferedCourseModule.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = OfferedCourseModule.create({ ...payload, academicSemester });
  return result;

  // return null;
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

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
    /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
    const { faculty, days, startTime, endTime } = payload;

    const isOfferedCourseExists = await OfferedCourseModule.findById(id);
  
    if (!isOfferedCourseExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
    }
  
    // const isFacultyExists = await Faculty.findById(faculty);
  
    // if (!isFacultyExists) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
    // }
  
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    // get the schedules of the faculties
  
  
    // Checking the status of the semester registration
    const semesterRegistrationStatus =
      await SemesterRegistrationModule.findById(semesterRegistration);
  
    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
      );
    }
  
    // check if the faculty is available at that time.
    const assignedSchedules = await OfferedCourseModule.find({
      semesterRegistration,
      faculty,
      days: { $in: days },
    }).select('days startTime endTime');
  
    const newSchedule = {
      days,
      startTime,
      endTime,
    };
  
    if (hasTimeConflict(assignedSchedules, newSchedule)) {
      throw new AppError(
        httpStatus.CONFLICT,
        `This faculty is not available at that time ! Choose other time or day`,
      );
    }
  
    const result = await OfferedCourseModule.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB
};
