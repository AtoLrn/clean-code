import { inject, injectable } from "inversify"
import { Card } from "../entities/card";
import { TYPES } from "../infrastructure";
import { CardRepository } from "../repositories/card.repository";
import { UserRepository } from "../repositories/user.repository";
import { CardService } from "../services/card.services";
import { IDate } from "../services/date.services";
import { NotFoundError } from "../entities/not-found";

export interface CardsUseCaseInterface {
    getAllCards(tag?: string): Promise<Card[]>
    createCard(props: CardsUseCase.Create): Promise<Card>
    getCardForDate(date: Date): Promise<Card[]>
    answerCard(cardId: string, isValid: boolean): Promise<Card>
}

@injectable()
export class CardsUseCase implements CardsUseCaseInterface {
    @inject(TYPES.CardService) private cardService: CardService;
    @inject(TYPES.DateService) private dateService : IDate;

    @inject(TYPES.CardRepository) private cardRepository: CardRepository;
    @inject(TYPES.UserRepository) private userRepository: UserRepository;
    
    public async getAllCards(tag?: string) {
        const user = await this.userRepository.getUserById('user-1')

        return await this.cardRepository.getCardsByUsers(user, tag)
    }

    public async createCard({ question, answer, tag }: CardsUseCase.Create): Promise<Card> {
        const user = await this.userRepository.getUserById('user-1')

        return this.cardRepository.createCard({
            question,
            answer,
            tag,
            user
        })
    }

    public async getCardForDate(date: Date = new Date()): Promise<Card[]> {
        const user = await this.userRepository.getUserById('user-1')

        if(this.dateService.compareDate(date, user.lastQuizz) !== 1) return []

        const cards = await this.cardRepository.getCardsByUsers(user)
        
        this.userRepository.updateUser(user)

        return cards.filter((card) => this.cardService.isCardSelected(card, date))
    }

    public async answerCard(cardId: string, isValid: boolean): Promise<Card> {
        try {
            const card = await this.cardRepository.getCardById(cardId)

            if (isValid) {
                return await this.cardService.validateCard(card)
            } else {
                return await this.cardService.unvalidateCard(card)
            }
            
        } catch {
            throw new NotFoundError('Card not found')
        }
    }
    
}

export namespace CardsUseCase {
    export interface Create {
        question: string
        answer: string,
        tag?: string
    }
}
