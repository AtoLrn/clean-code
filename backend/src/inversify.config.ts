import { Container } from "inversify";
import { TYPES } from "./infrastructure";
import { ExpressRestPort, IExpressRestPort } from "./ports/rest.port";
import { CardMemoryRepository, ICardRepository } from "./repositories/card.repository";
import { UserMemoryRepository, IUserRepository } from "./repositories/user.repository";
import { CardsUseCase, ICardsUseCase } from "./use-cases/cards.use-case";
import { UuidService, IUuidService } from "./services/uuid.services";
import { CardService, ICardService } from "./services/card.services";
import { DateService, IDate } from "./services/date.services";

const container = new Container();
container.bind<ICardsUseCase>(TYPES.CardUseCase).to(CardsUseCase);
container.bind<IExpressRestPort>(TYPES.ExpressRestPort).to(ExpressRestPort);
container.bind<ICardRepository>(TYPES.CardRepository).to(CardMemoryRepository).inSingletonScope();
container.bind<IUserRepository>(TYPES.UserRepository).to(UserMemoryRepository);
container.bind<IUuidService>(TYPES.UuidService).to(UuidService);
container.bind<ICardService>(TYPES.CardService).to(CardService);
container.bind<IDate>(TYPES.DateService).to(DateService);


export { container };
