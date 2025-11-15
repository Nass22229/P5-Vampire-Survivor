// DANS projectile.js

class Projectile extends Character {
  constructor(x, y) {
    // Appeler le constructeur de la classe "Character"
    super(x, y); 
    
    this.r_pourDessin = 4; // Plus petit
    this.maxSpeed = 7;     // Plus rapide que les ennemis
    this.maxForce = 0.5;
    this.dureeDeVie = 1.5;   // Dure 3 secondes
  }

  update(){
    super.update();
    this.dureeDeVie -= 1/60; // Réduire la durée de vie
  }

  // "Cerveau" du projectile : chasser l'ennemi le plus proche
  updateBehavior(enemies) {
    let nearestEnemy = this.getVehiculeLePlusProche(enemies);
    
    if (nearestEnemy) {
      // On utilise la fonction "seek" héritée de Character
      let force = this.seek(nearestEnemy.pos);
      this.applyForce(force);
    } else {
      // S'il n'y a pas d'ennemis, va tout droit
      // (on n'applique aucune force, il continue sur sa lancée)
    }
  }

  // Dessin personnalisé pour le projectile
  show() {
    push();
    fill(0, 255, 0); // Un projectile vert
    noStroke();
    circle(this.pos.x, this.pos.y, this.r_pourDessin * 2);
    pop();
  }
}