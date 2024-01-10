import 'reflect-metadata'; // MANDATORY AS WE USE THIS FOR INJECTION

import { container } from "../inversify.config";
import { IDate } from './date.services';
import { TYPES } from '../infrastructure';

describe('DateService', () => {
  const service = container.get<IDate>(TYPES.DateService);

  test('compareDates a > b', async () => {
      const dateA = new Date('2023-01-01')
      const dateB = new Date('2023-01-02')
      
      expect(service.compareDate(dateA, dateB)).toBe(1)
  })

  test('compareDates a < b', async () => {
      const dateA = new Date('2023-01-01')
      const dateB = new Date('2023-01-02')
      
      expect(service.compareDate(dateB, dateA)).toBe(-1)
  })

  test('compareDates a = b', async () => {
      const dateA = new Date('2023-01-01')
      const dateB = new Date('2023-01-01')
      
      expect(service.compareDate(dateA, dateB)).toBe(0)
  })

  test('compareDates a = b but different timestamp', async () => {
      const dateA = new Date('2023-01-01T14:00:00')
      const dateB = new Date('2023-01-01T15:00:00')
      
      expect(service.compareDate(dateA, dateB)).toBe(0)
  })
})
