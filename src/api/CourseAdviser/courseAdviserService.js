import { CourseAdviserModel } from './courseAdviserModel';
import _ from 'lodash';
import { parseFile } from '../../utils/parseFile';
import { AppError } from '../../utils/app-error';

export class CourseAdviserService {
    async getCourseAdviser(query) {
        return await CourseAdviserModel.findOne(query).exec();
    }

    async getAllCourseAdvisers() {
        return await CourseAdviserModel.find();
    }

    async editCourseAdviser(query, update) {
        const data = await CourseAdviserModel.findById(query).exec();
        _.merge(data, update);
        return await data.save();
    }

    async saveCourseAdviser(courseAdviser) {
        return await CourseAdviserModel.create(courseAdviser);
    }

    async parseResultSpreadsheet(spreadsheet) {
        console.log('service', spreadsheet);
        return await parseFile(spreadsheet.buffer).catch(err => { throw new AppError(err) });
    }

}