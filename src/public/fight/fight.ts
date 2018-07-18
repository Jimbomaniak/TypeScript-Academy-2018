import Fighter, { IFighter } from './fighter';
import ImprovedFighter, { IImproved } from './improved-fighter'

export interface IFight {
  fighter: IFighter;
  improvedFighter: IImproved;
}

export default class Fight implements IFight {
  fighter: IFighter;
  improvedFighter: IImproved;

  constructor() {
    this.fighter = new Fighter();
    this.improvedFighter = new ImprovedFighter();
    this.initializeFight();
  }

  async fight(fighter: Fighter, improvedFighter: ImprovedFighter, ...points: number[]) {
    let log: HTMLElement = (document.querySelector('.log') as HTMLBodyElement);

    this._log(`Fight! ${fighter.name}(health:${fighter.health}) vs
     ${improvedFighter.name}(health:${improvedFighter.health})`, log);
    while (fighter.health > 0 && improvedFighter.health > 0) {
      this._log(fighter.hit(improvedFighter, this._getRandomPoint(points)), log);
      if (improvedFighter.health <= 0) {
        break
      }
      this._log(improvedFighter.doubleHit(fighter, this._getRandomPoint(points)), log);
    }
    let knockoutedFighter = fighter.health <= 0 ? fighter : improvedFighter;
    this._log(`${knockoutedFighter.name} is in a knockout`, log)
    let result = await knockoutedFighter.knockout()
    this._log(result, log);
  }

  initializeFight(): void {
    const fightButton = document.querySelector('.fight') as HTMLButtonElement;
    const pointsInput = document.getElementById('points') as HTMLInputElement;
    const cleanButton = document.querySelector('.clean') as HTMLButtonElement;
    const saveButton = document.querySelector('.save') as HTMLButtonElement;
    const points = pointsInput.value.split(' ').map(point => Number(point));

    fightButton.addEventListener('click', () => {
      this.fight(this.fighter, this.improvedFighter, ...points)
    })

    saveButton.addEventListener('click', () => {
      this.fighter.setInfo();
      this.improvedFighter.setInfo();
    })

    cleanButton.addEventListener('click', () => {
      this._cleanLog();
    })
  }


  private _log(text: any, el: HTMLElement): void {
    let message = document.createElement('h3');
    message.className = 'fighters';
    message.innerHTML = text;
    el.appendChild(message);
  }

  private _cleanLog(): void {
    let log: HTMLElement = (document.querySelector('.log') as HTMLBodyElement);
    while (log.firstChild) {
      log.removeChild(log.firstChild);
    }
  }

  private _getRandomPoint(points: number[]): number {
    return points[Math.floor(Math.random() * points.length)]
  }
}

