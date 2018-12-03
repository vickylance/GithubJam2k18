import Phaser from 'phaser';
import { CST } from '../constants';
import Images from '../images';

import MapGenerator from '../utils/CellularAutomata';

class MainGame extends Phaser.Scene {
  // Player
  private player: Phaser.Physics.Arcade.Sprite;
  private moveSpeed: number;
  private isPlayerAlive: boolean;

  // Inputs
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;

  private keyUp: Phaser.Input.Keyboard.Key;
  private keyDown: Phaser.Input.Keyboard.Key;
  private keyLeft: Phaser.Input.Keyboard.Key;
  private keyRight: Phaser.Input.Keyboard.Key;

  private map: MapGenerator;

  constructor() {
    super({ key: CST.SCENES.GAME });
  }

  /**
   * init
   */
  public init() {
    this.moveSpeed = 150;
    this.isPlayerAlive = true;
    this.map = new MapGenerator(60, 60, 45);
    this.map.RandomFillMap();
    this.map.MakeCaverns();
  }

  /**
   * preload
   */
  public preload() {
    // load images
    this.load.spritesheet('background', Images.background, {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.image('dragon', Images.dragon);
    this.load.image('player', Images.player);
    this.load.image('treasure', Images.treasure);
  }

  /**
   * create
   */
  public create() {
    // set the background
    this.caveWalls = this.physics.add.staticGroup();
    for (
      let column: number = 0, row: number = 0;
      row < this.map.MapHeight;
      row++
    ) {
      for (column = 0; column < this.map.MapWidth; column++) {
        if (this.map.Map.valueOf()[column][row] === 1) {
          this.caveWalls
            .create(column * 50, row * 50, 'background', 0)
            .setOrigin(0, 0);
          // this.add.sprite().setOrigin(0, 0);
        }
      }
    }

    // Set the camera
    this.cameras.main.setBounds(0, 0, 1024, 2048);
    this.cameras.main.zoom = 0.2;

    // player
    this.player = this.physics.add.sprite(
      40,
      this.sys.game.config.height / 2,
      'player'
    );
    this.player.setScale(0.5);

    // create inputs
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.keyLeft = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.keyRight = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    // // group of enemies
    // this.enemies = this.add.group({
    //   key: 'dragon',
    //   repeat: 5,
    //   setXY: {
    //     x: 110,
    //     y: 100,
    //     stepX: 80,
    //     stepY: 20
    //   }
    // });
    // // scale enemies
    // Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);
    // // set speeds
    // Phaser.Actions.Call(this.enemies.getChildren(), enemy => {
    //   enemy.speed = Math.random() * 2 + 1;
    // });

    // // goal
    // this.treasure = this.add.sprite(
    //   this.sys.game.config.width - 80,
    //   this.sys.game.config.height / 2,
    //   'treasure'
    // );
    // this.treasure.setScale(0.6);
  }

  /**
   * update
   */
  public update() {
    // Move player
    if (this.keyW.isDown || this.keyUp.isDown) {
      this.player.body.velocity.y = -this.moveSpeed;
    } else if (this.keyS.isDown || this.keyDown.isDown) {
      this.player.body.velocity.y = this.moveSpeed;
    } else {
      this.player.body.velocity.y = 0;
    }

    if (this.keyA.isDown || this.keyLeft.isDown) {
      this.player.body.velocity.x = -this.moveSpeed;
    } else if (this.keyD.isDown || this.keyRight.isDown) {
      this.player.body.velocity.x = this.moveSpeed;
    } else {
      this.player.body.velocity.x = 0;
    }

    this.player.rotation =
      Phaser.Math.Angle.BetweenPoints(this.input.mousePointer, this.player) -
      Math.PI;
    // this.player.angle = (Phaser.Math.Angle.BetweenPoints(this.input.mousePointer, this.player) * 180 / Math.PI) - 180;

    // this.player.y = Phaser.Math.Clamp(this.player.y, 0, this.sys.game.config.height - this.player.height);
    // this.player.x = Phaser.Math.Clamp(this.player.x, 0, this.sys.game.config.width - this.player.width);

    // // only if the player is alive
    // if (!this.isPlayerAlive) {
    //   return;
    // }
    // if (this.input.activePointer.isDown) {
    //   this.player.x += this.playerSpeed;
    // }

    // // treasure collision
    // if (
    //   Phaser.Geom.Intersects.RectangleToRectangle(
    //     this.player.getBounds(),
    //     this.treasure.getBounds()
    //   )
    // ) {
    //   this.highScore++;
    //   this.gameOver();
    // }

    // // enemy movement
    // const enemies = this.enemies.getChildren();
    // for (const enemy of enemies) {
    //   // move enemies
    //   enemy.y += enemy.speed;

    //   // reverse movement if reached the edges
    //   if (enemy.y >= this.enemyMaxY && enemy.speed > 0) {
    //     enemy.speed *= -1;
    //   } else if (enemy.y <= this.enemyMinY && enemy.speed < 0) {
    //     enemy.speed *= -1;
    //   }

    //   // enemy collision
    //   if (
    //     Phaser.Geom.Intersects.RectangleToRectangle(
    //       this.player.getBounds(),
    //       enemy.getBounds()
    //     )
    //   ) {
    //     this.gameOver();
    //     break;
    //   }
    // }
  }

  private gameOver() {
    // flag to set player is dead
    this.isPlayerAlive = false;

    // shake the camera
    this.cameras.main.shake(500);

    // fade camera
    this.time.delayedCall(
      250,
      () => {
        this.cameras.main.fade(250);
      },
      []
    );

    // restart game
    this.time.delayedCall(
      500,
      () => {
        this.scene.restart();
      },
      []
    );
  }
}

export default MainGame;
