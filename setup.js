class Participant {
  constructor(name) {
    this.name = name;
    this.preferences = {};
    this.partner = null;
  }

  setPreferences(preferences) {
    preferences.forEach((preference, index) => {
      this.preferences[index] = { obj: preference, tried: false };
    });
  }

  tryPreference(index) {
    this.preferences[index].tried = true;
  }

  paired() {
    return this.partner != null;
  }

  pair(partner) {
    this.partner = partner;
    partner.partner = this;
    return true;
  }

  unpair() {
    if(this.paired()) {
      this.partner.partner = null;
      this.partner = null;
    }

    return true;
  }

  prefersToCurrentPartner(newPartner) {
    if(!this.paired()) { return true; }
    const newPartnerIdx = Object.keys(this.preferences).filter(idx => this.preferences[idx].obj === newPartner)[0];
    const thisPartnerIdx = Object.keys(this.preferences).filter(idx => this.preferences[idx].obj === this.Partner)[0];
    return newPartnerIdx < thisPartnerIdx;
  }
}

class Cat extends Participant {
  constructor(name) {
    super(name);
  }
}

class Human extends Participant {
  constructor(name) {
    super(name);
  }
}

function setUp() {
  var poly = new Cat('Poly');
  var sawyer = new Cat('Sawyer');

  var emily = new Human('Emily');
  var andrew = new Human('Andrew');

  poly.setPreferences([emily, andrew]);
  sawyer.setPreferences([andrew, emily]);
  emily.setPreferences([sawyer, poly]);
  andrew.setPreferences([sawyer, poly]);

  return { cats: [poly, sawyer], humans: [andrew, emily] };
}

const unpaired = function(participants) {
  return participants.filter(participant => {
    return !participant.paired();
  });
}

const printPairs = function(participants) {
  participants.forEach(participant => {
    if(participant.partner) {
      console.log(`${participant.name} + ${participant.partner.name}`);
    } else {
      console.log(`${participant.name} is alone :(`);
    }
  });
}
