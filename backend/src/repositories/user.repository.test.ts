import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { TYPES } from "../infrastructure";
import { User } from "../entities/user";
import { container } from "../inversify.config";
import { IUserRepository } from './user.repository';

describe('CardMemoryRepository', () => {
  let repository: IUserRepository

  beforeEach(() => {
    // to re init repository each time and purge previously created users
    repository = container.get<IUserRepository>(TYPES.UserRepository);
  })

  test('createUser', async () => {
    const user = await repository.createUser()

    expect(user.id).not.toBe('')
  })

  test('getUsers', async () => {
    const user = await repository.createUser()

    const users = repository.getUsers()

    expect(users[0]).toBe(user)
  })

  test('getUserById', async () => {
    const user = await repository.createUser()

    const userById = repository.getUserById(user.id)

    expect(userById).toBe(user)
  })

  test('getUserById not exist', async () => {
    const user = await repository.getUserById('id')

    expect(user.id).not.toBe('')
  })

  test('updateUser', async () => {
    const user = await repository.createUser()

    user.id = 'updated-id'

    const updatedUser = await repository.updateUser(user)

    expect(updatedUser.id).toBe('updated-id')
  })
})
