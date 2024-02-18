import 'reflect-metadata';
import { TYPES } from './infrastructure';
import { container } from './inversify.config';

import {  IExpressRestPort } from "./ports/rest.port";

const server = container.get<IExpressRestPort>(TYPES.ExpressRestPort);

server.start(8080)