'use strict';

const prototype = {
    array:      [],
    dimensions: [],

    init(...dimensions) {
        this.dimensions = dimensions;

        this.array = Array.from(
            { length: dimensions.length && dimensions.reduce((value, dimension) => value * dimension, 1) },
        );

        return this;
    },

    set(value, ...coordinates) {
        this.array[this.findIndex(...coordinates)] = value;

        return this;
    },

    get(...coordinates) {
        return this.array[this.findIndex(...coordinates)];
    },

    findIndex(...coordinates) {
        const most = coordinates.slice(0, -1);
        const last = coordinates.slice(-1)[0];

        return most.reduce((final, current, index) => final + current * this.dimensions[index], 0) + last;
    },
};

export default (...dimensions) => Object.create(prototype).init(...dimensions);
