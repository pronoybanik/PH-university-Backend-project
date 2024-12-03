import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import { academicFacultyService } from './academicFaculty.service';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await academicFacultyService.createAcademicFacultyIntoBD(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty create successfully',
    data: result,
  });
});

const getAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAcademicFacultyIntoBD();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyService.getSingleAcademicFacultyIntoBD(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyService.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Academic Faculty  successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
