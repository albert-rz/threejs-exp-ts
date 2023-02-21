import { beforeEach, describe, expect, test, vi } from 'vitest';
import { LoadedModelRegister, ModelLoader } from 'src/loader.ts';

beforeEach(async (context) => {
  //  extend context
  context.register = new LoadedModelRegister();

  // loader that mocks a full load
  context.loader = new ModelLoader();
  vi.spyOn(context.loader, 'load').mockImplementation((key, url) => {
    context.loader.register.loading(key, url);
    context.loader.register.loaded(key, 'model');
  });

  // loader that has not finished loading a model (i.e. loaded method has not been called)
  context.incompleteLoader = new ModelLoader();
  vi.spyOn(context.incompleteLoader, 'load').mockImplementation((key, url) => {
    context.incompleteLoader.register.loading(key, url);
  });
});

describe('LoadedModelRegiter', () => {
  test('keys returns keys in register', ({ register }) => {
    expect(register.keys.length).toEqual(0);

    register.loading('jeep', 'jeep.url');
    expect(JSON.stringify(register.keys) == JSON.stringify(['jeep'])).toBeTruthy();

    register.loading('plane', 'plane.url');
    expect(JSON.stringify(register.keys) == JSON.stringify(['jeep', 'plane'])).toBeTruthy();
  });

  test('has returns false for an unloaded model', ({ register }) => {
    expect(register.isEmpty()).toBeTruthy();
    expect(register.has('foo')).toBeFalsy();
  });

  test('has returns true while loading and loaded, false otherwise', ({ register }) => {
    expect(register.has('jeep')).toBeFalsy();

    register.loading('jeep', 'jeep_multi.glb');
    expect(register.has('jeep')).toBeTruthy();

    register.loaded('jeep', 'fake_object');
    expect(register.has('jeep')).toBeTruthy();
  });

  test('getModel returns a model if loaded, or throws an error otherwise', ({ register }) => {
    expect(() => register.getModel('jeep')).toThrowError('is unknown');

    register.loading('jeep', 'url');
    expect(() => register.getModel('jeep')).toThrowError('is unknown');

    register.loaded('jeep', 'foo');
    expect(register.getModel('jeep')).toEqual('foo');
  });

  test('getUrl returns urls if key exists, or throws an error otherwise', ({ register }) => {
    expect(() => register.getUrl('jeep')).toThrowError('is unknown');

    register.loading('jeep', 'jeep.glb');
    expect(register.getUrl('jeep')).toEqual('jeep.glb');

    register.loaded('jeep', 'jeep.model');
    expect(register.getUrl('jeep')).toEqual('jeep.glb');
  });

  test('loading cnnot be called twice', ({ register }) => {
    register.loading('jeep', 'jeep.glb');
    expect(() => register.loading('jeep', 'jeep.glb')).toThrowError('already loading');
  });

  test('loaded must be called after', ({ register }) => {
    expect(() => register.loaded('jeep', 'jeep.model')).toThrowError('called first');
  });

  test('isEmpty returns true if empty, false otherwise', ({ register }) => {
    expect(register.isEmpty()).toBeTruthy();

    register.loading('jeep', 'jeep_multi.glb');
    register.loaded('jeep', 'foo');
    expect(register.isEmpty()).toBeFalsy();
  });

  test('isLoaded returns false while loading and true when loaded', ({ register }) => {
    expect(register.isLoaded('jeep')).toBeFalsy();

    register.loading('jeep', 'jeep.glb');
    expect(register.isLoaded('jeep')).toBeFalsy();

    register.loaded('jeep', 'fake_object');
    expect(register.isLoaded('jeep')).toBeTruthy();
  });

  test('isLoading returns true while loading and false when loaded', ({ register }) => {
    expect(register.isLoading('jeep')).toBeFalsy();

    register.loading('jeep', 'jeep.glb');
    expect(register.isLoading('jeep')).toBeTruthy();

    register.loaded('jeep', 'fake_object');
    expect(register.isLoading('jeep')).toBeFalsy();
  });

  test('allLoaded returns true if all models loaded and false otherwise', ({ register }) => {
    register.loading('jeep', 'jeel.glb');
    register.loading('plane', 'plane.glb');

    expect(register.allLoaded()).toBeFalsy();

    register.loaded('plane', 'plane.model');
    expect(register.allLoaded()).toBeFalsy();

    register.loaded('jeep', 'jeep.model');
    expect(register.allLoaded()).toBeTruthy();
  });
});

describe('ModelLoader', () => {
  test('mocked load method', ({ loader }) => {
    loader.load('jeep', 'jeep.glb');
    loader.load('plane', 'plange.glb')

    // reload jeep again, nothing should happen
    loader.load('jeep', 'jeep.glb');
    expect(JSON.stringify(loader.keys) == JSON.stringify(['jeep', 'plane'])).toBeTruthy();
  });

  test('getModel returns model if key exists, or throws an error otherwise', ({ loader }) => {
    loader.load('jeep', 'jeep.glb');

    expect(loader.getModel('jeep')).toEqual('model')

    expect(() => loader.getModel('foo')).toThrowError('is unknown');
  });

  test('getModel throws an error if not loaded', ({ incompleteLoader }) => {
    incompleteLoader.load('jeep', 'jeep.glb');

    expect(() => incompleteLoader.getModel('jeep')).toThrowError('is unknown')
  });

  test('getUrl returns url if key exists, or throws an error otherwise', ({ loader }) => {
    loader.load('jeep', 'jeep.glb');

    expect(loader.getUrl('jeep')).toEqual('jeep.glb')

    expect(() => loader.getUrl('foo')).toThrowError('is unknown');
  });

  test('getUrl returns url also when model is being loaded', ({ incompleteLoader }) => {
    incompleteLoader.load('jeep', 'jeep.glb');

    expect(incompleteLoader.getUrl('jeep')).toEqual('jeep.glb')
  })
});
