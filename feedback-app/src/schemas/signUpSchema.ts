import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string()
        .min(2, {message: "Username must be atlest 2 characters"})
        .max(20, {message: "Username must be no longer thatn 20 characters"})
        .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),

    email: z.string()
        .email({message: "Invalid email address"}),

    password: z.string()
        .min(6, {message: "Password must be at least 6 characters"})
    
});