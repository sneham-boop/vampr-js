class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let jumps = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      jumps += 1;
      currentVamp = currentVamp.creator;
    }
    return jumps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    );
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (vampire.creator === null || this.creator === null) return this;
    if (vampire.name === this.name) return this;
    if (this.creator.name === vampire.name) return vampire;
    if (vampire.creator.name === this.name) return this;

    let moreSeniorVampire = this;
    if (vampire.isMoreSeniorThan(this)) {
      moreSeniorVampire = vampire;
      vampire = this;
    }

    while (vampire.creator) {
      if (vampire.creator != moreSeniorVampire.creator)
        vampire = vampire.creator;
      else return vampire.creator;
    }
    return vampire;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(n) {
    let vamp = {};
    console.log(this.name, n);
    if(this.name === n) return this; // root edge case
    if(this.offspring.length === 0) return this; // recursion base case

    for (let i=0; i<=this.offspring.length; i++) {
      vamp = this.offspring[i];
      if (vamp.name !== n) vamp.vampireWithName(n);
      else if (vamp.name === n) return vamp;
    }
    // return vamp;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0; 
    for (let i=0; i<this.offspring.length; i++) {
      const thisOffspring = this.offspring[i];
      total += thisOffspring.totalDescendents+1; 
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {}
}

let rootVampire = new Vampire("root");

let offspring1 = new Vampire("a");
let offspring2 = new Vampire("b");
let offspring3 = new Vampire("c");
let offspring4 = new Vampire("d");
let offspring5 = new Vampire("e");
let offspring6 = new Vampire("f");
let offspring7 = new Vampire("g");
let offspring8 = new Vampire("h");
rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

// console.log(rootVampire.vampireWithName("root"));

module.exports = Vampire;
