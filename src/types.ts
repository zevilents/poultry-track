export interface Flock {
  id: string;
  chickInDate: string;
  initialPopulation: number;
  docWeight: number;
  breed: string;
  status: 'active' | 'closed';
}

export interface DailyRecord {
  id?: string;
  flockId: string;
  date: string;
  age: number;
  mortality: number;
  culling: number;
  feedIntake: number;
  bodyWeight: number;
}

export interface KPIMetrics {
  remainingBirds: number;
  survivalRate: number;
  totalFeed: number;
  fcr: number;
  adg: number;
  ip: number;
  currentBW: number;
  depletionRate: number;
}