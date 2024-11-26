import { z } from "zod";

const UserValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "Password must be string"
    }).max(20, { message: "password can be then 20 characters" }).optional(),
});

export default UserValidationSchema; 