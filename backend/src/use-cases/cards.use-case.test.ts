import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { container } from "../inversify.config";
import { TYPES } from '../infrastructure';
import { CardsUseCase } from './cards.use-case';

describe('CardUseCase', () => {
  const useCase = container.get<CardsUseCase>(TYPES.CardUseCase);

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
})
