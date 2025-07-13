import { Message } from "@/model/user.model";


export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>;
}