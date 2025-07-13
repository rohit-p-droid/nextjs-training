import { ApiResponse } from "@/helpers/ApiResponse";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { signUpSchema } from "@/schemas/signUpSchema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {

    try {
        const { username, email, password } = await request.json();

        await dbConnect();
        // this validation has issues rethink here
        const userExistsWithUsername = await UserModel.findOne({ username: username });
        if (userExistsWithUsername) {
            return ApiResponse({
                statusCode: 400,
                success: true,
                message: "Username already taken"
            });
        }
        const userExistsWithEmail = await UserModel.findOne({ email: email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date(Date.now() + 3600000);
        const hashedPassword = await bcrypt.hash(password, 10);
        if (userExistsWithEmail) {
            if (userExistsWithEmail.isVerified) {
                return ApiResponse({
                    statusCode: 400,
                    success: true,
                    message: "Email already exists"
                });
            } else {
                userExistsWithEmail.verifyCode = verifyCode;
                userExistsWithEmail.verifyCodeExpiry = expiryDate;
                userExistsWithEmail.password = hashedPassword;
                userExistsWithEmail.save();
                const emailResponse = await sendVerificationEmail(email, username, verifyCode);
                if (!emailResponse.success) {
                    return ApiResponse({
                        statusCode: 500,
                        success: false,
                        message: emailResponse.message
                    });
                }
                return ApiResponse({
                    statusCode: 200,
                    success: true,
                    message: "Please verify your email"
                });
            }
        }
        await UserModel.create({
            email,
            username,
            password: hashedPassword,
            isVerified: false,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isAcceptingMessage: true
        })

        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        if (!emailResponse.success) {
            return ApiResponse({
                statusCode: 500,
                success: false,
                message: emailResponse.message
            });
        }

        return ApiResponse({
            statusCode: 201,
            success: true,
            message: "Registration successfull, please verify your email"
        });
    } catch (error) {
        console.error("Error registering user: ", error);
        return ApiResponse({
            statusCode: 500,
            success: false,
            message: "Error registering user"
        })
    }
}