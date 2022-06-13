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
  vampireWithName(name) {
    let vamp = null; // 1
    if (this.name === name) {
      vamp = this;
    } 
    for (const child of this.offspring) {
      vamp =  vamp || child.vampireWithName(name);
    }
    return vamp;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;
    for (let i = 0; i < this.offspring.length; i++) {
      const thisOffspring = this.offspring[i];
      total += thisOffspring.totalDescendents + 1;
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vamp = []; 
    if (this.yearConverted > 1980) {
      vamp.push(this);
    }
    for (const child of this.offspring) {
      let off = child.allMillennialVampires;
      vamp = vamp.concat(off);
    }
    return vamp;
  }
}

module.exports = Vampire;
