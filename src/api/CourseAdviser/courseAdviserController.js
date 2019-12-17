import {CourseAdviserService} from './courseAdviserService';
import {BaseController} from '../baseController';

export class CourseAdviserController extends BaseController {
    courseAdviserService = new CourseAdviserService();

    parseFile = async (spreadsheet) => {
        const file = await this.courseAdviserService.parseResultSpreadsheet(spreadsheet);
        return this.sendResponse(file);
    }
}
