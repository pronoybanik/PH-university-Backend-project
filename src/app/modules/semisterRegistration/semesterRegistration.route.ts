import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.vlidator';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateZodRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

// router.get(
//   '/:id',
//   SemesterRegistrationController.getSingleSemesterRegistration,
// );

// router.patch(
//   '/:id',
//   validateRequest(
//     SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationController.updateSemesterRegistration,
// );

// router.get(
//   '/:id',
//   SemesterRegistrationController.getSingleSemesterRegistration,
// );

// router.delete(
//   '/:id',
//   SemesterRegistrationController.deleteSemesterRegistration,
// );


export const semesterRegistrationRoutes = router;
