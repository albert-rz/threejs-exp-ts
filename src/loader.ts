import { Group } from 'three';

type LoadedModelRecord = {
  url: string;
  model: Group;
};

export class LoadedModelRegister {
  records: { [key: string]: LoadedModelRecord };
  constructor() {
    this.records = {};
  }

  get keys() {
    return Object.keys(this.records);
  }

  has(key: string) {
    return this.keys.includes(key);
  }

  loading(key: string, url: string) {
    if (this.isLoading(key)) {
      throw `${key} is already loading`;
    }

    this.records[key] = {
      url: url,
      model: null,
    };
  }

  loaded(key: string, model: Group) {
    if (!this.isLoading(key)) {
      throw 'loading method must be called first';
    }

    this.records[key]['model'] = model;
  }

  getModel(key: string) {
    if (this.has(key) && this.isLoaded(key)) {
      return this.records[key]['model'];
    }

    throw `${key} is not loaded`;
  }

  getUrl(key: string) {
    if (this.has(key)) {
      return this.records[key]['url'];
    }

    throw `${key} is not loaded`;
  }

  isEmpty() {
    return this.keys.length == 0;
  }

  isLoading(key: string) {
    if (!this.has(key)) {
      return false;
    }

    return this.records[key]['model'] == null;
  }

  isLoaded(key: string) {
    if (!this.has(key)) {
      return false;
    }

    return this.records[key]['model'] != null;
  }

  allLoaded() {
    for (const key of this.keys) {
      if (!this.isLoaded(key)) {
        return false;
      }
    }

    return true;
  }

  speak() {
    console.table(this.records);
  }
}
