import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { TYPES } from "../infrastructure";
import { container } from "../inversify.config";
import {IExpressRestPort} from './rest.port';
import {ICardRepository} from '../repositories/card.repository';
import { User } from '../entities/user';
import { Card } from "../entities/card";

describe('RestPort', () => {
  const server = container.get<IExpressRestPort>(TYPES.ExpressRestPort);
  const repository = container.get<ICardRepository>(TYPES.CardRepository);

  beforeAll(() => {
    server.start(8080)
  })

  test('/cards/quizz', async () => {
    const response = await fetch('http://localhost:8080/cards/quizz?date=2024-01-01') 
    const data = await response.json()

    expect(data.length).toBe(0)
  })

  test('/cards/quizz error no date', async () => {
    const response = await fetch('http://localhost:8080/cards/quizz') 

    expect(response.status).toBe(400)
  })

  test('/card/:id/answer', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: new User('user', new Date())
    })

    const response = await fetch(`http://localhost:8080/cards/${card.id}/answer`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isValid: true
        })
    }) 
    const data = await response.json()

    expect(data.category).toBe(Card.Category.SECOND as string)
  })

  test('/cards/:id/answer 404 error', async () => {
    const response = await fetch(`http://localhost:8080/cards/wrong-id/answer`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isValid: true
        })
    }) 

    expect(response.status).toBe(404)
  })

  test('/cards GET', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: new User('user-1', new Date())
    })

    const response = await fetch(`http://localhost:8080/cards`) 
    const data = await response.json()

    expect(data[0].answer).toBe(card.answer)
  })

  test('/cards GET tag', async () => {
    const card = await repository.createCard({
      answer: 'answer',
      question: 'question',
      tag: 'tag',
      user: new User('user-1', new Date())
    })

    const response = await fetch(`http://localhost:8080/cards?tag=tag`) 
    const data = await response.json()

    expect(data[0].answer).toBe(card.answer)
  })

  test('/cards POST', async () => {
    const response = await fetch(`http://localhost:8080/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: 'question',
            answer: 'answer'
        })
    }) 
    const data = await response.json()

    expect(data.question).toBe('question')
  })
})
