import { Container } from "inversify";
import { TYPES } from "./infrastructure";
import { ExpressRestPort, ExpressRestPortInterface } from "./ports/rest.port";
import { CardMemoryRepository, CardRepository } from "./repositories/card.repository";
import { UserMemoryRepository, UserRepository } from "./repositories/user.repository";
import { CardsUseCase, CardsUseCaseInterface } from "./use-cases/cards.use-case";
import { UuidRandomService, UuidService } from "./services/uuid.services";
import { CardLegacyService, CardService } from "./services/card.services";

const container = new Container();
container.bind<CardsUseCaseInterface>(TYPES.CardUseCase).to(CardsUseCase);
container.bind<ExpressRestPortInterface>(TYPES.ExpressRestPort).to(ExpressRestPort);
container.bind<CardRepository>(TYPES.CardRepository).to(CardMemoryRepository).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepository).to(UserMemoryRepository);
container.bind<UuidService>(TYPES.UuidService).to(UuidRandomService);
container.bind<CardService>(TYPES.CardService).to(CardLegacyService);


export { container };