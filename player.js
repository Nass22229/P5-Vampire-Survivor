// DANS player.js

class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 16;
    this.speed = 5;
    this.health = 100;
    this.maxHealth = 100;
  }

  // Mettre à jour la position en fonction des touches
  update() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(81)) { // 81 = Q (pour ZQSD)
      this.pos.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // 68 = D
      this.pos.x += this.speed;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(90)) { // 90 = Z
      this.pos.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // 83 = S
      this.pos.y += this.speed;
    }
  }

  // Dessiner le joueur
  show() {
    push();
    fill(0, 150, 255); // Un joueur bleu
    this.showHealthBar();
    noStroke();
    circle(this.pos.x, this.pos.y, this.r * 2);
    pop();
  }

  showHealthBar() {
    push();
    noStroke();
    fill(255, 0, 0);
    rectMode(CORNER);
    let barWidth = this.r * 2;
    rect(this.pos.x - this.r, this.pos.y - this.r - 10, barWidth, 5);

    fill(0, 255, 0);
    let currentHealthWidth = barWidth * (this.health / this.maxHealth);
    rect(this.pos.x - this.r, this.pos.y - this.r - 10, currentHealthWidth, 5);
    pop();
}
}