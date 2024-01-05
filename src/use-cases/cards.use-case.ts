import { inject, injectable } from "inversify"
import { Card } from "../entities/card";
import { TYPES } from "../infrastructure";
import { CardRepository } from "../repositories/card.repository";
import { UserRepository } from "../repositories/user.repository";

export interface CardsUseCaseInterface {
    getAllCards(tag?: string): Promise<Card[]>
    createCard(props: CardsUseCase.Create): Promise<Card>
}

@injectable()
export class CardsUseCase implements CardsUseCaseInterface {
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
}

export namespace CardsUseCase {
    export interface Create {
        question: string
        answer: string,
        tag?: string
    }
}