import { config } from "dotenv";
config();

export default {
    SECRET: 'HITEN-MITSURUGI',
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/mylibrary",
}