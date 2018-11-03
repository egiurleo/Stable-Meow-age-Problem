var cats = [];
var catIdx = 0;
var humans = []
var humanIdx = 0;
let day;
let unpairedHumans = [];

$(document).ready(() => {
  setUpFirstday();
});

function setUpDay() {
  incrementDay();
  clearActive();
  setupBlurbDay(`Day ${day}`);

  unpairedHumans = unpaired(humans);

  if(!unpairedHumans.length) {
    setupBlurbText('All cats have been adopted!');
    finish();
  } else {
    setupBlurbText(`It's day ${day} and all humans without cats are going to the animal shelter!`);
    setupNextButton(setUpAdoption, 'Next');
  }
}

function setUpAdoption() {
  if(humanIdx === unpairedHumans.length) {
    setUpDay();
    return;
  }
  
  clearActive();

  const human = unpairedHumans[humanIdx];
  makeActive(human.name);

  for(var idx=0; idx<Object.keys(human.preferences).length; idx++) {
    catIdx = idx;
    const cat = human.preferences[catIdx];

    if(!cat.tried) {
      setupBlurbText(`${human.name} goes to the shelter and tries to adopt ${cat.obj.name}.`);
      makeActive(cat.obj.name);

      setupNextButton(attemptAdoption, 'Next');
      break;
    }
  }
}

function attemptAdoption() {
  const human = unpairedHumans[humanIdx];
  const cat = human.preferences[catIdx].obj;

  tryCat(human, catIdx);

  if(!cat.paired()) {
    setupBlurbText(`${cat.name} does not currently have a human, so they're happy to be adopted by ${human.name}.`);
    pair(human, cat);
  } else {
    if (cat.prefersToCurrentPartner(human)) {
      setupBlurbText(`${cat.name} was already adopted by ${cat.partner.name}, but they liked ${human.name} better, so they decide to run away!`);
      cat.unpair();
      pair(human, cat);
    } else {
      setupBlurbText(`${cat.name} was already adopted by ${cat.partner.name}. They're happy together!`);
    }
  }

  humanIdx++;

  setupNextButton(setUpAdoption, 'Next');
}

function finish() {
  clearActive()
  setupNextButton(initialSetup, 'Reset');
}


