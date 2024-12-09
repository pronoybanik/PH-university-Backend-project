import { TCourse } from './course.interface';
import { CourseModule } from './course.module';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModule.create(payload);
  return result;
};
const getAllCourseFromDB = async () => {
  const result = await CourseModule.find().populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModule.findById(id);
  return result;
};
const deleteCourseIntoDB = async (id: string) => {
  const result = await CourseModule.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseIntoDB,
};
