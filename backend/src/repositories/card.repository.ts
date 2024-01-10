import { inject, injectable } from "inversify";
import { Card } from "../entities/card";
import { User } from "../entities/user";
import { TYPES } from "../infrastructure";
import { UuidService } from "../services/uuid.services";

export interface CardRepository {
    createCard(props: Card.Create): Promise<Card> | Card
    getCardsByUsers(user: User, tag?: string): Promise<Card[]> | Card[]
    updateCard(card: Card): Promise<Card> | Card
    getCardById(cardId: string): Promise<Card> | Card
}

@injectable()
export class CardMemoryRepository implements CardRepository {
    @inject(TYPES.UuidService) private uuidService: UuidService;
    private cards: Card[] = []

    public createCard({ question, answer, tag, user}: Card.Create) {
        const id = this.uuidService.generateUuid()
        const card = new Card(id, question, answer, user.id, Card.Category.FIRST,tag)
        this.cards.push(card)
        return card
    }

    public getCardsByUsers(user: User, tag?: string): Card[] | Promise<Card[]> {
        return this.cards.filter((card) => user.id === card.userId && (tag ? card.tag === tag : true  ))
    }

    public updateCard(card: Card): Promise<Card> | Card {
        const oldCard = this.cards.find((storedCard) => storedCard.id === card.id)

        if (!oldCard) {
            throw new Error('Card not found')
        }

        oldCard.category = card.category

        return card
    }

    public getCardById(cardId: string): Card | Promise<Card> {
        const card = this.cards.find((card) => card.id === cardId)

        if (!card) {
            throw new Error('Card not found')
        }

        return card
    }
}
