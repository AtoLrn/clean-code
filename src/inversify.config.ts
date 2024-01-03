import { Container } from "inversify";
import { TYPES } from "./infrastructure";
import { ExpressRestPort, ExpressRestPortInterface } from "./ports/rest.port";
import { CardsUseCase, CardsUseCaseInterface } from "./use-cases/cards.use-case";

const container = new Container();
container.bind<CardsUseCaseInterface>(TYPES.CardUseCase).to(CardsUseCase);
container.bind<ExpressRestPortInterface>(TYPES.ExpressRestPort).to(ExpressRestPort);


export { container };