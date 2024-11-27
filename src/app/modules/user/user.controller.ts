import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { Student: studentData, password } = req.body;

    const result = await UserService.createStudentIntoBD(studentData, password);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
