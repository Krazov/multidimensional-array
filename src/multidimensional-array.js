const prototype = {
    array:      [],
    dimensions: [],

    init(...dimensions) {
        this.dimensions = dimensions;

        this.array = Array.from({
            length: dimensions.length && dimensions.reduce((value, dimension) => value * dimension, 1)
        });

        return this;
    }
};

export default (...dimensions) => Object.create(prototype).init(...dimensions);
