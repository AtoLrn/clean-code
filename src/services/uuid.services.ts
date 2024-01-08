import { injectable } from "inversify";
import { v4 as uuidv4 } from 'uuid';

export interface UuidService {
    generateUuid(): string
}

@injectable()
export class UuidRandomService implements UuidService {
    generateUuid(): string {
        return uuidv4()
    }
    
}