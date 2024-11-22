import { Schema, model } from 'mongoose';
import {
  Guardian,
  localGuardian,
  Student,
  UserName,
} from './student.interface';
import { boolean, required, string } from 'joi';
import bcrypt from 'bcrypt'
import config from '../../config';

// Guardian schema
const guardianSchema = new Schema<Guardian>({
  gatherName: { type: String, required: [true, 'Guardian name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

// Local Guardian schema
const localGuardianSchema = new Schema<localGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

// User Name schema
const UserNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true, // remove space for name
    // maxlength: [20, 'First Name can not be more than 20 characters'],
  },
  middleName: { type: String, required: [true, 'Middle name is required'] },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

// Student schema
const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  passWord: {
    type: String,
    required: [true, "passWord Is required"],
  },
  name: { type: UserNameSchema, required: [true, 'Name is required'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message:
        "{VALUE} is not a valid gender. Allowed values are 'male' or 'female'.",
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate: {
    //   validator: (value) => validator.isEmail(value),
    //   message: '{VALUE} is not valid email',
    // },
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        "{VALUE} is not a valid blood group. Allowed values are 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
    },
    required: [true, 'Blood group is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImg: { type: String },
  isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {
    virtuals: true
  }
});

// virtual
studentSchema.virtual("fullName").get(function () {
  return (
    `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`
  )
})

// doc Middleware pre save middleware / hook
studentSchema.pre("save", async function (next) {
  console.log(this, "pre hook: we will save te data");

  const user = this;
  // hashing password and save into DB
  user.passWord = await bcrypt.hash(user.passWord, Number(config.bcrypt_salt_rounds))
  next();
});

// doc Middleware  post save middleware / hook
studentSchema.post("save", function (doc, next) {
  console.log(this, "post hook: we will save te data");
  doc.passWord = ""
  next()
});

// Query Middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next();
});


export const StudentModel = model<Student>('Student', studentSchema);
