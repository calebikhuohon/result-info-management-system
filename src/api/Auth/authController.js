import {AuthService} from './authService';
import {BaseController} from '../baseController';

export class AuthController extends BaseController {
    authService = new AuthService();

    login = async (userData) => {
        const data = await this.authService.loginUser(userData);
        return this.sendResponse(data, 'logged in');
    }

    signup = async (user) => {
        const data = await this.authService.registerUser(user);
        return this.sendResponse(data, 'User registration successful');
    }


    refreshTokens = async (refreshToken) => {
        const tokens = await this.authService.refreshTokens(refreshToken);
        return this.sendResponse(tokens);
    }
}