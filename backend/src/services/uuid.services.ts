import { injectable } from "inversify";
import { v4 as uuidv4 } from 'uuid';

export interface IUuidService {
    generateUuid(): string
}

@injectable()
export class UuidService implements IUuidService {
    generateUuid(): string {
        return uuidv4()
    }
    
}