import Tower from './Tower';

interface IFireTower {}

interface IFireTowerConfig {
  damageOverTime: number;
}

export class FireTower extends Tower implements IFireTower {
  public damageOverTime: number;
  constructor() {
    super(100, 20, 50, 25, [
      {
        level: 2,
        baseCostModifier: 2,
        baseHealthModifier: 1.5,
        baseRangeModifier: 1.25,
        baseSellPriceModifier: 1.5
      },
      {
        level: 3,
        baseCostModifier: 1.3
      }
    ]);
  }
}
