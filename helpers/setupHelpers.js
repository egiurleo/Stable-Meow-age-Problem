function setUpFirstday() {
  generateParticipants();
  setUpDom(cats, humans);
  initialSetup();
}

function generateParticipants() {
  var garfield = new Cat('Garfield');
  var sylvester = new Cat('Sylvester');

  var jon = new Human('Jon');
  var granny = new Human('Granny');

  garfield.setPreferences([jon, granny]);
  sylvester.setPreferences([jon, granny]);
  jon.setPreferences([sylvester, garfield]);
  granny.setPreferences([sylvester, garfield]);

  cats = [garfield, sylvester];
  humans = [jon, granny];
}

function initialSetup() {
  resetTried();
  unpairAll();

  day = -1;

  setupBlurbDay('');
  setupBlurbText('Click to start!');
  setupNextButton(setUpDay, 'Start');
}

function setUpDom(cats, humans) {
  cats.forEach(cat => {
    var catDiv = setUpDiv(cat, CAT);
    $(`.${CAT_CONTAINER}`).append(catDiv);
  });

  humans.forEach(human => {
    var humanDiv = setUpDiv(human, HUMAN);
    $(`.${HUMAN_CONTAINER}`).append(humanDiv);
  })
}

function setUpDiv(participant, className) {
  var preferenceList = '';

  Object.keys(participant.preferences).forEach(index => {
    preferenceList += `
      <li>
        <div class='${PREFERENCE}'>
          ${participant.preferences[index].obj.name}
        </div>
      </li>
    `;
  });

  return `
    <div class='${PARTICIPANT_CONTAINER} ${className} ${participant.name}'>
      <div class='${className} ${PARTICIPANT} ${participant.name}'>
        <div class='body'>
          <div class='info'>
            <div class='name'>${participant.name}</div>
            <div class='image'>
              <img src='images/${participant.name}.png' width=200/> 
            </div>
          </div>
          <div class='${PREFERENCES}'>
            <ol>
              ${preferenceList}
            </ol>
          </div>
        </div>
      </div>
    </div>
  `;
}
