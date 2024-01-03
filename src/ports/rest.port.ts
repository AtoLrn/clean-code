import { CardsUseCase } from "../use-cases/cards.use-case";
import express from 'express';
import { inject, injectable } from "inversify";
import { TYPES } from "../infrastructure";

export interface ExpressRestPortInterface {
    start(port: number): void
}

@injectable()
export class ExpressRestPort implements ExpressRestPortInterface {
    @inject(TYPES.CardUseCase) private cardsUseCase: CardsUseCase;
    
    private server: express.Express
    constructor() {
        this.server = express();
    }

    public start(port: number) {
        this.server.get("/cards", (_, res) => {
            this.cardsUseCase.getAllCards("test")
            res.send("Hello ddaVite + TypeScript!");
        });


        this.server.listen(port, () => {
            console.log('LISTENING')
        })
    }
}
