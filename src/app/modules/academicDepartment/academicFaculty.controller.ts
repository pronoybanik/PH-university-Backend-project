import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import httpStatus from 'http-status';
import { academicDepartmentService } from './academicFaculty.service';

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result =
    await academicDepartmentService.createAcademicDepartmentIntoBD(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department create successfully',
    data: result,
  });
});

const getAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.getAcademicDepartmentIntoBD();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result =
    await academicDepartmentService.getSingleAcademicDepartmentIntoBD(
      DepartmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(
    DepartmentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Academic Department  successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
