import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/response";
import VerificationEmail from "../../emails/verifacationEmail";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {   
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Feedback App | Verification code",
            react: VerificationEmail({username, otp: verifyCode})
        });
        return {success: true, message: "Verification email sent successfully"};
    } catch (error) {
        console.error("Error sending verification email: ", error);
        return {success: false, message: "Failed to send verification email"};
    }
}