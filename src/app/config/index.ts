import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  dataBase_url: process.env.DATABASE_RUL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS
};
