import Fighter, { IFighter } from './fighter';

export interface IImproved extends IFighter {
  doubleHit: (enemy: Fighter, point: number) => string;
}


class ImprovedFighter extends Fighter implements IImproved {
  setInfo(): void {
    const nameInput = document.getElementById('name2') as HTMLInputElement;
    const healthInput = document.getElementById('health2') as HTMLInputElement;
    const powerInput = document.getElementById('power2') as HTMLInputElement;

    this.name = nameInput.value;
    this.health = Number(healthInput.value);
    this.power = Number(powerInput.value);
    console.log(this.health, this.name)
  }
  doubleHit(enemy: Fighter, point: number): string {
    return super.hit(enemy, point * 2);
  }
}

export default ImprovedFighter;