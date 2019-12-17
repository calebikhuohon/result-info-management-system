import {StudentModel} from './studentModel';
import _ from 'lodash';
import { UserModel } from '../User/userModel';

export class StudentService {
    async getStudent(query) {
        return await StudentModel.findOne(query).exec();
    }

    async getStudents() {
        return await UserModel.find();
    }

    async saveStudent(student) {
        return await StudentModel.create(student);
    }

    async editStudentDetails(query, update) {
        const student = await StudentModel.findById(query).exec();
        _.merge(user, update);
        return await student.save();
    }

    async deleteStudent() {
        
    }
}