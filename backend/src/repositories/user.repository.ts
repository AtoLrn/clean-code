import { inject, injectable } from "inversify";
import { User } from "../entities/user";
import { TYPES } from "../infrastructure";
import { CardRepository } from "./card.repository";

export interface UserRepository {
    getUsers(): Promise<User[]> | User[]
    getUserById(userId: string): Promise<User> | User 
    updateUser(user: User): Promise<User> | User
}

@injectable()
export class UserMemoryRepository implements UserRepository {
    private users: User[] = []

    getUsers(): User[] {
        return this.users
    }

    getUserById(userId: string): User {
        const user = this.users.find((user) => user.id === userId)

        if(!user) {
            const newUser = new User('user-1', new Date())
            this.users.push(user)

            return newUser
        }

        return user
    }
    
    updateUser(user: User): User {
        return user
    }
}
