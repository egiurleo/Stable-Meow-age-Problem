function clearActive() {
  $(`.${PARTICIPANT}`).each((_, participant) => {
    participant = $(participant);
    participant.removeClass(ACTIVE);
  });
}

function incrementDay() {
  day++;
  humanIdx = 0;
  catIdx = 0;
}

function resetTried() {
  $(`.${PREFERENCE}`).removeClass(TRIED);

  [humans, cats].forEach(group => {
    group.forEach(participant => {
      participant.preferences.forEach(preference => {
        preference.tried = false;
      })
    })
  })
}

function unpairAll() {
  cats.forEach(cat => unpair(cat));
}

function unpair(cat) {
  cat.unpair();
  moveAnimate(`.${PARTICIPANT}.${cat.name}`, `.${PARTICIPANT_CONTAINER}.${cat.name}`);
}

const unpaired = function(participants) {
  return participants.filter(participant => {
    return !participant.paired();
  });
}

function setupBlurbDay(text) {
  $(`.${DAY}`).html(text);
}

function setupBlurbText(text) {
  $(`.${TEXT}`).html(text);
}

function setupNextButton(func, text) {
  $(`.${NEXT}`).html(text);
  $(`.${NEXT}`).off('click');
  $(`.${NEXT}`).click(e => func());
}

function pair(human, cat) {
  human.pair(cat);
  moveAnimate(`.${PARTICIPANT}.${cat.name}`, `.${PARTICIPANT_CONTAINER}.${human.name}`);
}

function makeActive(name) {
  $(`.${PARTICIPANT}.${name}`).addClass(ACTIVE);
}

function tryCat(human, catIdx) {
  human.tryPreference(catIdx);
  $($(`.${PARTICIPANT}.${human.name}`).find(`.${PREFERENCE}`)[catIdx]).addClass(TRIED);
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