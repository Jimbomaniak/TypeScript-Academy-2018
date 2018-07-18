export interface IFighter {
  readonly name: string;
  health: number;
  power: number;
  setDamage: (damage: number) => string;
  hit: (enemy: Fighter, point: number) => string;
  knockout: () => Promise<{}>;
  setInfo: () => void;
}

export default class Fighter implements IFighter {
  name: string;
  health: number;
  power: number;

  constructor() {
    this.setInfo()

  }

  setInfo(): void {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const healthInput = document.getElementById('health') as HTMLInputElement;
    const powerInput = document.getElementById('power') as HTMLInputElement;

    this.name = nameInput.value;
    this.health = Number(healthInput.value);
    this.power = Number(powerInput.value);
    console.log(this.health, this.name)
  }

  setDamage(damage: number): string {
    this.health -= damage;
    return `health of ${this.name} after hit ${this.health}`;
  }

  hit(enemy: Fighter, point: number): string {
    let damage = point * this.power;
    return enemy.setDamage(damage);
  }

  knockout(): Promise<{}> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Time is over <br> ${this.name} loose this fight. RIP`)
      }, 500);
    });
  }
}