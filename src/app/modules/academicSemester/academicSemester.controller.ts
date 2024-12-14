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

const getAllAcademicSemester = catchAsync(async (req, res, next) => {
  console.log('test', req.user);

  const result = await academicSemesterServices.getAllAcademicSemesterIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All AcademicSemester Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
};
