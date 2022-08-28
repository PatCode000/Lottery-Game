const m_fontSize = 100;
const m_textWidth = 200;
const m_textHeight = 100;

/**
 * Class is used to create score screen
 *
 * @param {number} _number Pass the number of the ball to add.
 */
export class ScoreScreen extends PIXI.Sprite {
  constructor() {
    super();
    this.texture = PIXI.Texture.from("images/Menu_Grey.png");

    this.width = 450;
    this.height = 250;

    const matchText = new PIXI.Text("MATCH : ");
    matchText.anchor.set(0.5);
    matchText.x = 200;
    matchText.y = 225;
    matchText.width = m_textWidth;
    matchText.height = m_textHeight;
    matchText.style = new PIXI.TextStyle({
      fill: 0xff8888,
      fontSize: m_fontSize,
      fontFamily: "ACUTATR",
    });
    this.addChild(matchText);

    const scoreText = new PIXI.Text("SCORE : ");
    scoreText.anchor.set(0.5);
    scoreText.x = 200;
    scoreText.y = 350;
    scoreText.width = m_textWidth;
    scoreText.height = m_textHeight;
    scoreText.style = new PIXI.TextStyle({
      fill: 0xff8888,
      fontSize: m_fontSize,
      fontFamily: "ACUTATR",
    });
    this.addChild(scoreText);

    this.matchTextNumber = new PIXI.Text("0");
    this.matchTextNumber.anchor.set(0.5);
    this.matchTextNumber.x = 400;
    this.matchTextNumber.y = 225;
    this.matchTextNumber.width = 50;
    this.matchTextNumber.height = m_textHeight;
    this.matchTextNumber.style = new PIXI.TextStyle({
      fill: 0xff8888,
      fontSize: m_fontSize,
      fontFamily: "ACUTATR",
    });
    this.addChild(this.matchTextNumber);

    this.scoreTextNumber = new PIXI.Text("0");
    this.scoreTextNumber.anchor.set(0.5);
    this.scoreTextNumber.x = 400;
    this.scoreTextNumber.y = 350;
    //this.scoreTextNumber.width = m_textWidth;
    this.scoreTextNumber.height = m_textHeight;
    this.scoreTextNumber.style = new PIXI.TextStyle({
      fill: 0xff8888,
      fontSize: m_fontSize,
      fontFamily: "ACUTATR",
    });
    this.addChild(this.scoreTextNumber);
  }

  updateMatchText(_number) {
    this.matchTextNumber.text = _number.toString();
  }

  updateScoreText(_number) {
    this.scoreTextNumber.text = _number.toString();
  }
}
