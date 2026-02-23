import { Flock, DailyRecord, InventoryItem } from './types';

export const INITIAL_FLOCK: Flock = {
  id: 'flock-001',
  chickInDate: new Date().toISOString().split('T')[0],
  initialPopulation: 0,
  docWeight: 0,
  breed: 'Cobb 500',
  status: 'active',
};

export const INITIAL_INVENTORY: InventoryItem[] = [];

export const MOCK_DAILY_RECORDS: DailyRecord[] = [];
