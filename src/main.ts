import 'reflect-metadata';
import { TYPES } from './infrastructure';
import { container } from './inversify.config';

import {  ExpressRestPortInterface } from "./ports/rest.port";

const server = container.get<ExpressRestPortInterface>(TYPES.ExpressRestPort);

server.start(3000)