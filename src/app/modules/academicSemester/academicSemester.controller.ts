import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import httpStatus from 'http-status';
import { academicSemesterServices } from './academiscSemester.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
    const data = req.body;
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is created succesfully',
        data: result,
    });
});

export const AcademicSemesterControllers = {
    createAcademicSemester,
};
