import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponst';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { RequestHandler } from 'express';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are rerived successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const result = await StudentServices.deletedStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Student  successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
