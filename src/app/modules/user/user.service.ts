import { TUser } from './user.interface';
import { UserModel } from './user.module';

const createStudentIntoBD = async (student: TUser) => {
  console.log('log 3', student);

  const result = await UserModel.create(student);
  console.log('log 4', result);
  return result;
};

export const UserService = {
  createStudentIntoBD,
};
