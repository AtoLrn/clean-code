import { inject, injectable } from "inversify";
import { User } from "../entities/user";
import { IUuidService } from "../services/uuid.services";
import { TYPES } from "../infrastructure";

export interface IUserRepository {
    createUser(): Promise<User> | User
    getUsers(): Promise<User[]> | User[]
    getUserById(userId: string): Promise<User> | User 
    updateUser(user: User): Promise<User> | User
}

@injectable()
export class UserMemoryRepository implements IUserRepository {
    @inject(TYPES.UuidService) private uuidService: IUuidService;
    private users: User[] = []

    public createUser(): User {
        const id = this.uuidService.generateUuid()
        const user = new User(id, new Date())
        this.users.push(user)
        return user
    }

    getUsers(): User[] {
        return this.users
    }

    getUserById(userId: string): User {
        const dbUser = this.users.find((user) => user.id === userId)

        if(!dbUser) {
            const newUser = new User('user-1', new Date())
            this.users.push(newUser)

            return newUser
        }

        return dbUser
    }
    
    updateUser(user: User): User {
        return user
    }
}
