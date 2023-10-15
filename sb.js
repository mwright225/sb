function nInc(dir='up') {
  if (dir === 'up') {
    if (Object.keys(playoff).length + 1 == currNum) { currNum = 1; }
    else { currNum++; }
  } else {
    if (1 == currNum) { currNum = Object.keys(playoff).length + 1; }
    else { currNum--; }
  }
  makeMainDiv();  
  //makePlayoffs(currNum)
}
function sbDrilldown(n) {
  mode = 'po';
  currNum = n;
  makeMainDiv()
}
function backBtn() {
  mode = 'sb';
  makeMainDiv()
}
function makeMainDiv() {
  if (mode === 'sb') {
    makeSuperBowls();
    document.getElementById('poTitle').style.display = 'none';
    document.getElementById('sbTitle').style.display = 'flex';
    
  } else {
    makePlayoffs(currNum);
    document.getElementById('poTitle').style.display = 'flex';
    document.getElementById('sbTitle').style.display = 'none';
    
    document.getElementById('ttl') .innerHTML = `SB ${numToRoman(currNum)}`;
    
  }
}
function makeSuperBowls() {
  let h = '<div class="sbWrap">';
  Object.keys(playoff).map(yr => {
    h += `
    <div onclick="sbDrilldown(${yr})" class="sbGameWrap">
      <div>${numToRoman(yr)}</div>
      <div class="sbSubTtl">${yr} (${+yr + 1965}-${+yr + 1966})</div>`;
      
    
    h += makeGame(playoff[yr].SB);
    h += '</div>';
  })
  h += '</div>';
  let div = document.getElementById('mainDiv');
  div.innerHTML = h;
  
}
function makePlayoffs(yr) {  

  let yrData = JSON.parse(JSON.stringify(playoff[yr]));
  if (!yrData) { return; }
  
  //ttldiv.innerHTML = `SB ${yr} <small>(${yr + 1965}-${yr + 1966})</small>`;
     
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
function numToRoman(yr) {
  yr = yr+'';
  let n1 = ['','I','II','III','IV','V','VI','VII','VIII','IX','X'];
  let n2 = ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'];
  if (yr.length == 1) {
    return n1[yr];
  } else {
    return n2[yr.substr(0,1)] + n1[yr.substr(1,1)];
  }
 
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

