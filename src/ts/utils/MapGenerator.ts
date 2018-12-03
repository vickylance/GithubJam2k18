import * as math from 'mathjs';
import seedRandom from 'seedrandom';

export default class MapGenerator {
  public width: number;
  public height: number;
  public seed: string;
  public Map: number[][];

  private rng;
  private wallsPercent: number;

  constructor(
    width: number,
    height: number,
    wallsPercent: number = 45,
    seed: string = Math.random().toString(),
    map?: number[][]
  ) {
    this.width = width;
    this.height = height;
    this.wallsPercent = wallsPercent;
    this.seed = seed;
    this.rng = seedRandom(this.seed);
    this.Map = map || math.zeros(width, height);
  }

  /**
   * generateMap
   */
  public generateMap() {
    this.randomFillMap();

    for (let iterations = 0; iterations < 4; iterations++) {
      this.smoothMap();
    }
  }

  /**
   * randomFillMap
   */
  public randomFillMap() {
    for (let column: number = 0; column < this.width; column++) {
      for (let row: number = 0; row < this.height; row++) {
        if (
          row === 0 ||
          row === this.height - 1 ||
          column === 0 ||
          column === this.width - 1
        ) {
          this.Map.valueOf()[column][row] = 1;
        } else {
          this.Map.valueOf()[column][row] = this.randomPercent();
        }
      }
    }
  }

  /**
   * smoothMap
   */
  public smoothMap() {
    const r = 0;
    for (let column: number = 0; column < this.width; column++) {
      for (let row: number = 0; row < this.height; row++) {
        const neighbourWallCount = this.getSurroundingWallCount(column, row);
        if (neighbourWallCount > 4) {
          this.Map.valueOf()[column][row] = 1;
        } else if (neighbourWallCount < 4) {
          // You can change it to <= 4 for the cave to look like man made
          this.Map.valueOf()[column][row] = 0;
        }
      }
    }
  }

  /**
   * getSurroundingWallCount
   */
  public getSurroundingWallCount(gridX: number, gridY: number): number {
    let wallCount: number = 0;

    for (
      let neighbourX: number = gridX - 1;
      neighbourX <= gridX + 1;
      neighbourX++
    ) {
      for (
        let neighbourY: number = gridY - 1;
        neighbourY <= gridY + 1;
        neighbourY++
      ) {
        if (
          neighbourX > 0 &&
          neighbourX < this.width &&
          neighbourY > 0 &&
          neighbourY < this.height
        ) {
          if (neighbourX !== gridX || neighbourY !== gridY) {
            wallCount += this.Map.valueOf()[neighbourX][neighbourY];
          }
        } else {
          wallCount++;
        }
      }
    }
    return wallCount;
  }

  public mapToString(): string {
    let returnString: string = [
      'Width:',
      this.width,
      '\tHeight:',
      this.height,
      '\t% Walls:',
      this.wallsPercent,
      '\n'
    ].join(' ');

    const mapSymbols: string[] = [];
    mapSymbols.push('.');
    mapSymbols.push('#');
    mapSymbols.push('+');

    for (let row: number = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        returnString += mapSymbols[this.Map.valueOf()[column][row]];
      }
      returnString += '\n';
    }
    return returnString;
  }

  private randomPercent(): number {
    return this.wallsPercent >= Math.floor(this.rng() * 100) ? 1 : 0;
  }
}
