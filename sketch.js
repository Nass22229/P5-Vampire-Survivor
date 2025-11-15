// DANS sketch.js

let player;
let enemies = [];
let projectiles = [];
let obstacles = [];

let gameState = 'START_SCREEN';

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Créer le joueur au centre
  player = new Player(width / 2, height / 2);
  
  // Créer un ennemi dans un coin
  //enemy = new Enemy(100, 100);

  // Créer quelques obstacles

}

function draw() {
  if(gameState === 'PLAYING') {
    background(0, 100, 0);

  // Mettre à jour et dessiner le joueur
  player.update();
  player.show();
  player.showHealthBar();

  //Faire spawner un ennemi toutles 2 secondes (120 frames)
  if (frameCount % 120 === 0) {
    // Apparaît sur un bord aléatoire de l'écran
    let x = random() < 0.5 ? random(-20, 0) : random(width, width + 20);
    let y = random() < 0.5 ? random(-20, 0) : random(height, height + 20);
    enemies.push(new Enemy(x, y));
  }

  //Mettre à jour et dessiner tous les ennemis
  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    
    // L'ennemi chasse le joueur et évite les obstacles/autres ennemis
    e.applyBehaviors(player.pos, obstacles, enemies); 
    e.update();
    e.show();
    
    // Tuer l'ennemi
    if (e.dureeDeVie < 0) {
      enemies.splice(i, 1);
    }
    
    // Collision Joueur-Ennemi
    let d = dist(player.pos.x, player.pos.y, e.pos.x, e.pos.y);
    if (d < player.r + e.r_pourDessin) {
        player.health -= 10; // Le joueur prend 1 dégât

        // Game Over seulement si la vie est à 0
        if (player.health <= 0) {
        //background(255, 0, 0); 
        //noLoop();
        gameState = 'GAME_OVER';
        } 
    }    
  }

  // Tire un projectile toutes les 0.5 secondes (30 frames)
  /*if (frameCount % 30 === 0) {
    projectiles.push(new Projectile(player.pos.x, player.pos.y));
  }*/
  
  // Mettre à jour et dessiner tous les projectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    
    p.updateBehavior(enemies);
    p.update();
    p.show();
    
    // Tuer le projectile s'il est trop vieux
    if (p.dureeDeVie < 0) {
      projectiles.splice(i, 1);
      continue; // Passe au projectile suivant
    }
    
    // COLLISIONS Projectile-Ennemi
    for (let j = enemies.length - 1; j >= 0; j--) {
      let enemy = enemies[j];
      let d = dist(p.pos.x, p.pos.y, enemy.pos.x, enemy.pos.y);
      
      // COLLISION !
      if (d < p.r_pourDessin + enemy.r_pourDessin) {
        enemy.health -= 25; // Le projectile fait 50 dégâts
        projectiles.splice(i, 1); // Tuer le projectile

        if (enemy.health <= 0) {
            enemies.splice(j, 1); // Tuer l'ennemi s'il n'a plus de vie
        }
        break; 
      }
    }
  }
  
  // Dessiner tous les obstacles
  for (let o of obstacles) {
    o.show();
  }
  } else if(gameState === 'START_SCREEN') {
    background(0); // Fond noir
    textAlign(CENTER, CENTER);
    fill(255);
    
    textSize(24);
    text(
      "Bienvenue dans le nouveau monde, vous êtes le dernier espoir de l'humanité contre les vampires.\n" +
      "Appuyez sur 'S' pour tirer, cliquez pour créer des obstacles.\n" +
      "Bonne chance contre la horde, vous en aurez besoin !",
      width / 2, height / 2 - 50
    );
    
    textSize(18);
    fill(255, 255, 0); // Jaune
    
    // Effet clignotant pour le texte
    if (frameCount % 60 < 30) {
      text("[Appuyez sur 'Espace' pour commencer]", width / 2, height / 2 + 80);
    }
  } else if (gameState === 'GAME_OVER') {
    background(150, 0, 0); // Fond rouge sombre
    textAlign(CENTER, CENTER);
    fill(255);
    
    textSize(48);
    text("GAME OVER!", width / 2, height / 2 - 40);
    
    textSize(24);
    text("Vous avez été infecté.", width / 2, height / 2 + 20);
  }
  
  
}

//Tirer un projectile avec le button "S"
  function keyPressed() {
   if(gameState === 'PLAYING') {   
     // 83 est le keyCode pour 'S' (minuscule ou majuscule)
    if (key === 's' || key === 'S' || keyCode === 83) {
        projectiles.push(new Projectile(player.pos.x, player.pos.y));
    }
  
    // (Optionnel) Appuyez sur 'd' pour le débogage
    if (key === 'd') {
        Character.debug = !Character.debug;
    }
   } else if (gameState === 'START_SCREEN') {
    // 32 est le keyCode pour la barre Espace
    if (keyCode === 32) {
      gameState = 'PLAYING';
    }
   }
  }
  
  function mousePressed() {
    if (gameState === 'PLAYING') {
        // Ajoute un obstacle là où on clique
        obstacles.push(new Obstacle(mouseX, mouseY, random(30, 60), 'gray'));
    }
}