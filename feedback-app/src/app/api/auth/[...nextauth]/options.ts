import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {username: credentials.identifier}
                        ]
                    })
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ]
}