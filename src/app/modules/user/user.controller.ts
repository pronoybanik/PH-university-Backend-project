import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import { UserService } from './user.service';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req, res, next) => {
  const { student, password } = req.body;

  const result = await UserService.createStudentIntoBD(student, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student create succesfully',
    data: result,
  });
});

const getStudent = catchAsync(async (req, res, next) => {
  const result = await UserService.getAllStudentIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student got data  successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  getStudent,
};
