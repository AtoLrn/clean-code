import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { container } from "../inversify.config";
import { TYPES } from '../infrastructure';
import { IUuidService } from './uuid.services';

describe('UuidService', () => {
  const service = container.get<IUuidService>(TYPES.UuidService);

  test('generateUuid', async () => {
      expect(service.generateUuid()).not.toBe('')
  })
})
