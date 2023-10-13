function nInc(dir='up') {
  if (dir === 'up') {
    if (Object.keys(playoff).length + 1 == currNum) { return; }
    currNum++;
  } else {
    if (1 == currNum) { return; }
    currNum--;
  }
    
  makePlayoffs(currNum)
}
function makePlayoffs(yr) {  

  let yrData = JSON.parse(JSON.stringify(playoff[yr]));
  if (!yrData) { return; }
  
  let ttldiv = document.getElementById('ttl');
  ttldiv.innerHTML = `SB ${yr} <small>(${yr + 1965}-${yr + 1966})</small>`;

    
  yrData.SB = {
    SB: [yrData.SB]
  }
  
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
      
  //editJson(currNum)
}

function makeGame(game) {
  
  let h = `
  <div class="gameWrap">
  
    <div class="teamContainer">
    
      <div class="teamWrap">     
        <div class="teamSeed">${game?.wSeed}</div>
        <div class="teamIcon"><image alt='?' class='poImg' src='img/${game?.wID}.png' /></div>
        <div class="teamRecord">${game?.wRecord}</div>
      </div>
         
      <div class="scoreWrap">  
        ${game?.wScore}   
      </div>
    
    </div>
    
    <div class="teamContainer">
    
      <div class="teamWrap">     
        <div class="teamSeed">${game?.lSeed}</div>
        <div class="teamIcon"><image class='poImg' src='img/${game?.lID}.png' /></div>
        <div class="teamRecord">${game?.lRecord}</div>
      </div>
         
      <div class="scoreWrap">  
        ${game?.lScore}   
      </div>
    
    </div>
    
  </div>`;
  
 return h;
  
}
function editJson(yr) {
  let yrData = JSON.parse(JSON.stringify(playoff[yr]));
  if (!yrData) { return; }
    
  yrData.SB = {
    SB: [yrData.SB]
  }
  
  let seeding = {
    AFC: {},
    NFC: {}
  }
  let rounds = {}
               
  Object.keys(yrData).map(conf => {
    if (!yrData?.[conf]) { return; }    
    if (!rounds[conf]) { rounds[conf] = {}; }    
    
    Object.keys(yrData[conf]).map(poRound => {
      if (!yrData?.[conf]?.[poRound]?.map) { return; }
      
      if (!rounds[conf][poRound]) { rounds[conf][poRound] = []; }
      
      yrData[conf][poRound].map(game => {
      
        rounds[conf][poRound].push({
          wID: game?.wID,
          wScore: game?.wScore,
          lID: game?.lID,
          lScore: game?.lScore,
        })
        
        if (['AFC','NFC'].includes(conf)) {        
          ['w','l'].map(t => {
            if (!game[`${t}Seed`]) { return; }
            let thisSeed = game[`${t}Seed`];
            if (!seeding[conf][thisSeed]) {
              seeding[conf][thisSeed] = {
                Team: game[`${t}Team`],
                ID: game[`${t}ID`],
                Record: game[`${t}Record`]
              }
            }
          })
        }
        
      })
     
    })        
   
  })
  
  //console.log(seeding)
  //console.log(rounds)
  playoff2[yr+''] = {
    seeding: seeding,
    rounds: rounds
  }
 
}

