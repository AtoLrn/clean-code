import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from 'uuid';
import { Card } from "../entities/card";
import { TYPES } from "../infrastructure";
import { CardRepository } from "../repositories/card.repository";

export interface CardService {
    isCardSelected(card: Card, date: Date): boolean
    validateCard(card: Card): Promise<Card>
    unvalidateCard(card: Card): Promise<Card>
}

@injectable()
export class CardLegacyService implements CardService {

    @inject(TYPES.CardRepository) private cardRepository: CardRepository;
    
    isCardSelected(card: Card, date: Date): boolean {
        if (card.category === Card.Category.DONE) { return false}

        if (date < card.createdAt) { return false }
        
        const timestampDifference = date.getTime() - card.createdAt.getTime()

        const dayDifference = Math.round(timestampDifference / (1000 * 3600 * 24))


        if (card.category === Card.Category.FIRST && dayDifference >= 1) { return true }
        if (card.category === Card.Category.SECOND && dayDifference >= 2) { return true }
        if (card.category === Card.Category.THIRD && dayDifference >= 4) { return true }
        if (card.category === Card.Category.FOURTH && dayDifference >= 8) { return true }
        if (card.category === Card.Category.FIFTH && dayDifference >= 16) { return true }
        if (card.category === Card.Category.SIXTH && dayDifference >= 32) { return true }
        if (card.category === Card.Category.SEVEN && dayDifference >= 64) { return true }
        
        return false
    } 
    
    async validateCard(card: Card): Promise<Card> {
        if (card.category === Card.Category.SEVEN) {
            card.category = Card.Category.DONE
        } else if (card.category === Card.Category.SIXTH ) {
            card.category = Card.Category.SEVEN
        } else if (card.category === Card.Category.FIFTH ) {
            card.category = Card.Category.SIXTH
        } else if (card.category === Card.Category.FOURTH ) {
            card.category = Card.Category.FIFTH
        } else if (card.category === Card.Category.THIRD ) {
            card.category = Card.Category.FOURTH
        } else if (card.category === Card.Category.SECOND ) {
            card.category = Card.Category.THIRD
        } else if (card.category === Card.Category.FIRST ) {
            card.category = Card.Category.SECOND
        }

        return await this.cardRepository.updateCard(card)
        
    }

    async unvalidateCard(card: Card): Promise<Card> {
        card.category = Card.Category.FIRST

        return await this.cardRepository.updateCard(card)
    }
}