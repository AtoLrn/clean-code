import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { container } from "../inversify.config";
import { TYPES } from '../infrastructure';
import { UuidService } from './uuid.services';

describe('UuidService', () => {
  const service = container.get<UuidService>(TYPES.UuidService);

  test('generateUuid', async () => {
      expect(service.generateUuid()).not.toBe('')
  })
})
