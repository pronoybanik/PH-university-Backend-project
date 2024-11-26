import { UserService } from "./user.service";
import { Request, Response } from "express"; // Ensure you import correctly

const createStudent = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        console.log("log 1", userData);

        // Uncomment and define your validation schema properly
        // const { error, value } = StudentValidationSchema.validate(student);

        // if (error) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Validation failed',
        //         error: error.details,
        //     });
        // }

        const result = await UserService.createStudentIntoBD(userData);
        console.log("log 4", result);

        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        });
    } catch (error: any) {
        console.error("Error occurred: ", error); // Debugging logs
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
            err: error,
        });
    }
};

export const UserController = {
    createStudent
};
