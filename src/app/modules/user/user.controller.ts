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

// const createFaculty = catchAsync(async (req, res) => {
//   const { password, faculty: facultyData } = req.body;

//   const result = await UserService.createFacultyIntoDB(password, facultyData);
// console.log("prient 2", result);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty is created succesfully',
//     data: result,
//   });
// });

export const UserController = {
  createStudent,
  createAdmin,
  getStudent,
  // createFaculty
};
