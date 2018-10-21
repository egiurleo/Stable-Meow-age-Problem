class Participant {
  constructor(name) {
    this.name = name;
    this.preferences = [];
    this.partner = null;
  }

  setPreferences(preferences) {
    preferences.forEach((preference, index) => {
      this.preferences.push({ obj: preference, tried: false });
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
    const thisPartnerIdx = Object.keys(this.preferences).filter(idx => this.preferences[idx].obj === this.partner)[0];
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
  var garfield = new Cat('Garfield');
  var sylvester = new Cat('Sylvester');

  var jon = new Human('Jon');
  var granny = new Human('Granny');

  garfield.setPreferences([jon, granny]);
  sylvester.setPreferences([jon, granny]);
  jon.setPreferences([sylvester, garfield]);
  granny.setPreferences([sylvester, garfield]);

  return { cats: [garfield, sylvester], humans: [granny, jon] };
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
