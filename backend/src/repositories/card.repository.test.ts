import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { Card } from "../entities/card";
import { User } from "../entities/user";
import { TYPES } from "../infrastructure";
import { container } from "../inversify.config";
import { CardRepository } from "./card.repository";

describe('CardMemoryRepository', () => {
  const repository = container.get<CardRepository>(TYPES.CardRepository);

  test('createCard', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: new User('user', new Date())
    })

    expect(card.category).toBe(Card.Category.FIRST)
  })
})
