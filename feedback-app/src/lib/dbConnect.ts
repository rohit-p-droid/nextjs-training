import mongoose from "mongoose";

type ConnectionObj = {
    isConnected?: number
}

const connection: ConnectionObj = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected) {
        console.log("[+] Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        connection.isConnected = db.connections[0].readyState;

        console.log("[+] Database connection successfull!!");
    } catch (error) {
        console.error("[-] Error connecting to database!!", error);
        process.exit(1);
    }
}

