import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { Card } from "../entities/card";
import { User } from "../entities/user";
import { TYPES } from "../infrastructure";
import { container } from "../inversify.config";
import { CardRepository } from "./card.repository";

describe('CardMemoryRepository', () => {
  const repository = container.get<CardRepository>(TYPES.CardRepository);

  let user: User

  beforeEach(() => {
    user = new User('user', new Date())
  })

  test('createCard', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: user
    })

    expect(card.category).toBe(Card.Category.FIRST)
  })

  test('getCardsByUser', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: user
    })

    const cards = await repository.getCardsByUsers(user)

    expect(cards[1]).toBe(card)
  })

  test('updateCard', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: user
    })

    card.answer = 'updated answer'

    const updatedCard = await repository.updateCard(card)

    expect(updatedCard.answer).toBe('updated answer')
  })

  test('updateCard error case', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: user
    })

    const card2 = { ...card } as Card

    card2.id = 'wrong-id'

    expect(() => {
        repository.updateCard(card2)
    }).toThrow(new Error('Card not found'))
  })

  test('getById', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: user
    })

    const cardById = await repository.getCardById(card.id)

    expect(cardById).toBe(card)
  })

  test('getById error case', async () => {
    expect(() => {
        repository.getCardById('id')
    }).toThrow(new Error('Card not found'))
  })
})
