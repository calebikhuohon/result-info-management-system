import { BaseController } from '../baseController';
import { UserService } from './userService';

export class UserController extends BaseController {
    userService = new UserService();

    getUsers = async () => {
        const user = await this.userService.getUsers();
        return this.sendResponse(user);
    }

    addUsers = async (user) => {
        const newUser = await this.userService.saveUser();
        return this.sendResponse(newUser);
    }

    editProfile = async (query, update) => {
        const profile = await this.userService.editProfile(query, update);
        return this.sendResponse(profile, 'Your profile has been successfully updated');
    }

    getUser = async (query) => {
        const user = await this.userService.getUser(query);
        return this.sendResponse(user);
    }
}
