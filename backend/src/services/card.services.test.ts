import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { container } from "../inversify.config";
import { TYPES } from '../infrastructure';
import { CardService } from './card.services';
import { CardRepository } from '../repositories/card.repository';
import { Card } from '../entities/card';
import { User } from '../entities/user';

describe('CardService', () => {
  const service = container.get<CardService>(TYPES.CardService);
  const repository = container.get<CardRepository>(TYPES.CardRepository);

  let card: Card

  beforeEach(async () => {
    card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: new User('user', new Date())
    })

    card.createdAt = new Date('2023-01-01')
  })

  test('isCardSelected DONE', async () => {
      card.category = Card.Category.DONE

      const isCardSelected = service.isCardSelected(card, new Date())

      expect(isCardSelected).toBe(false)
  })

  test('isCardSelected date less than creation date', async () => {
      const isCardSelected = service.isCardSelected(card, new Date('2022-01-01'))

      expect(isCardSelected).toBe(false)
  })

  test('isCardSelected FIRST category and 1 day', async () => {
      const isCardSelected = service.isCardSelected(card, new Date('2023-01-02'))

      expect(isCardSelected).toBe(true)
  })

  test('isCardSelected SECOND category and 2 day', async () => {
      card.category = Card.Category.SECOND
      const isCardSelected = service.isCardSelected(card, new Date('2023-01-03'))

      expect(isCardSelected).toBe(true)
  })

  test('isCardSelected THIRD category and 4 day', async () => {
      card.category = Card.Category.THIRD
      const isCardSelected = service.isCardSelected(card, new Date('2023-01-05'))

      expect(isCardSelected).toBe(true)
  })

  test('isCardSelected FOURTH category and 8 day', async () => {
      card.category = Card.Category.FOURTH
      const isCardSelected = service.isCardSelected(card, new Date('2023-01-09'))

      expect(isCardSelected).toBe(true)
  })

  test('isCardSelected FIFTH category and 16 day', async () => {
      card.category = Card.Category.FIFTH
      const isCardSelected = service.isCardSelected(card, new Date('2023-01-17'))

      expect(isCardSelected).toBe(true)
  })

  test('isCardSelected SIXTH category and 32 day', async () => {
      card.category = Card.Category.SIXTH
      const isCardSelected = service.isCardSelected(card, new Date('2023-02-03'))

      expect(isCardSelected).toBe(true)
  })

  test('isCardSelected SEVENTH category and 64 day', async () => {
      card.category = Card.Category.SEVENTH
      const isCardSelected = service.isCardSelected(card, new Date('2023-04-01'))

      expect(isCardSelected).toBe(true)
  })

  test('isCardSelected not selected', async () => {
      card.category = Card.Category.SEVENTH
      const isCardSelected = service.isCardSelected(card, new Date('2023-02-01'))

      expect(isCardSelected).toBe(false)
  })

  test('validateCard FIRST', async () => {
    const validatedCard = await service.validateCard(card)
    
    expect(validatedCard.category).toBe(Card.Category.SECOND)
  })

  test('validateCard SECOND', async () => {
    card.category = Card.Category.SECOND
    const validatedCard = await service.validateCard(card)
    
    expect(validatedCard.category).toBe(Card.Category.THIRD)
  })

  test('validateCard THIRD', async () => {
    card.category = Card.Category.THIRD
    const validatedCard = await service.validateCard(card)
    
    expect(validatedCard.category).toBe(Card.Category.FOURTH)
  })

  test('validateCard FOURTH', async () => {
    card.category = Card.Category.FOURTH
    const validatedCard = await service.validateCard(card)
    
    expect(validatedCard.category).toBe(Card.Category.FIFTH)
  })

  test('validateCard FIFTH', async () => {
    card.category = Card.Category.FIFTH
    const validatedCard = await service.validateCard(card)
    
    expect(validatedCard.category).toBe(Card.Category.SIXTH)
  })

  test('validateCard SIXTH', async () => {
    card.category = Card.Category.SIXTH
    const validatedCard = await service.validateCard(card)
    
    expect(validatedCard.category).toBe(Card.Category.SEVENTH)
  })

  test('validateCard SEVENTH', async () => {
    card.category = Card.Category.SEVENTH
    const validatedCard = await service.validateCard(card)
    
    expect(validatedCard.category).toBe(Card.Category.DONE)
  })

  test('unvalidateCard', async () => {
    card.category = Card.Category.SECOND
    const unvalidatedCard = await service.unvalidateCard(card)
    
    expect(unvalidatedCard.category).toBe(Card.Category.FIRST)
  })
})
