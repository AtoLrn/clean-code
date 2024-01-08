import { inject, injectable } from "inversify"
import { Card } from "../entities/card";
import { TYPES } from "../infrastructure";
import { CardRepository } from "../repositories/card.repository";
import { UserRepository } from "../repositories/user.repository";
import { CardService } from "../services/card.services";

export interface CardsUseCaseInterface {
    getAllCards(tag?: string): Promise<Card[]>
    createCard(props: CardsUseCase.Create): Promise<Card>
    getCardForDate(date: Date): Promise<Card[]>
}

@injectable()
export class CardsUseCase implements CardsUseCaseInterface {
    @inject(TYPES.CardService) private cardService: CardService;

    @inject(TYPES.CardRepository) private cardRepository: CardRepository;
    @inject(TYPES.UserRepository) private userRepository: UserRepository;
    
    
    public async getAllCards(tag?: string) {
        const user = await this.userRepository.getUser('antoine')

        return await this.cardRepository.getCardsByUsers(user, tag)
    }

    public async createCard({ question, answer, tag }: CardsUseCase.Create): Promise<Card> {
        const user = await this.userRepository.getUser('antoine')

        return this.cardRepository.createCard({
            question,
            answer,
            tag,
            user
        })
    }

    public async getCardForDate(date: Date = new Date()): Promise<Card[]> {
        const user = await this.userRepository.getUser('antoine')

        const cards = await this.cardRepository.getCardsByUsers(user)

        return cards.filter((card) => this.cardService.isCardSelected(card, date))
    }
    
}

export namespace CardsUseCase {
    export interface Create {
        question: string
        answer: string,
        tag?: string
    }
}