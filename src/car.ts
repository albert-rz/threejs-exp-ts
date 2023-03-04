import { Group } from 'three';

export class Car {
  model?: Group;

  constructor() {}

  addModel(model: Group) {
    this.model = model;
  }
}
