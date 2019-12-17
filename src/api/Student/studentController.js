import {StudentService} from './studentService';
import {BaseController} from '../baseController';

export class StudentController extends BaseController {
    studentService = new StudentService();

    getStudents = async () => {
        const data = await this.studentService.getStudents();
        return this.sendResponse(data);
    }

    getStudent = async (query) => {
        const student = await this.studentService.getStudent(query);
        return this.sendResponse(student);
    }

    saveStudent = async (student) => {
        const data = await this.studentService.saveStudent(student);
        return this.sendResponse(data);
    }
}