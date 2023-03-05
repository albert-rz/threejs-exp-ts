import { Group } from 'three';

interface CarMovement {
  delta?: number;
  theta?: number;
}

export class Car {
  private _model: Group;
  private _speed: number;
  private _acceleration: number;
  private _turn: number;
  private _maxSpeed: number;
  private _maxAcceleration: number;
  private _maxTurn: number;

  constructor(model: Group) {
    this._model = model;
    this._speed = 0.0;
    this._acceleration = 0.0;
    this._turn = 0.0;

    this._maxSpeed = 10;
    this._maxAcceleration = 3;
    this._maxTurn = Math.PI / 4;
  }

  get model() {
    return this._model;
  }

  move({ delta = 0, theta = 0 }: CarMovement) {
    if (delta > 0) {
      this._acceleration = Math.min(this._acceleration + delta, this._maxAcceleration);
    } else if (delta < 0) {
      this._acceleration = Math.max(this._acceleration + delta, 0);
    }

    if (theta > 0) {
      this._turn = Math.min(this._turn + theta, this._maxTurn);
    } else if (theta < 0) {
      this._turn = Math.max(this._turn + theta, -this._maxTurn);
    }

    console.log(`acceleration: ${this._acceleration} turn: ${this._turn}`);
  }
}

// class KeyboardInput {
//   constructor
// }
