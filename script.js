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

  for(var idx=0; idx<Object.keys(human.preferences).length; idx++) {
    catIdx = idx;
    const cat = human.preferences[catIdx];

    if(!cat.tried) {
      $('.blurb .text').html(`${human.name} goes to the shelter and tries to adopt ${cat.obj.name}.`);
      $(`.participant.${human.name}, .participant.${cat.obj.name}`).addClass('active');

      $('.next').off('click');
      $('.next').click(e => {
        attemptAdoption();
      });
      break;
    }
  }
}

function attemptAdoption() {
  const human = unpairedHumans[humanIdx];
  const cat = human.preferences[catIdx].obj;
  human.tryPreference(catIdx);
  
  $($(`.participant.${human.name}`).find('.preference')[catIdx]).addClass('tried');

  if(!cat.paired()) {
    $('.blurb .text').html(`${cat.name} does not currently have a human, so they're happy to be adopted by ${human.name}.`);
    pair(human, cat);
  } else {
    if (cat.prefersToCurrentPartner(human)) {
      $('.blurb .text').html(`${cat.name} was already adopted by ${cat.partner.name}, but they liked ${human.name} better, so they decide to run away!`);
      cat.unpair();
      pair(human, cat);
    } else {
      $('.blurb .text').html(`${cat.name} was already adopted by ${cat.partner.name}. They're happy together!`);
    }
  }

  humanIdx++;

  $('.next').off('click');
  $('.next').click(e => {
    setUpAdoption();
  });
}

function finish() {
  clearActive()

  $('.next').html('Reset');
  $('.next').off('click');
  $('.next').click(e => {
    initialSetup();
  });
}

function moveAnimate(element, newParent){
  // method found here: https://stackoverflow.com/questions/907279/jquery-animate-moving-dom-element-to-new-parent
  //Allow passing in either a jQuery object or selector
  element = $(element);
  newParent= $(newParent);

  var oldOffset = element.offset();

  if(!oldOffset) { return; }

  element.appendTo(newParent);
  var newOffset = element.offset();

  var temp = element.clone().appendTo('body');
  temp.css({
      'position': 'absolute',
      'left': oldOffset.left,
      'top': oldOffset.top,
      'z-index': 1000
  });
  element.hide();
  temp.animate({'top': newOffset.top, 'left': newOffset.left}, 'slow', function(){
     element.show();
     temp.remove();
  });
}

