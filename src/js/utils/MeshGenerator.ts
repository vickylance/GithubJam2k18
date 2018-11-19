import Phaser from 'phaser';
import MapGenerator from './MapGenerator';

class LoadGame extends Phaser.Scene {
  private map: MapGenerator;

  constructor() {
    super({ key: 'LoadGame' });
  }
  public init() {
    this.map = new MapGenerator(
      Math.floor(this.sys.game.config.width / 10),
      Math.floor(this.sys.game.config.height / 10),
      45,
      'vignes'
    );
    this.map.generateMap();
    console.log(this.map.mapToString());
  }
  public create() {
    for (let column: number = 0; column < this.map.width; column++) {
      for (let row: number = 0; row < this.map.height; row++) {
        if (this.map.Map.valueOf()[column][row] === 1) {
          const rect = this.add
            .rectangle(column * 10, row * 10, 10, 10, 0x964b00)
            .setOrigin(0);
          rect.isStroked = true;
          rect.lineWidth = 0;
        }
      }
    }
  }
}

const game = new Phaser.Game({
  width: 640,
  height: 640,
  type: Phaser.WEBGL,
  pixelArt: true,
  scene: [LoadGame],
  title: 'They came from SPACE',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false,
      debug: false
    }
  },
  banner: {
    text: '#ffffff',
    background: ['#fff200', '#38f0e8', '#00bff3', '#ec008c'],
    hidePhaser: true
  }
});
