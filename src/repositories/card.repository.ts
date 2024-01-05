import { injectable } from "inversify";
import { Card } from "../entities/card";
import { User } from "../entities/user";

export interface CardRepository {
    createCard(props: Card.Create): Promise<Card> | Card
    getCardsByUsers(user: User, tag?: string): Promise<Card[]> | Card[]
}

@injectable()
export class CardMemoryRepository implements CardRepository {
    private cards: Card[] = []

    createCard({ question, answer, tag, user}: Card.Create) {
        const card = new Card(question, answer, user.id, tag)
        this.cards.push(card)
        return card
    }


    getCardsByUsers(user: User, tag?: string): Card[] | Promise<Card[]> {
        return this.cards.filter((card) => user.id === card.userId && (tag ? card.tag === tag : true  ))
    }
}

export namespace Card {
    export interface Create {
        question: string,
        answer: string,
        tag?: string
        user: User
    }
}