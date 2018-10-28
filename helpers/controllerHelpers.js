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