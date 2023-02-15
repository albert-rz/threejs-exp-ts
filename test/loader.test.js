import { describe, expect, test } from 'vitest';
import { LoadedModelRegister } from 'src/loader.ts';

describe('LoadedModelRegiter', () => {
  test('keys returns keys in register', () => {
    const register = new LoadedModelRegister();
    expect(register.keys.length).toEqual(0);

    // register.loading('jeep', 'jeep.url');
    // expect(JSON.stringify(register.keys) == JSON.stringify(['jeep'])).toBeTruthy();

    // register.loading('plane', 'plane.url');
    // expect(JSON.stringify(register.keys) == JSON.stringify(['jeep', 'plane'])).toBeTruthy();
  });
});
