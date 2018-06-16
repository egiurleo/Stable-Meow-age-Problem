$(document).ready(() => {
  const { cats, humans } = setUp();
  let day = 0;

  setUpDom(cats, humans, day);

  $('.next').click(e => {
    setUpDay(humans, day + 1);
  });
});

function setUpDay(humans, day) {
  $('.blurb .day').html(`Day ${day}`);
  $('.blurb .text').html(`It's day ${day} and all humans without cats are going to the animal shelter!`);

  var unpairedHumans = unpaired(humans);

  $('.next').click(e => {
    setUpAdoption(unpairedHumans, 0, 0);
  });
}

function setUpAdoption(unpairedHumans, humanIdx, catIdx) {
  const human = unpairedHumans[humanIdx];
  const cat = human.preferences[catIdx];

  if(cat.tried) {

  } else {
    $('.blurb .text').html(`${human.name} goes to the shelter and tries to adopt ${cat.obj.name}.`);
    $(`.participant.${human.name}, .participant.${cat.obj.name}`).addClass('active');

    $('.next').click(e => {
      attemptAdoption(human, cat.obj, catIdx);
    });
  }
}

function attemptAdoption(human, cat, catIdx) {
  human.tryPreference(catIdx);

  if(!cat.paired()) {
    $('.blurb .text').html(`${cat.name} does not currently have a human, so they're happy to be adopted by ${human.name}.`);
    pair(human, cat);
  } else {
    if (cat.prefersToCurrentPartner(human)) {

    } else {

    }
  }
}

function pair(human, cat) {
  human.pair(cat);
  moveAnimate(`.participant.${cat.name}`, `.participantContainer.${human.name}`);
}

function moveAnimate(element, newParent){
  // method found here: https://stackoverflow.com/questions/907279/jquery-animate-moving-dom-element-to-new-parent
  //Allow passing in either a jQuery object or selector
  element = $(element);
  newParent= $(newParent);

  var oldOffset = element.offset();
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

function setUpDom(cats, humans, day) {
  cats.forEach(cat => {
    var catDiv = setUpDiv(cat, 'cat');
    $('.catContainer').append(catDiv);
  });

  humans.forEach(human => {
    var humanDiv = setUpDiv(human, 'human');
    $('.humanContainer').append(humanDiv);
  })

  $('.day').html(`Day ${day}`);
  $('.blurb .text').html('Press next to start the demo!');
}

function setUpDiv(participant, className) {
  var preferenceList = '';

  Object.keys(participant.preferences).forEach(index => {
    preferenceList += `
      <li>
        <div class='preference'>
          ${participant.preferences[index].obj.name}
        </div>
      </li>
    `;
  });

  return `
    <div class='participantContainer ${className} ${participant.name}'>
      <div class='${className} participant ${participant.name}'>
        <div class='body'>
          <div class='info'>
            <div class='name'>${participant.name}</div>
            <div class='image'></div>
          </div>
          <div class='preferences'>
            <ol>
              ${preferenceList}
            </ol>
          </div>
        </div>
      </div>
    </div>
  `;
}
