import * as moment from 'moment';

export class Project {
    id: string = '';
    name: string = '';
    description: string = '';
    venue: string = '';
    createdDate: string =  moment(new Date()).format('DD/MM/YYYY');
    modifiedDate: string = moment(new Date()).format('DD/MM/YYYY');
}
