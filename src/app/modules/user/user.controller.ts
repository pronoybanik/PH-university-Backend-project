import AppError from '../../middlewares/AppError';
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
    message: 'Student create successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
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

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await UserService.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User ${role} is retrieved successfully`,
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createAdmin,
  getStudent,
  createFaculty,
  getMe,
  changeStatus,
};
