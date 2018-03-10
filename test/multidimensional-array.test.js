import multidimensionalArray from '../src/multidimensional-array';

const CONSECUTIVE = Symbol('consecutive');

const getExemplary2d =
          (item = CONSECUTIVE) =>
              ({
                  array: Array.from(
                      { length: 9 },
                      item == CONSECUTIVE
                          ? (_, i) => 10 + i
                          : () => item,
                  ),

                  dimensions: [3, 3],
              });

const getBigger2d =
          (item = CONSECUTIVE) =>
              ({
                  array: Array.from(
                      { length: 16 },
                      item == CONSECUTIVE
                          ? (_, i) => 10 + i
                          : () => item,
                  ),

                  dimensions: [4, 4],
              });

const getPrototype =
          () =>
              Object.getPrototypeOf(multidimensionalArray());

const getFullFlat =
          () =>
              Object.assign(
                  Object.create(getPrototype()),
                  {
                      array:      [12, 13, 14, 15, 16, 17, 18],
                      dimensions: [7],
                  },
              );

const getFull2d =
          (item = CONSECUTIVE, structure = getExemplary2d(item)) =>
              Object.assign(
                  Object.create(getPrototype()),
                  structure,
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

    test('should have full set of methods in its prototype', () => {
        const mProto = getPrototype();
        const mProps = Object.keys(mProto);

        expect(mProto).not.toBeNull();
        expect(typeof mProto).toBe('object');

        const expectedProps = [
            'array', 'dimensions',
            'init', 'clone',
            'setM', 'set', 'get',
            // 'setManyM', 'setMany'
            'findIndex', 'findCoordinates', 'isInside',
            'getDimensions', 'getAreaAround', 'getNeighbours',
            // 'map',
            // 'map2dRow', 'map2dColumn'
            // filter of some sort?
        ];

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

describe('clone', () => {
    const { clone } = getPrototype();

    test('should create exact copy of 1D object', () => {
        const flat = getFullFlat();

        expect(typeof clone.call(flat)).toBe('object');
        expect(clone.call(flat)).not.toBe(flat);
        expect(Object.getPrototypeOf(clone.call(flat))).toBe(Object.getPrototypeOf(flat));
        expect(Object.keys(clone.call(flat))).toEqual(expect.arrayContaining(Object.keys(flat)));
        expect(clone.call(flat)).toEqual({ array: flat.array, dimensions: flat.dimensions });
    });

    test('should create exact copy of 2D object', () => {
        const full = getFull2d();

        expect(typeof clone.call(full)).toBe('object');
        expect(clone.call(full)).not.toBe(full);
        expect(Object.getPrototypeOf(clone.call(full))).toBe(Object.getPrototypeOf(full));
        expect(Object.keys(clone.call(full))).toEqual(expect.arrayContaining(Object.keys(full)));
        expect(clone.call(full)).toEqual({ array: full.array, dimensions: full.dimensions });
    });
});

describe('isInside', () => {
    const { isInside } = getPrototype();

    test('should return true when coordinates are inside 2D array', () => {
        const exemplary = getExemplary2d();

        expect(isInside.call(exemplary, 0, 0)).toBe(true);
        expect(isInside.call(exemplary, 0, 1)).toBe(true);
        expect(isInside.call(exemplary, 0, 2)).toBe(true);
        expect(isInside.call(exemplary, 1, 0)).toBe(true);
        expect(isInside.call(exemplary, 1, 1)).toBe(true);
        expect(isInside.call(exemplary, 1, 2)).toBe(true);
        expect(isInside.call(exemplary, 2, 0)).toBe(true);
        expect(isInside.call(exemplary, 2, 1)).toBe(true);
        expect(isInside.call(exemplary, 2, 2)).toBe(true);
    });

    test('should return false when coordinates are outside 2D array', () => {
        const exemplary = getExemplary2d();

        expect(isInside.call(exemplary, 0, 3)).toBe(false);
        expect(isInside.call(exemplary, 1, 3)).toBe(false);
        expect(isInside.call(exemplary, 2, 3)).toBe(false);
    });
});

describe('findIndex', () => {
    const { findIndex } = getPrototype();

    test('should calculate proper index for given coordinates of 1D array', () => {
        const flat = getFullFlat();

        expect(findIndex.call(flat, 0)).toBe(0);
        expect(findIndex.call(flat, 1)).toBe(1);
        expect(findIndex.call(flat, 2)).toBe(2);
    });

    test('should calculate proper index for given coordinates of 2D multidimensional array', () => {
        const exemplary = getFull2d(17);

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

    // TODO: 3D array

    test('should throw an error for mismatched coordinates', () => {
        const exemplary = getExemplary2d();

        expect(() => {
            findIndex.call(exemplary, 4, 4);
        }).toThrow();
    });
});

describe('findCoordinates', () => {
    const { findCoordinates } = getPrototype();

    test('should calculate proper coordinates for given index of 1D array', () => {
        const flat = getFullFlat();

        expect(findCoordinates.call(flat, 0)).toHaveLength(1);
        expect(findCoordinates.call(flat, 1)).toHaveLength(1);
        expect(findCoordinates.call(flat, 2)).toHaveLength(1);
        expect(findCoordinates.call(flat, 3)).toHaveLength(1);
        expect(findCoordinates.call(flat, 4)).toHaveLength(1);
        expect(findCoordinates.call(flat, 5)).toHaveLength(1);
        expect(findCoordinates.call(flat, 6)).toHaveLength(1);

        expect(findCoordinates.call(flat, 0)).toEqual(expect.arrayContaining([0]));
        expect(findCoordinates.call(flat, 1)).toEqual(expect.arrayContaining([1]));
        expect(findCoordinates.call(flat, 2)).toEqual(expect.arrayContaining([2]));
        expect(findCoordinates.call(flat, 3)).toEqual(expect.arrayContaining([3]));
        expect(findCoordinates.call(flat, 4)).toEqual(expect.arrayContaining([4]));
        expect(findCoordinates.call(flat, 5)).toEqual(expect.arrayContaining([5]));
        expect(findCoordinates.call(flat, 6)).toEqual(expect.arrayContaining([6]));
    });

    test('should calculate proper coordinates for given index of 2D array', () => {
        const full = getFull2d();

        expect(findCoordinates.call(full, 0)).toHaveLength(2);
        expect(findCoordinates.call(full, 1)).toHaveLength(2);
        expect(findCoordinates.call(full, 2)).toHaveLength(2);
        expect(findCoordinates.call(full, 3)).toHaveLength(2);
        expect(findCoordinates.call(full, 4)).toHaveLength(2);
        expect(findCoordinates.call(full, 5)).toHaveLength(2);
        expect(findCoordinates.call(full, 6)).toHaveLength(2);
        expect(findCoordinates.call(full, 7)).toHaveLength(2);
        expect(findCoordinates.call(full, 8)).toHaveLength(2);

        expect(findCoordinates.call(full, 0)).toEqual(expect.arrayContaining([0, 0]));
        expect(findCoordinates.call(full, 1)).toEqual(expect.arrayContaining([0, 1]));
        expect(findCoordinates.call(full, 2)).toEqual(expect.arrayContaining([0, 2]));
        expect(findCoordinates.call(full, 3)).toEqual(expect.arrayContaining([1, 0]));
        expect(findCoordinates.call(full, 4)).toEqual(expect.arrayContaining([1, 1]));
        expect(findCoordinates.call(full, 5)).toEqual(expect.arrayContaining([1, 2]));
        expect(findCoordinates.call(full, 6)).toEqual(expect.arrayContaining([2, 0]));
        expect(findCoordinates.call(full, 7)).toEqual(expect.arrayContaining([2, 1]));
        expect(findCoordinates.call(full, 8)).toEqual(expect.arrayContaining([2, 2]));
    });

    test('should throw an error for mismatched coordinates', () => {
        const flat = getFullFlat();
        const full = getFull2d();

        expect(() => {
            findCoordinates.call(flat, 8);
        }).toThrow();

        expect(() => {
            findCoordinates.call(full, 9);
        }).toThrow();
    });
});

describe('get', () => {
    const { get } = getPrototype();

    test('should retrieve values of 0..8 for multidimensional array of 3x3', () => {
        const full = getFull2d();

        expect(get.call(full, 0, 0)).toBe(10);
        expect(get.call(full, 0, 1)).toBe(11);
        expect(get.call(full, 0, 2)).toBe(12);
        expect(get.call(full, 1, 0)).toBe(13);
        expect(get.call(full, 1, 1)).toBe(14);
        expect(get.call(full, 1, 2)).toBe(15);
        expect(get.call(full, 2, 0)).toBe(16);
        expect(get.call(full, 2, 1)).toBe(17);
        expect(get.call(full, 2, 2)).toBe(18);
    });

    test('should throw an error for mismatched coordinates', () => {
        const full = getFull2d();

        expect(() => {
            expect(get.call(full, 4, 4));
        }).toThrow();
    });
});

describe('setM', () => {
    const { setM } = getPrototype();

    test('should be chainable (return itself)', () => {
        const full = getFull2d();

        expect(setM.call(full, 1, 1, 70150)).toBe(full);
    });

    test('should change the value of cell #1', () => {
        const full = getFull2d();

        expect(full.array[3]).toBe(13);
        setM.call(full, 1, 0, 666);
        expect(full.array[3]).toBe(666);
    });

    test('should change the value of cell #2', () => {
        const full = getFull2d();

        expect(full.array[8]).toBe(18);
        setM.call(full, 2, 2, 666);
        expect(full.array[8]).toBe(666);
    });

    test('should throw an error for mismatched coordinates', () => {
        const full = getFull2d();

        expect(() => {
            expect(setM.call(full, 4, 4, 667));
        }).toThrow();
    });
});

describe('set', () => {
    const { set } = getPrototype();

    test('should be chainable (return itself)', () => {
        const full = getFull2d();

        expect(set.call(full, 1, 1, 70150)).not.toBe(full);
    });

    test('should change the value of cell #1', () => {
        const full = getFull2d();

        expect(full.array[3]).toBe(13);
        expect(
            Object.getPrototypeOf(set.call(full, 1, 0, 666))
        ).toBe(Object.getPrototypeOf(full));
        expect(set.call(full, 1, 0, 666).get(1, 0)).toBe(666);
    });

    test('should change the value of cell #2', () => {
        const full = getFull2d();

        expect(full.array[8]).toBe(18);
        expect(
            Object.getPrototypeOf(set.call(full, 2, 2, 666))
        ).toBe(Object.getPrototypeOf(full));
        expect(set.call(full, 2, 2, 666).get(2, 2)).toBe(666);
    });

    test('should throw an error for mismatched coordinates', () => {
        const full = getFull2d();

        expect(() => {
            expect(set.call(full, 4, 4, 667));
        }).toThrow();
    });
});

describe('getDimensions', () => {
    const { getDimensions } = getPrototype();

    test('should return multidimensional array’s dimensions', () => {
        const exemplary = getExemplary2d();

        expect(getDimensions.call(exemplary)).toEqual(expect.arrayContaining([3, 3]));
    });
});

describe('getAreaAround', () => {
    const { getAreaAround } = getPrototype();

    test('should return given cell and neighbouring cells in 1D array', () => {
        const flat = getFullFlat();

        expect(getAreaAround.call(flat, 0)).toHaveLength(1);
        expect(getAreaAround.call(flat, 1)).toHaveLength(1);
        expect(getAreaAround.call(flat, 2)).toHaveLength(1);
        expect(getAreaAround.call(flat, 3)).toHaveLength(1);
        expect(getAreaAround.call(flat, 4)).toHaveLength(1);
        expect(getAreaAround.call(flat, 5)).toHaveLength(1);
        expect(getAreaAround.call(flat, 6)).toHaveLength(1);

        expect(getAreaAround.call(flat, 0)[0]).toHaveLength(3);
        expect(getAreaAround.call(flat, 1)[0]).toHaveLength(3);
        expect(getAreaAround.call(flat, 2)[0]).toHaveLength(3);
        expect(getAreaAround.call(flat, 3)[0]).toHaveLength(3);
        expect(getAreaAround.call(flat, 4)[0]).toHaveLength(3);
        expect(getAreaAround.call(flat, 5)[0]).toHaveLength(3);
        expect(getAreaAround.call(flat, 6)[0]).toHaveLength(3);

        expect(getAreaAround.call(flat, 0)[0]).toEqual(expect.arrayContaining([6, 0, 1]));
        expect(getAreaAround.call(flat, 1)[0]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(flat, 2)[0]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(flat, 3)[0]).toEqual(expect.arrayContaining([2, 3, 4]));
        expect(getAreaAround.call(flat, 4)[0]).toEqual(expect.arrayContaining([3, 4, 5]));
        expect(getAreaAround.call(flat, 5)[0]).toEqual(expect.arrayContaining([4, 5, 6]));
        expect(getAreaAround.call(flat, 6)[0]).toEqual(expect.arrayContaining([5, 6, 0]));
    });

    test('should return given cell’s and neighbouring rows and columns in 2D array', () => {
        const full = getFull2d(CONSECUTIVE, getBigger2d(CONSECUTIVE));

        expect(getAreaAround.call(full, 0, 0)).toHaveLength(2);
        expect(getAreaAround.call(full, 0, 1)).toHaveLength(2);
        expect(getAreaAround.call(full, 0, 2)).toHaveLength(2);
        expect(getAreaAround.call(full, 1, 0)).toHaveLength(2);
        expect(getAreaAround.call(full, 1, 1)).toHaveLength(2);
        expect(getAreaAround.call(full, 1, 2)).toHaveLength(2);
        expect(getAreaAround.call(full, 2, 0)).toHaveLength(2);
        expect(getAreaAround.call(full, 2, 1)).toHaveLength(2);
        expect(getAreaAround.call(full, 2, 2)).toHaveLength(2);

        expect(getAreaAround.call(full, 0, 0)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 0, 1)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 0, 2)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 0, 3)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 1, 0)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 1, 1)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 1, 2)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 1, 3)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 2, 0)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 2, 1)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 2, 2)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 2, 3)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 3, 0)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 3, 1)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 3, 2)[0]).toHaveLength(3);
        expect(getAreaAround.call(full, 3, 3)[0]).toHaveLength(3);

        expect(getAreaAround.call(full, 0, 0)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 0, 1)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 0, 2)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 0, 3)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 1, 0)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 1, 1)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 1, 2)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 1, 3)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 2, 0)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 2, 1)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 2, 2)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 2, 3)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 3, 0)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 3, 1)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 3, 2)[1]).toHaveLength(3);
        expect(getAreaAround.call(full, 3, 3)[1]).toHaveLength(3);

        // 10 11 12 13
        // 14 15 16 17
        // 18 19 20 21
        // 22 23 24 25

        expect(getAreaAround.call(full, 0, 0)[0]).toEqual(expect.arrayContaining([3, 0, 1]));
        expect(getAreaAround.call(full, 0, 1)[0]).toEqual(expect.arrayContaining([3, 0, 1]));
        expect(getAreaAround.call(full, 0, 2)[0]).toEqual(expect.arrayContaining([3, 0, 1]));
        expect(getAreaAround.call(full, 0, 3)[0]).toEqual(expect.arrayContaining([3, 0, 1]));
        expect(getAreaAround.call(full, 1, 0)[0]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(full, 1, 1)[0]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(full, 1, 2)[0]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(full, 1, 3)[0]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(full, 2, 0)[0]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(full, 2, 1)[0]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(full, 2, 2)[0]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(full, 2, 3)[0]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(full, 3, 0)[0]).toEqual(expect.arrayContaining([2, 3, 0]));
        expect(getAreaAround.call(full, 3, 1)[0]).toEqual(expect.arrayContaining([2, 3, 0]));
        expect(getAreaAround.call(full, 3, 2)[0]).toEqual(expect.arrayContaining([2, 3, 0]));
        expect(getAreaAround.call(full, 3, 3)[0]).toEqual(expect.arrayContaining([2, 3, 0]));

        expect(getAreaAround.call(full, 0, 0)[1]).toEqual(expect.arrayContaining([3, 0, 1]));
        expect(getAreaAround.call(full, 0, 1)[1]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(full, 0, 2)[1]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(full, 0, 3)[1]).toEqual(expect.arrayContaining([2, 3, 0]));
        expect(getAreaAround.call(full, 1, 0)[1]).toEqual(expect.arrayContaining([3, 0, 1]));
        expect(getAreaAround.call(full, 1, 1)[1]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(full, 1, 2)[1]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(full, 1, 3)[1]).toEqual(expect.arrayContaining([2, 3, 0]));
        expect(getAreaAround.call(full, 2, 0)[1]).toEqual(expect.arrayContaining([3, 0, 1]));
        expect(getAreaAround.call(full, 2, 1)[1]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(full, 2, 2)[1]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(full, 2, 3)[1]).toEqual(expect.arrayContaining([2, 3, 0]));
        expect(getAreaAround.call(full, 3, 0)[1]).toEqual(expect.arrayContaining([3, 0, 1]));
        expect(getAreaAround.call(full, 3, 1)[1]).toEqual(expect.arrayContaining([0, 1, 2]));
        expect(getAreaAround.call(full, 3, 2)[1]).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(getAreaAround.call(full, 3, 3)[1]).toEqual(expect.arrayContaining([2, 3, 0]));
    });

    // TODO: test('should return given cell’s and neighbouring rows and columns in 2D array', () => {});

    test('should throw a range error for mismatched dimensions', () => {
        const full = getFull2d(CONSECUTIVE, getBigger2d(CONSECUTIVE));

        expect(() => {
            expect(getAreaAround.call(full, 4, 4));
        }).toThrow();

    });
});

describe('getNeighbours', () => {
    const { getNeighbours } = getPrototype();

    test('should return neighbours of given cell in 1D array', () => {
        const flat = getFullFlat();

        expect(getNeighbours.call(flat, 0)).toEqual(expect.arrayContaining([18, 13]));
        expect(getNeighbours.call(flat, 1)).toHaveLength(2);
        expect(getNeighbours.call(flat, 1)).toEqual(expect.arrayContaining([12, 14]));
        expect(getNeighbours.call(flat, 2)).toEqual(expect.arrayContaining([13, 15]));
        expect(getNeighbours.call(flat, 3)).toEqual(expect.arrayContaining([14, 16]));
        expect(getNeighbours.call(flat, 4)).toEqual(expect.arrayContaining([15, 17]));
        expect(getNeighbours.call(flat, 5)).toEqual(expect.arrayContaining([16, 18]));
        expect(getNeighbours.call(flat, 6)).toEqual(expect.arrayContaining([12, 17]));
    });

    // 10 11 12 13
    // 14 15 16 17
    // 18 19 20 21
    // 22 23 24 25

    test('should return neighbours of given cell in 2D array', () => {
        const full = getFull2d(CONSECUTIVE, getBigger2d(CONSECUTIVE));

        expect(getNeighbours.call(full, 0, 0)).toHaveLength(8);
        expect(getNeighbours.call(full, 0, 1)).toHaveLength(8);
        expect(getNeighbours.call(full, 0, 2)).toHaveLength(8);
        expect(getNeighbours.call(full, 0, 3)).toHaveLength(8);
        expect(getNeighbours.call(full, 1, 0)).toHaveLength(8);
        expect(getNeighbours.call(full, 1, 1)).toHaveLength(8);
        expect(getNeighbours.call(full, 1, 2)).toHaveLength(8);
        expect(getNeighbours.call(full, 1, 3)).toHaveLength(8);
        expect(getNeighbours.call(full, 2, 0)).toHaveLength(8);
        expect(getNeighbours.call(full, 2, 1)).toHaveLength(8);
        expect(getNeighbours.call(full, 2, 2)).toHaveLength(8);
        expect(getNeighbours.call(full, 2, 3)).toHaveLength(8);
        expect(getNeighbours.call(full, 3, 0)).toHaveLength(8);
        expect(getNeighbours.call(full, 3, 1)).toHaveLength(8);
        expect(getNeighbours.call(full, 3, 2)).toHaveLength(8);
        expect(getNeighbours.call(full, 3, 3)).toHaveLength(8);

        expect(getNeighbours.call(full, 0, 0)).toEqual(expect.arrayContaining([15, 22, 23, 13, 11, 17, 14, 15]));
        expect(getNeighbours.call(full, 0, 1)).toEqual(expect.arrayContaining([22, 23, 24, 10, 12, 14, 15, 16]));
        expect(getNeighbours.call(full, 0, 2)).toEqual(expect.arrayContaining([23, 24, 25, 11, 13, 15, 16, 17]));
        expect(getNeighbours.call(full, 0, 3)).toEqual(expect.arrayContaining([24, 25, 22, 12, 10, 16, 17, 14]));
        expect(getNeighbours.call(full, 1, 0)).toEqual(expect.arrayContaining([13, 10, 11, 17, 15, 21, 18, 19]));
        expect(getNeighbours.call(full, 1, 1)).toEqual(expect.arrayContaining([10, 11, 12, 14, 16, 18, 19, 20]));
        expect(getNeighbours.call(full, 1, 2)).toEqual(expect.arrayContaining([11, 12, 13, 15, 17, 19, 20, 21]));
        expect(getNeighbours.call(full, 1, 3)).toEqual(expect.arrayContaining([12, 13, 10, 16, 14, 20, 21, 18]));
        expect(getNeighbours.call(full, 2, 0)).toEqual(expect.arrayContaining([17, 14, 15, 21, 19, 25, 22, 23]));
        expect(getNeighbours.call(full, 2, 1)).toEqual(expect.arrayContaining([14, 15, 16, 18, 20, 22, 23, 24]));
        expect(getNeighbours.call(full, 2, 2)).toEqual(expect.arrayContaining([15, 16, 17, 19, 21, 23, 24, 25]));
        expect(getNeighbours.call(full, 2, 3)).toEqual(expect.arrayContaining([16, 17, 14, 20, 18, 24, 25, 22]));
        expect(getNeighbours.call(full, 3, 0)).toEqual(expect.arrayContaining([21, 18, 19, 25, 23, 13, 10, 11]));
        expect(getNeighbours.call(full, 3, 1)).toEqual(expect.arrayContaining([18, 19, 20, 22, 24, 10, 11, 12]));
        expect(getNeighbours.call(full, 3, 2)).toEqual(expect.arrayContaining([19, 20, 21, 23, 25, 11, 12, 13]));
        expect(getNeighbours.call(full, 3, 3)).toEqual(expect.arrayContaining([20, 21, 18, 24, 22, 12, 13, 10]));
    });

    // TODO: test('should return neighbours of given cell in 3D array', () => {})
});

// TODO: map (general)
// TODO: map row
// TODO: map column
