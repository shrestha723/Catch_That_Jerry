  const traps = document.querySelectorAll('.trap');
  const scoreBoard = document.querySelector('.score');
  const jerrys = document.querySelectorAll('.jerry');
  let lastTrap;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomTrap(traps) {
    const idx = Math.floor(Math.random() * traps.length);
    const trap = traps[idx];
    if (trap === lastTrap) {
      return randomTrap(traps);
    }
    lastTrap = trap;
    return trap;
  }

  function peep() {
    const time = randomTime(200, 1000);
    const trap = randomTrap(traps);
    trap.classList.add('up');
    setTimeout(() => {
      trap.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

  function whack(e) {
    if(!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

  jerrys.forEach(jerry => jerry.addEventListener('click', whack));