import * as math from 'mathjs';

export default class MapGenerator {
  public rand: number = Math.random();
  public Map: number[][];
  private MapWidth: number;
  private MapHeight: number;
  private PercentAreWalls: number;

  constructor(
    mapWidth: number,
    mapHeight: number,
    percentWalls: number = 40,
    map?: number[][]
  ) {
    this.MapWidth = mapWidth;
    this.MapHeight = mapHeight;
    this.PercentAreWalls = percentWalls;
    this.Map = map || math.zeros(mapWidth, mapHeight);
  }

  public MapHandler(): void {
    this.MapWidth = 40;
    this.MapHeight = 21;
    this.PercentAreWalls = 40;
    this.RandomFillMap();
  }

  public MakeCaverns(): void {
    // By initilizing column in the outter loop, its only created ONCE
    for (
      let column: number = 0, row: number = 0;
      row <= this.MapHeight - 1;
      row++
    ) {
      for (column = 0; column <= this.MapWidth - 1; column++) {
        this.Map.valueOf()[column][row] = this.PlaceWallLogic(column, row);
      }
    }
  }

  public PlaceWallLogic(x: number, y: number): number {
    const numWalls: number = this.GetAdjacentWalls(x, y, 1, 1);
    if (this.Map.valueOf()[x][y] === 1) {
      if (numWalls >= 4) {
        return 1;
      }
      if (numWalls < 2) {
        return 0;
      }
    } else {
      if (numWalls >= 5) {
        return 1;
      }
    }
    return 0;
  }

  public GetAdjacentWalls(
    x: number,
    y: number,
    scopeX: number,
    scopeY: number
  ): number {
    const startX: number = x - scopeX;
    const startY: number = y - scopeY;
    const endX: number = x + scopeX;
    const endY: number = y + scopeY;

    let iX: number = startX;
    let iY: number = startY;

    let wallCounter: number = 0;

    for (iY = startY; iY <= endY; iY++) {
      for (iX = startX; iX <= endX; iX++) {
        if (!(iX === x && iY === y)) {
          if (this.IsWall(iX, iY)) {
            wallCounter += 1;
          }
        }
      }
    }
    return wallCounter;
  }

  public IsWall(x: number, y: number): boolean {
    // Consider out-of-bound a wall
    if (this.IsOutOfBounds(x, y)) {
      return true;
    }

    return this.Map.valueOf()[x][y] === 1 ? true : false;
  }

  public IsOutOfBounds(x: number, y: number): boolean {
    if (x < 0 || y < 0) {
      return true;
    } else if (x > this.MapWidth - 1 || y > this.MapHeight - 1) {
      return true;
    }
    return false;
  }

  public PrintMap(): void {
    console.log(this.MapToString());
  }

  public BlankMap(): void {
    for (let column: number = 0, row: number = 0; row < this.MapHeight; row++) {
      for (column = 0; column < this.MapWidth; column++) {
        this.Map.valueOf()[column][row] = 0;
      }
    }
  }

  public RandomFillMap(): void {
    let mapMiddle: number = 0; // Temp variable
    for (let column: number = 0, row: number = 0; row < this.MapHeight; row++) {
      for (column = 0; column < this.MapWidth; column++) {
        // If coordinants lie on the the edge of the map (creates a border)
        if (column === 0) {
          this.Map.valueOf()[column][row] = 1;
        } else if (row === 0) {
          this.Map.valueOf()[column][row] = 1;
        } else if (column === this.MapWidth - 1) {
          this.Map.valueOf()[column][row] = 1;
        } else if (row === this.MapHeight - 1) {
          this.Map.valueOf()[column][row] = 1;
        }
        // Else, fill with a wall a random percent of the time
        else {
          mapMiddle = this.MapHeight / 2;
          this.Map.valueOf()[column][row] =
            row === mapMiddle ? 0 : this.RandomPercent(this.PercentAreWalls);
        }
      }
    }
  }

  private RandomPercent(percent: number): number {
    return percent >= Math.floor(Math.random() * 100) ? 1 : 0;
  }

  private MapToString(): string {
    let returnString: string = [
      'Width:',
      this.MapWidth,
      '\tHeight:',
      this.MapHeight,
      '\t% Walls:',
      this.PercentAreWalls,
      '\n'
    ].join(' ');

    const mapSymbols: string[] = [];
    mapSymbols.push('.');
    mapSymbols.push('#');
    mapSymbols.push('+');

    for (let column: number = 0, row: number = 0; row < this.MapHeight; row++) {
      for (column = 0; column < this.MapWidth; column++) {
        returnString += mapSymbols[this.Map.valueOf()[column][row]];
      }
      returnString += '\n';
    }
    return returnString;
  }
}

// const mapGenerator = new MapHandler(100, 25, 42);
// mapGenerator.RandomFillMap();
// mapGenerator.BlankMap();
// mapGenerator.MakeCaverns();
// console.log(mapGenerator.Map)
// mapGenerator.PrintMap();
