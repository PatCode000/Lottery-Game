import { addPickedBalls, removePickedBalls, isCollectionFull } from "./game.js";

const addNumberEvent = new Event("add-number");
const removeNumberEvent = new Event("remove-number");
const isCollectionFullEvent = new Event("is-collection-full");

export class Ball extends PIXI.Sprite {
  constructor(_number) {
    super();
    this.isPressed = false;
    this.number = _number;
    this.textureBall = PIXI.Texture.from("images/Button_Circle_Blue.png");
    this.textureBallHighlighted = PIXI.Texture.from(
      "images/Button_Circle_Blue_Highlighted.png"
    );
    this.textureBallSelected = PIXI.Texture.from(
      "images/Button_Circle_Blue_Selected.png"
    );
    this.texture = this.textureBall;

    this.width = 60;
    this.height = 60;

    this.interactive = true;
    this.on("pointerdown", this.onBallDown)
      //.on("pointerup", this.onBallUp)
      //.on("pointerupoutside", this.onBallUp)
      .on("pointerover", this.onBallOver)
      .on("pointerout", this.onBallOut);

    const numberText = new PIXI.Text(_number.toString());
    numberText.anchor.set(0.5);
    numberText.x = 75;
    numberText.y = 75;
    numberText.style = new PIXI.TextStyle({
      fill: 0xffffff,
      fontSize: 70,
      fontFamily: "ACUTATR",
    });
    this.addChild(numberText);
  }

  /**
   * Return ball number
   *
   * @return {number} this.number get ball number
   */
  getNumber() {
    return this.number;
  }

  onBallDown() {
    this.isdown = true;
    if (this.isPressed) {
      this.texture = this.textureBall;
      this.isPressed = false;
      this.isdown = false;
      if (this.isOver) {
        this.texture = this.textureBallHighlighted;
      } else {
        this.texture = this.textureBall;
      }
      removePickedBalls(this.getNumber());
    } else {
      if (isCollectionFull()) {
        this.isdown = false;
        return;
      } else {
        this.texture = this.textureBallSelected;
        this.isPressed = true;
        addPickedBalls(this.getNumber());
      }
    }

    this.alpha = 1;
  }

  setBallIsPicked() {
    this.isdown = true;
    this.texture = this.textureBallSelected;
    this.isPressed = true;
  }

  setBallIsUnpicked() {
    this.isdown = false;
    this.texture = this.textureBall;
    this.isPressed = false;
    if (this.isOver) {
      this.texture = this.textureBallHighlighted;
    } else {
      this.texture = this.textureBall;
    }
  }

  onBallOver() {
    if (isCollectionFull()) return;
    this.isOver = true;
    if (this.isdown) {
      return;
    }
    this.texture = this.textureBallHighlighted;
  }

  onBallOut() {
    this.isOver = false;
    if (this.isdown) {
      return;
    }
    this.texture = this.textureBall;
  }
}
