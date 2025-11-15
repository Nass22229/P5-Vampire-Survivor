=========================================================
PROJET EMSI RABAT 2025/2026 - IA Réactives - SUJET 1
Jeu de type "Vampire Survivors" avec Comportements de Pilotage
=========================================================

Auteur: [Nassime HANBALI]
Projet inspiré de "Vampire Survivors" et utilisant les concepts de comportements de pilotage vus en cours.

---
DESCRIPTION DU PROJET
---

Ce projet est un jeu de survie en arène développé en p5.js. Le joueur (une boule bleue) doit survivre le plus longtemps possible à une horde d'ennemis (flèches rouges) qui apparaissent continuellement.

Le joueur peut se déplacer, et les tirs ciblent l'ennemi le plus proche. Les ennemis et les projectiles utilisent des comportements de pilotage basés sur les forces pour naviguer dans l'environnement.

---
COMMANDES
---

* **Flèches directionnelles**: Déplacer le joueur.
* **Touche 'S'**: Tirer un projectile (cherche l'ennemi le plus proche).
* **Clic de souris**: Placer un obstacle (un rocher gris) à la position du curseur.
* **Touche 'Espace'**: Démarrer la partie (depuis l'écran d'accueil).
* **Touche 'd'**: Activer/Désactiver le mode de débogage (affiche les vecteurs d'évitement des ennemis).

---
FONCTIONNALITÉS PRINCIPALES
---

* **Système d'états de jeu** : Le jeu possède 3 états : 'START_SCREEN' (accueil), 'PLAYING' (en jeu), et 'GAME_OVER' (fin).
* **Moteur physique basé sur les forces** : Tous les agents (ennemis, projectiles) sont des "véhicules" qui obéissent aux lois de position, vélocité, accélération implémentées dans `character.js`.
* **Barres de vie** : Le joueur et les ennemis ont des points de vie. Le joueur perd de la vie au contact d'un ennemi, les ennemis en perdent au contact d'un projectile.
* **Spawning** : De nouveaux ennemis apparaissent à intervalle régulier sur les bords de l'écran.
* **Collisions** : Les collisions sont gérées en comparant la distance entre deux objets à la somme de leurs rayons (`dist < r1 + r2`).
* **Obstacles dynamiques** : Le joueur peut cliquer pour ajouter des obstacles que les ennemis doivent éviter.

---
IMPLÉMENTATION TECHNIQUE (Critères du cours)
---

Ce projet démontre l'utilisation des concepts de pilotage vus en cours :

1.  **Classe de Base `Character.js`** :
    C'est la classe "véhicule" principale. Elle contient toute la logique de mouvement (`update()`), d'application des forces (`applyForce()`), et l'implémentation de **tous les comportements de pilotage** (seek, flee, arrive, avoid, separate, boundaries).

2.  **Héritage** :
    Les classes `Enemy.js` et `Projectile.js` héritent de `Character.js`. Cela leur permet de réutiliser toute la logique de physique et les algorithmes de pilotage, tout en ayant un `constructor` et un `show()` personnalisés.

3.  **Combinaison de Forces (`applyBehaviors`)** :
    Le "cerveau" des ennemis se trouve dans `applyBehaviors` (appelé depuis `sketch.js`). Cette méthode combine plusieurs forces (pondérées) pour créer un comportement dynamique et intelligent :
    * `seekForce` (vers le joueur) : Pondérée à 0.2.
    * `avoidForce` (pour les obstacles) : Pondérée à 3.0 (haute priorité).
    * `separateForce` (pour les autres ennemis) : Pondérée à 0.2.

4.  **Tirs utilisant des Comportements** :
    Les projectiles (`projectile.js`) sont des agents autonomes. Ils utilisent la fonction `updateBehavior()` qui appelle `this.seek(nearestEnemy.pos)` pour traquer et chasser l'ennemi le plus proche.

5.  **Évitement d'obstacles et Séparation** :
    Les ennemis utilisent activement `avoid()` (basé sur la projection du vecteur "ahead") pour contourner les obstacles et `separate()` pour s'éviter entre eux, empêchant le "clumping".

---
STRUCTURE DES FICHIERS
---

* **sketch.js**: Boucle de jeu principale (`draw()`), gestion des états (`gameState`), gestion des collisions et des spawns.
* **character.js**: (Le "véhicule") Classe de base pour tous les agents. Contient `update()`, `applyForce()`, et les algorithmes `seek`, `flee`, `arrive`, `avoid`, `separate`, `boundaries`.
* **player.js**: Classe pour le joueur. Utilise un mouvement direct par clavier (sans forces) pour une meilleure réactivité.
* **enemy.js**: Hérite de `Character`. Appelle `applyBehaviors` pour chasser/éviter.
* **projectile.js**: Hérite de `Character`. Utilise `seek` sur l'ennemi le plus proche et gère sa propre durée de vie.
* **obstacle.js**: Classe simple pour stocker la position, le rayon et la couleur des obstacles.
