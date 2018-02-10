import multidimensionalArray from '../src/multidimensional-array';

const CONSECUTIVE = Symbol('consecutive');

const getExemplary2d =
          (item = CONSECUTIVE) =>
              ({
                  array: Array.from(
                      { length: 9 },
                      item == CONSECUTIVE
                          ? (_, i) => i
                          : () => item,
                  ),

                  dimensions: [3, 3],
              });

const getPrototype =
          () =>
              Object.getPrototypeOf(multidimensionalArray());

const getFull2d =
          (item = CONSECUTIVE) =>
              Object.assign(
                  Object.create(getPrototype()),
                  getExemplary2d(item),
              );

describe('itself', () => {
    test('should return function', () => {
        expect(typeof multidimensionalArray).toBe('function');
    });
});

describe('called', () => {
    test('should return object with `array` and `dimension` properties being empty Arrays', () => {
        const mArray = multidimensionalArray();

        expect(mArray).not.toBeNull();
        expect(typeof mArray).toBe('object');
        expect(mArray).toEqual({ array: [], dimensions: [] });
    });

    test('should have full set of methods in `prototype`', () => {
        const mProto = getPrototype();
        const mProps = Object.keys(mProto);

        expect(mProto).not.toBeNull();
        expect(typeof mProto).toBe('object');

        const expectedProps = ['array', 'dimensions', 'init', 'set', 'get', 'findIndex'];

        expect(mProps).toEqual(expect.arrayContaining(expectedProps));
        expect(mProps).toHaveLength(expectedProps.length);
    });

    test('should return object with dimensions of 5 to have `array` of length of 5 (duh!)', () => {
        const mArray = multidimensionalArray(5);

        expect(mArray).toMatchObject({ dimensions: [5] });
        expect(mArray.array).toHaveLength(5);
    });

    test('should return object with dimensions of 4, 4 to have `array` of length of 16', () => {
        const mArray = multidimensionalArray(4, 4);

        expect(mArray).toMatchObject({ dimensions: [4, 4] });
        expect(mArray.array).toHaveLength(16);
    });

    test('should return object with dimensions of 3, 3, 3 to have `array` of length of 27', () => {
        const mArray = multidimensionalArray(3, 3, 3);

        expect(mArray).toMatchObject({ dimensions: [3, 3, 3] });
        expect(mArray.array).toHaveLength(27);
    });
});

describe('findIndex', () => {
    const { findIndex } = getPrototype();

    test('should calculate proper index for given coordinates of 2D multidimensional array', () => {
        const exemplary = getExemplary2d(17);

        expect(findIndex.call(exemplary, 0, 0)).toBe(0);
        expect(findIndex.call(exemplary, 0, 1)).toBe(1);
        expect(findIndex.call(exemplary, 0, 2)).toBe(2);
        expect(findIndex.call(exemplary, 1, 0)).toBe(3);
        expect(findIndex.call(exemplary, 1, 1)).toBe(4);
        expect(findIndex.call(exemplary, 1, 2)).toBe(5);
        expect(findIndex.call(exemplary, 2, 0)).toBe(6);
        expect(findIndex.call(exemplary, 2, 1)).toBe(7);
        expect(findIndex.call(exemplary, 2, 2)).toBe(8);
    });

    // TODO: should throw an error for mismatched dimensions
});

describe('get', () => {
    const { get } = getPrototype();

    test('should retrieve values of 0..8 for multidimensional array of 3x3', () => {
        const full = getFull2d();

        expect(get.call(full, 0, 0)).toBe(0);
        expect(get.call(full, 0, 1)).toBe(1);
        expect(get.call(full, 0, 2)).toBe(2);
        expect(get.call(full, 1, 0)).toBe(3);
        expect(get.call(full, 1, 1)).toBe(4);
        expect(get.call(full, 1, 2)).toBe(5);
        expect(get.call(full, 2, 0)).toBe(6);
        expect(get.call(full, 2, 1)).toBe(7);
        expect(get.call(full, 2, 2)).toBe(8);
    });
});

describe('set', () => {
    const { set }   = getPrototype();

    test('should be chainable (return itself)', () => {
        const full = getFull2d();

        expect(set.call(full, 70150, 1, 1)).toBe(full);
    });

    test('should change the value of cell #1', () => {
        const full = getFull2d();

        expect(full.array[3]).toBe(3);
        set.call(full, 666, 1, 0);
        expect(full.array[3]).toBe(666);
    });

    test('should change the value of cell #2', () => {
        const full = getFull2d();

        expect(full.array[8]).toBe(8);
        set.call(full, 666, 2, 2);
        expect(full.array[8]).toBe(666);
    });
});

// TODO: map (general)
// TODO: map row
// TODO: map column
