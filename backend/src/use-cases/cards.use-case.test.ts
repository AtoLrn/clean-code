import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { container } from "../inversify.config";
import { TYPES } from '../infrastructure';
import { CardsUseCase } from './cards.use-case';
import { UserRepository } from '../repositories/user.repository';
import { Card } from '../entities/card';
import { NotFoundError } from '../entities/not-found';

describe('CardUseCase', () => {
  const useCase = container.get<CardsUseCase>(TYPES.CardUseCase);
  const repository = container.get<UserRepository>(TYPES.UserRepository);

  test('createCard', async () => {
      const card = await useCase.createCard({
        question: 'question',
        answer: 'answer'
      } as CardsUseCase.Create)

      expect(card.question).toBe('question')
  })

  test('getAllCards', async () => {
      await useCase.createCard({
        question: 'question',
        answer: 'answer'
      } as CardsUseCase.Create)

      const cards = await useCase.getAllCards()

      // increase index because of previously created cards
      expect(cards[1].question).toBe('question')
  })

  test('getCardForDate less than next day', async () => {
      await useCase.createCard({
        question: 'question',
        answer: 'answer'
      } as CardsUseCase.Create)

      const cards = await useCase.getCardForDate(new Date())

      expect(cards.length).toBe(0)
  })

  test('getCardForDate less than next day not date input', async () => {
      await useCase.createCard({
        question: 'question',
        answer: 'answer'
      } as CardsUseCase.Create)

      const cards = await useCase.getCardForDate()

      expect(cards.length).toBe(0)
  })

  test('getCardForDate next day', async () => {
      await useCase.createCard({
        question: 'question',
        answer: 'answer'
      } as CardsUseCase.Create)

      const user = await repository.getUserById('user-1')

      user.lastQuizz.setDate(user.lastQuizz.getDate() + 1)

      const cards = await useCase.getCardForDate(user.lastQuizz)

      expect(cards.length).toBeGreaterThan(0)
  })

  test('answerCard valid', async () => {
      const card = await useCase.createCard({
        question: 'question',
        answer: 'answer'
      } as CardsUseCase.Create)

      const cards = await useCase.answerCard(card.id, true)

      expect(cards.category).toBe(Card.Category.SECOND)
  })

  test('answerCard unvalid', async () => {
      const card = await useCase.createCard({
        question: 'question',
        answer: 'answer'
      } as CardsUseCase.Create)

      card.category = Card.Category.SECOND

      const cards = await useCase.answerCard(card.id, false)

      expect(cards.category).toBe(Card.Category.FIRST)
  })

  test('answerCard error', async () => {
      try {
        await useCase.answerCard('wrong-id', true) 
      } catch (error) {
        expect(error).toStrictEqual(new NotFoundError('Card not found'))
      }
  })
})
