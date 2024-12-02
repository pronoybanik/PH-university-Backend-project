import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import { UserService } from './user.service';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req, res, next) => {
  const { student: studentData, password } = req.body;
  const result = await UserService.createStudentIntoBD(studentData, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student create succesfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
