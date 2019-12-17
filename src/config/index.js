import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const ENVIRONMENT = process.env.NODE_ENV;
export const BASE_PATH = process.env.BASE_PATH;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY_TIME = process.env.EXPIRE_TIME;