import Joi from 'joi';

// UserName Joi Schema
const UserNameSchema = Joi.object({
  firstName: Joi.string().trim().max(20).required().messages({
    'string.base': '"First name" should be a string',
    'string.empty': '"First name" is required',
    'string.max': '"First name" cannot be longer than 20 characters',
  }),
  middleName: Joi.string().required().messages({
    'string.empty': '"Middle name" is required',
  }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.base': '"Last name" should be a string',
      'string.empty': '"Last name" is required',
      'string.pattern.base': '"Last name" should only contain alphabets',
    }),
});

// Guardian Joi Schema
const GuardianSchema = Joi.object({
  gatherName: Joi.string().required().messages({
    'string.empty': '"Guardian name" is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': '"Father\'s occupation" is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': '"Father\'s contact number" is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': '"Mother\'s name" is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': '"Mother\'s occupation" is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': '"Mother\'s contact number" is required',
  }),
});

// Local Guardian Joi Schema
const LocalGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"Local guardian\'s name" is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': '"Local guardian\'s occupation" is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': '"Local guardian\'s contact number" is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': '"Local guardian\'s address" is required',
  }),
});

// Student Joi Schema
const StudentValidationSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().required(),
    student: Joi.object({
      name: UserNameSchema.required().messages({
        'object.base': '"Name" is required',
      }),
      gender: Joi.string().valid('male', 'female').required().messages({
        'any.only': '"Gender" must be either "male" or "female"',
      }),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string().email().required().messages({
        'string.email': '"Email" must be a valid email address',
        'string.empty': '"Email" is required',
      }),
      contactNo: Joi.string().required().messages({
        'string.empty': '"Contact number" is required',
      }),
      emergencyContactNo: Joi.string().required().messages({
        'string.empty': '"Emergency contact number" is required',
      }),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required()
        .messages({
          'any.only':
            '"Blood group" must be one of: "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"',
        }),
      presentAddress: Joi.string().required().messages({
        'string.empty': '"Present address" is required',
      }),
      permanentAddress: Joi.string().required().messages({
        'string.empty': '"Permanent address" is required',
      }),
      guardian: GuardianSchema.required().messages({
        'object.base': '"Guardian information" is required',
      }),
      localGuardian: LocalGuardianSchema.required().messages({
        'object.base': '"Local guardian information" is required',
      }),
      profileImg: Joi.string().optional(),
      // isActive: Joi.string().valid('active', 'blocked').default('active').messages({
      //   'any.only': '"isActive" must be either "active" or "blocked"',
      // }),
      isDeleted: Joi.boolean(),
    }),
  }),
});

export const StudentValidations = {
  StudentValidationSchema,
};
