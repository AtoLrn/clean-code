import { injectable } from "inversify"

export interface CardsUseCaseInterface {
    getAllCards(tag?: string): undefined
}

@injectable()
export class CardsUseCase implements CardsUseCaseInterface {
    public getAllCards(tag?: string) {
        console.log("ANTOINEqq", tag)
        return undefined
    }
}