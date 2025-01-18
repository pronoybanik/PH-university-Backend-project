import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import { academicSemesterServices } from './academiscSemester.service';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result =
    await academicSemesterServices.createAcademicSemesterIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created succesfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemestersFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
};
