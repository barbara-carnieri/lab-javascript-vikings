// Soldier

function Soldier(healthArg, strengthArg) {
  this.health = healthArg;
  this.strength = strengthArg;
}

Soldier.prototype.attack = function () {
  return this.strength;
}

Soldier.prototype.receiveDamage = function (damage) {
  this.health = this.health - damage;
}



// Viking

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

function Viking(nameArg, healthArg, strengthArg) {
  this.name = nameArg;
  this.health = healthArg;
  this.strength = strengthArg;
}

Viking.prototype.receiveDamage = function (damage) {
  Soldier.prototype.receiveDamage.call(this, damage);
  if (this.health > 0) {
    return `${this.name} has received ${damage} points of damage`
  } else {
    return `${this.name} has died in act of combat`
  }
}

Viking.prototype.battleCry = function () {
  return `Odin Owns You All!`;
}



// Saxon

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

function Saxon(healthArg, strengthArg) {
  this.health = healthArg;
  this.strength = strengthArg;
}

Saxon.prototype.receiveDamage = function (damage) {
  Soldier.prototype.receiveDamage.call(this, damage);
  if (this.health > 0) {
    return `A Saxon has received ${damage} points of damage`
  } else {
    return `A Saxon has died in combat`
  }
}


// War

function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
}

War.prototype.addViking = function (viking) {
  this.vikingArmy.push(viking);
}

War.prototype.addSaxon = function (saxon) {
  this.saxonArmy.push(saxon);
}

War.prototype.vikingAttack = function () {
  var randomSaxon = Math.floor(Math.random() * this.saxonArmy.length);
  var saxonSoldier = this.saxonArmy[randomSaxon];
  var randomViking = Math.floor(Math.random() * this.vikingArmy.length);
  var vikingSoldier = this.vikingArmy[randomViking];
  var result = saxonSoldier.receiveDamage(vikingSoldier.attack());
  if (saxonSoldier.health <= 0) {
    this.saxonArmy.pop();
  }
  return result;
}


War.prototype.saxonAttack = function () {
  var randomSaxon = Math.floor(Math.random() * this.saxonArmy.length);
  var saxonSoldier = this.saxonArmy[randomSaxon];
  var randomViking = Math.floor(Math.random() * this.vikingArmy.length);
  var vikingSoldier = this.vikingArmy[randomViking];
  var result = vikingSoldier.receiveDamage(saxonSoldier.attack());
  if (vikingSoldier.health <= 0) {
    this.vikingArmy.pop();
  }
  return result;
}

War.prototype.showStatus = function () {
  if (this.saxonArmy.length === 0) {
    return `Vikings have won the war of the century!`
  } else if (this.vikingArmy.length === 0) {
    return `Saxons have fought for their lives and survive another day...`
  } else {
    return `Vikings and Saxons are still in the thick of battle.`
  }
}