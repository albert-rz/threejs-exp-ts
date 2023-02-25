import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type LoadedModelRecord = {
  url: string;
  model?: Group;
};

export class LoadedModelRegister {
  private records: { [key: string]: LoadedModelRecord };
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

    this.records[key] = { url: url };
  }

  loaded(key: string, model: Group) {
    if (!this.isLoading(key)) {
      throw 'loading method must be called first';
    }

    this.records[key]['model'] = model;
  }

  getModel(key: string) {
    if (this.has(key) && this.isLoaded(key)) {
      return this.records[key].model;
    }

    throw `${key} is unknown`;
  }

  getUrl(key: string) {
    if (this.has(key)) {
      return this.records[key].url;
    }

    throw `${key} is unknown`;
  }

  isEmpty() {
    return this.keys.length == 0;
  }

  isLoading(key: string) {
    // if (!this.has(key)) {
    //   return false;
    // }

    // return this.records[key].model == undefined;
    return false;
  }

  isLoaded(key: string) {
    if (!this.has(key)) {
      return false;
    }

    return this.records[key].model != undefined;
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

export class ModelLoader {
  private register: LoadedModelRegister;
  constructor() {
    this.register = new LoadedModelRegister();
  }

  load(key: string, url: string) {
    if (this.register.has(key)) {
      console.log(`Model ${key} already exists`);
      return;
    }

    this.register.loading(key, url);

    const loader = new GLTFLoader();
    loader.load(
      url,
      // called when loaded
      (gltf) => {
        this.register.loaded(key, gltf.scene);
      },
      // called while loading is progressing
      function (xhr) {
        console.log(`${key} is ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      // called when loading has errors
      function (error) {
        console.error(`An error happened: ${error}`);
      }
    );
  }

  get keys() {
    return this.register.keys;
  }

  getModel(key: string) {
    return this.register.getModel(key);
  }

  getUrl(key: string) {
    return this.register.getUrl(key);
  }

  allLoaded() {
    return this.register.allLoaded();
  }

  // async waitFor(key: string, delay: number = 100) {

  //   for (let i = 0 ; i < 100 ; i++ ){
  //     if (this.register.isLoaded(key)) {
  //       return;
  //     }

  //     console.log(`Waiting for ${key}`);
  //     await this.sleep(delay);  
  //   }
    
  //   throw 'foo'
  // }

  // private sleep(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  waitFor(key: string, delay: number = 100) {
    if (!this.register.isLoaded(key)) {
      setTimeout((x) => {this.waitFor(x)}, delay, key)
    }
  }


  speak() {
    this.register.speak();
  }
}
