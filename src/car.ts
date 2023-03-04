import { Group } from 'three';

export class Car {
  private _model: Group;
  private _speed: number;
  private _acceleration: number;

  constructor(model: Group) {
    this._model = model;
    this._speed = 0.0;
    this._acceleration = 0.0;
  }

  get model() {
    return this._model;
  }

  update(up: boolean, down: boolean, right: boolean, left: boolean) {
    if (up && !down) {
      console.log('accelerate');
    } else if (down && !up) {
      console.log('break`');
    } else if (up && down) {
      console.log('no effect accelerate/break');
    }

    if (right && !left) {
      console.log('turn right');
    } else if (left && !right) {
      console.log('turn left');
    } else if (right && left) {
      console.log('no effect right/left');
    }
  }
}
