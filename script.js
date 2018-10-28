var cats = [];
var humans = []
var unpairedHumans = [];
let day;

$(document).ready(() => {
  setUpFirstday();
});

function setUpDay() {
  day++;
  clearActive();

  $('.blurb .day').html(`Day ${day}`);

  unpairedHumans = unpaired(humans);
  if(!unpairedHumans.length) {
    $('.blurb .text').html('All cats have been adopted!');
    finish();
  } else {
    $('.blurb .text').html(`It's day ${day} and all humans without cats are going to the animal shelter!`);
    $('.next').off('click');
    $('.next').click(e => {
      setUpAdoption(unpairedHumans, 0);
    });
  }
}

function setUpAdoption(unpairedHumans, humanIdx) {
  if(humanIdx === unpairedHumans.length) {
    setUpDay();
    return;
  }
  
  clearActive();

  const human = unpairedHumans[humanIdx];

  for(var idx=0; idx<Object.keys(human.preferences).length; idx++) {
    const cat = human.preferences[idx];

    if(!cat.tried) {
      $('.blurb .text').html(`${human.name} goes to the shelter and tries to adopt ${cat.obj.name}.`);
      $(`.participant.${human.name}, .participant.${cat.obj.name}`).addClass('active');

      $('.next').off('click');
      $('.next').click(e => {
        attemptAdoption(unpairedHumans, humanIdx, idx);
      });
      break;
    }
  }
}

function attemptAdoption(unpairedHumans, humanIdx, catIdx) {
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

  $('.next').off('click');
  $('.next').click(e => {
    setUpAdoption(unpairedHumans, humanIdx + 1);
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

function pair(human, cat) {
  human.pair(cat);
  moveAnimate(`.participant.${cat.name}`, `.participantContainer.${human.name}`);
}


function clearActive() {
  $('.participant').each((idx, participant) => {
    participant = $(participant);
    participant.removeClass('active');
  });
}

function moveAnimate(element, newParent){
  debugger;
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

