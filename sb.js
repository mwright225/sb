function nInc(dir='up') {
  if (dir === 'up') {
    if (Object.keys(playoff).length + 1 == currNum) { return; }
    currNum++;
  } else {
    if (1 == currNum) { return; }
    currNum--;
  }
  let div = document.getElementById('ttl');
  div.innerHTML = `SB ${currNum} <small>(${currNum + 1965}-${currNum + 1966})</small>`;
  console.log(currNum)
  test(currNum)
}
function test(yr) {  
  let yrData = playoff[yr];
  if (!yrData) { return; }
  
  let h = '<div class="poWrap">';
  Object.keys(yrData).map(conf => {
    if (!yrData?.[conf]) { return; }
    h += `<div class="confWrap ${conf}">`;
    Object.keys(yrData[conf]).map(poRound => {
      if (!yrData?.[conf]?.[poRound]?.map) { return; }
      h += `
      <div class="roundContainer ${poRound}">
        <div class="roundTitle">${poRound}</div>
        <div class="roundWrap">`;
      yrData[conf][poRound].map(game => {
        h += makeGame(game);
      })
      h += `
        </div>
      </div>`;
    })
    h += '</div>';
  })
  h += '</div>';
  
  let div = document.getElementById('mainDiv');
  div.innerHTML = h;
  
  
}

function makeGame(game) {
  console.log(game)
  let h = `
  <div class="gameWrap">
  
    <div class="teamContainer">
    
      <div class="teamWrap">     
        <div class="teamSeed">${game.wSeed}</div>
        <div class="teamIcon"><image class='poImg' src='img/${game.wID}.png' /></div>
        <div class="teamRecord">${game.wRecord}</div>
      </div>
         
      <div class="scoreWrap">  
        ${game.wScore}   
      </div>
    
    </div>
    
    <div class="teamContainer">
    
      <div class="teamWrap">     
        <div class="teamSeed">${game.lSeed}</div>
        <div class="teamIcon"><image class='poImg' src='img/${game.lID}.png' /></div>
        <div class="teamRecord">${game.lRecord}</div>
      </div>
         
      <div class="scoreWrap">  
        ${game.lScore}   
      </div>
    
    </div>
    
  </div>`;
  
 return h;
  
}
function editJson() {
}

