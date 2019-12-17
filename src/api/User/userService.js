import { UserModel, UserSchema } from './userModel';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export class UserService {
  async getUser(query) {
    return await UserModel.findOne(query).exec();
  }

  async getUsers() {
    return await UserModel.find();
  }

  async saveUser(user) {
    const encryptedPassword = this.generatePasswordEncryption(user.password);
    user.password = encryptedPassword;
    return await UserModel.create(user);
  }

  async editProfile(query, update) {
    const user = await UserModel.findById(query).exec();
    _.merge(user, update);
    return await user.save();
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