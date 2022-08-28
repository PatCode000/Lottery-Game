import {
  luckyDipButtonPressed,
  drawButtonPressed,
  resetButtonPressed,
} from "./game.js";

const m_positionDrawnX = 550;
const m_positionDrawnY = 400;

let buttons;

const textureButton = PIXI.Texture.from("images/Button_Small_Blue.png");
const textureButtonDown = PIXI.Texture.from(
  "images/Button_Small_Blue_Selected.png"
);
const textureButtonOver = PIXI.Texture.from(
  "images/Button_Small_Blue_Highlighted.png"
);

/**
 * Class responsible for creating interface with buttons
 *
 */
export class ButtonsComponent extends PIXI.Sprite {
  constructor() {
    super();
    this.textureButton;

    buttons = [];
    this.buttonsText = [];

    // Create background
    const m_menuBackground = new PIXI.Sprite.from("images/Menu_Grey.png");
    m_menuBackground.anchor.set(0.5);
    m_menuBackground.width = 350;
    m_menuBackground.height = 500;
    m_menuBackground.x = m_positionDrawnX;
    m_menuBackground.y = m_positionDrawnY;
    this.addChild(m_menuBackground);

    // Create buttons
    for (let i = 0; i < 3; i++) {
      const button = new PIXI.Sprite(textureButton);
      button.anchor.set(0.5);
      button.width = 250;
      button.height = 100;
      button.x = m_positionDrawnX;
      button.y = -125 + m_positionDrawnY + (button.height + 20) * i;
      button.interactive = true;
      button.buttonMode = true;

      button
        .on("pointerdown", this.onButtonDown)
        .on("pointerup", this.onButtonUp)
        .on("pointerupoutside", this.onButtonUp)
        .on("pointerover", this.onButtonOver)
        .on("pointerout", this.onButtonOut);
      buttons[i] = button;
      this.addChild(button);

      const buttonText = new PIXI.Text("text");
      buttonText.anchor.set(0.5);
      buttonText.x = m_positionDrawnX;
      buttonText.y = -125 + m_positionDrawnY + (button.height + 20) * i;
      buttonText.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 40,
        fontFamily: "ACUTATR",
      });
      this.addChild(buttonText);
      this.buttonsText.push(buttonText);
    }
    this.buttonsText[0].text = "Lucky Dip";
    this.buttonsText[1].text = "Draw Balls";
    this.buttonsText[2].text = "RESET";
  }

  onButtonDown() {
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;

    if (this == buttons[0]) {
      luckyDipButtonPressed();
    }
    if (this == buttons[1]) {
      drawButtonPressed();
    }
    if (this == buttons[2]) {
      resetButtonPressed();
    }
  }

  onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
      this.texture = textureButtonOver;
    } else {
      this.texture = textureButton;
    }
  }

  onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
      return;
    }
    this.texture = textureButtonOver;
  }

  onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
      return;
    }
    this.texture = textureButton;
  }
}
