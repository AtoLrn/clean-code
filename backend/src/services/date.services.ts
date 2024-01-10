import { injectable } from "inversify";

export interface IDate {
    compareDate(dateA: Date, dateB: Date): number
}

@injectable()
export class DateService implements IDate {
    compareDate(dateA: Date, dateB: Date): number {
        //if(dateA.getDay() > dateB.getDay()) { return 1 }
        return 1
    }
    
}
