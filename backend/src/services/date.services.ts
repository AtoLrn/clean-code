import { injectable } from "inversify";

export interface IDate {
    compareDate(dateA: Date, dateB: Date): number
}

@injectable()
export class DateService implements IDate {
    // Return 1 if dateA is greater than dateB and return -1 if dateB greater than dateA, else return 0
    compareDate(dateA: Date, dateB: Date): number {
        if (dateA.getFullYear() > dateB.getFullYear()) { return -1 }
        if (dateA.getFullYear() < dateB.getFullYear()) { return 1 }

        if (dateA.getMonth() > dateB.getMonth()) { return -1 }
        if (dateA.getMonth() < dateB.getMonth()) { return 1 }

        if (dateA.getDay() > dateB.getDay()) { return -1 }
        if (dateA.getDay() < dateB.getDay()) { return 1 }
        
        return 0
    }
    
}
