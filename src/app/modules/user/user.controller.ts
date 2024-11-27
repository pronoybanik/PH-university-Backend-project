import sendResponse from '../../utils/sendResponst';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { Student: studentData, password } = req.body;

    const result = await UserService.createStudentIntoBD(studentData, password);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student create succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
