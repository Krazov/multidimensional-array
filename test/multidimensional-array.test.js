import multidimensionalArray from '../src/multidimensional-array';

describe('itself', () => {
    test('should return function', () => {
        expect(typeof multidimensionalArray).toBe('function');
    });
});

describe('called', () => {
    test('should return object with `array` and `dimension` properties being empty Arrays', () => {
        const mArray = multidimensionalArray();

        expect(mArray).not.toBe(null);
        expect(typeof mArray).toBe('object');
        expect(mArray).toEqual({array: [], dimensions: []});
    });

    test('should have methods in `prototype`', () => {
        const mProto = Object.getPrototypeOf(multidimensionalArray());

        expect(mProto).not.toBe(null);
        expect(typeof mProto).toBe('object');
        expect(Object.keys(mProto)).toMatchObject(['array', 'dimensions', 'init']);
    });

    test('should return object with dimensions of 5 to have `array` of length of 5 (duh!)', () => {
        const mArray = multidimensionalArray(5);

        expect(mArray).toMatchObject({dimensions: [5]});
        expect(mArray.array).toHaveLength(5);
    });

    test('should return object with dimensions of 4, 4 to have `array` of length of 16', () => {
        const mArray = multidimensionalArray(4, 4);

        expect(mArray).toMatchObject({dimensions: [4, 4]});
        expect(mArray.array).toHaveLength(16);
    });

    test('should return object with dimensions of 3, 3, 3 to have `array` of length of 27', () => {
        const mArray = multidimensionalArray(3, 3, 3);

        expect(mArray).toMatchObject({dimensions: [3, 3, 3]});
        expect(mArray.array).toHaveLength(27);
    });
});
