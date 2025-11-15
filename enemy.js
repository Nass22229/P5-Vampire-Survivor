// DANS enemy.js

class Enemy extends Character {
  constructor(x, y) {
    // Appeler le constructeur de la classe "Character"
    super(x, y); 
    
    this.r = 10;
    this.maxSpeed = 5; // Plus lent que le joueur
    this.maxForce = 0.3;
  }

  // "Cerveau" de l'ennemi : chasser le joueur
  chase(player) {
    // On utilise la fonction "seek" héritée de Vehicle
    let force = this.seek(player.pos);
    this.applyForce(force);
  }

  // Dessin personnalisé pour l'ennemi
  show() {
    push();
    fill(255, 0, 0); // Un ennemi rouge
    this.showHealthBar();
    stroke(0);
    strokeWeight(1);
    translate(this.pos.x, this.pos.y);
    // On tourne dans la direction de la vélocité
    rotate(this.vel.heading()); 
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }
}