import { inject, injectable } from "inversify";
import { User } from "../entities/user";
import { TYPES } from "../infrastructure";
import { CardRepository } from "./card.repository";

export interface UserRepository {
    getUsers(): Promise<User[]> | User[]
    getUser(id: string): Promise<User> | User
}

@injectable()
export class UserMemoryRepository implements UserRepository {
    getUsers(): User[] {
        const user = new User('user-1')

        return [user]
    }

    getUser(id: string): User {
        return new User(id)
    }
    
}