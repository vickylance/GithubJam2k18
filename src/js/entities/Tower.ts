
interface ITowerLevelConfig {
  public level: number;
  public baseHealthModifier: number;
  public baseRangeModifier: number;
  public baseCostModifier: number;
  public baseSellPriceModifier: number;
}

export default abstract class Tower {
  public baseHealth: number;
  public baseRange: number;
  public baseCost: number;
  public baseSellPrice: number;
  public levelConfig[]: ITowerLevelConfig;

  constructor(baseHealth: number, baseRange: number, baseCost: number, baseSellPrice: number, levelConfig: ITowerLevelConfig[]) {
    this.baseCost = baseCost;
    this.baseHealth = baseHealth;
    this.baseRange = baseRange;
    this.baseSellPrice = baseSellPrice;
    this.levelConfig = levelConfig;
  }

  
}
