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
  debugger;
  $(`.${NEXT}`).html(text);
  $(`.${NEXT}`).off('click');
  $(`.${NEXT}`).click(e => func());
}