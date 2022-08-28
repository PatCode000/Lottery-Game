const m_positionDrawnX = 550;
const m_positionDrawnY = 400;

/**
 * Class is responsible for creating interface to represent collection of 6 balls
 *
 */
export class BallsScreen extends PIXI.Sprite {
  constructor() {
    super();

    this.m_drawnBallsText = [0, 0, 0, 0, 0, 0];

    const m_drawnBallsBackground = new PIXI.Sprite.from(
      "images/HUD_Menu_Back.png"
    );
    m_drawnBallsBackground.anchor.set(0.5);
    m_drawnBallsBackground.width = 750;
    m_drawnBallsBackground.x = m_positionDrawnX;
    m_drawnBallsBackground.y = m_positionDrawnY;
    this.addChild(m_drawnBallsBackground);

    for (let i = 0; i < 6; i++) {
      const button = new PIXI.Sprite.from("images/Ball.png");

      button.anchor.set(0.5);
      button.width = 100;
      button.height = 100;
      button.x = m_positionDrawnX - 245 + 100 * i;
      button.y = m_positionDrawnY;
      this.addChild(button);
    }

    for (let i = 0; i < 6; i++) {
      const numberText = new PIXI.Text("-");
      numberText.anchor.set(0.5);
      numberText.x = m_positionDrawnX - 245 + 100 * i;
      numberText.y = m_positionDrawnY;
      numberText.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 70,
        fontFamily: "ACUTATR",
      });
      this.m_drawnBallsText[i] = numberText;
      this.addChild(numberText);

      // add button to array
    }
  }

  setText(_index, _text) {
    this.m_drawnBallsText[_index].text = _text;
  }
}
