import {UserService} from '../User/userService';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import {AppError} from '../../utils/app-error';
import { JWT_SECRET, JWT_EXPIRY_TIME, APP_NAME, APP_URL } from '../../config';
import { UserModel } from '../User';
import cryptoRandomString from 'crypto-random-string';
import bcrypt from 'bcrypt';

export class AuthService {
    userService = new UserService();

    loginUser = async (userData) => {
        if(!userData.matricNumber && !userData.password) {
            throw new AppError('You need to enter your matric number and password');
        }

        const user = await this.userService.getUser({
            matricNumber: userData.matricNumber,
        });
        
        if (!user) {
            throw new AppError('No user associated with that phone number',
            null,
            404);
        }

        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        return {accessToken, refreshToken, user};
    }

    async registerUser(userData) {
        const exUser = await this.userService.getUser({
            email: userData.email,
            matricNumber: userData.matricNumber,
        });

        if (exUser) {
            throw new AppError('An account with that phone number already exists');
        }

        userData.password = this.generatePasswordEncryption(userData.password);
        const user = await UserModel.create(userData);
        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        return {accessToken, refreshToken, user};
    }

    refreshTokens = async (refreshToken) => {
        const user = await this.userService.getUser({refreshToken});
        if (user) {
            const accessToken = this.generateAccessToken(user);
            const newRefreshToken = await this.generateRefreshToken(user);
            return {accessToken, refreshToken: newRefreshToken};
        }
    }

    generateAccessToken(user) {
        const body = {id: user.id, username: user.username};
        const token = jwt.sign({iss: APP_URL, user: body}, JWT_SECRET, {
           expiresIn: JWT_EXPIRY_TIME, 
        });

        return token;
    }

    async generateRefreshToken(user) {
        const refreshToken = uuidv4();
        user.refreshToken = refreshToken;
        await user.save();
        return refreshToken;
    }

    generateEmailVerificationToken() {
        return cryptoRandomString(16);
    }

    generatePasswordEncryption(plainTextWord) {
        if (!plainTextWord) return '';
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainTextWord, salt);
      }
    
      comparePassword(password, userData) {
        return bcrypt.compareSync(password, userData.password);
      }
    
      encryptPassword(next) {
        if(UserSchema.isModified('password')) return next();
        UserSchema.password = this.encryptPassword(UserSchema.password);
        next();
      }
}