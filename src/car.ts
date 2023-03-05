import { Group } from 'three';

export class Car {
  private _model: Group;
  private _speed: number;
  private _acceleration: number;
  private _maxSpeed: number
  private _maxAcceleration: number

  constructor(model: Group) {
    this._model = model;
    this._speed = 0.0;
    this._acceleration = 0.0;

    this._maxSpeed = 10;
    this._maxAcceleration = 3;
  }

  get model() {
    return this._model;
  }

  update(keyCode: string = '') {
    switch (keyCode) {
      case 'ArrowUp':
        this.accelerate()
        break;
      case 'ArrowDown':
        this.accelerate(-0.5)
        break;
      case 'ArrowRight':
        console.log('Turn right')
        break
      default:
        this.accelerate(-0.01)
        break;
    }
  }

  accelerate(delta: number = 0.1) {
    console.log(`accelerate by ${delta}`);
    if (delta > 0) {
      this._acceleration = Math.min(this._acceleration + delta, this._maxAcceleration)
    }

    if (delta < 0) {
      this._acceleration = Math.max(this._acceleration + delta, 0)
    }
    console.log(`acceleration is ${this._acceleration}`)
  }
}

// class KeyboardInput {
//   constructor
// }
