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
        this.server.use(express.json());

        this.server.get("/cards", async (req, res) => {
            if (typeof req.query.tag === "string" ) 
            res.send(JSON.stringify(await this.cardsUseCase.getAllCards(req.query.tag)));
        });

        this.server.post("/cards", async (req, res) => {
            res.send(JSON.stringify(await this.cardsUseCase.createCard(req.body as CardsUseCase.Create)))
        });


        this.server.listen(port, () => {
            console.log('LISTENING')
        })
    }
}
