import { inject, injectable } from "inversify";
import { Card } from "../entities/card";
import { User } from "../entities/user";
import { TYPES } from "../infrastructure";
import { IUuidService } from "../services/uuid.services";
import { NotFoundError } from "../entities/not-found";

export interface ICardRepository {
    createCard(props: Card.Create): Promise<Card> | Card
    getCardsByUsers(user: User, tag?: string): Promise<Card[]> | Card[]
    updateCard(card: Card): Promise<Card> | Card
    getCardById(cardId: string): Promise<Card> | Card
}

@injectable()
export class CardMemoryRepository implements ICardRepository {
    @inject(TYPES.UuidService) private uuidService: IUuidService;
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
            throw new NotFoundError('Card not found')
        }

        oldCard.category = card.category

        return card
    }

    public getCardById(cardId: string): Card | Promise<Card> {
        const card = this.cards.find((card) => card.id === cardId)

        if (!card) {
            throw new NotFoundError('Card not found')
        }

        return card
    }
}
