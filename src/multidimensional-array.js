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
        if (coordinates.some((item, index) => item > this.dimensions[index])) {
            throw new RangeError('Coordinates outside of multidimensional array. Sorry.');
        }

        if (coordinates.length == 1) {
            return coordinates[0];
        }

        // else
        const most = coordinates.slice(0, -1);
        const last = coordinates.slice(-1)[0];

        return most.reduce((final, current, index) => final + current * this.dimensions[index], 0) + last;
    },

    getDimensions() {
        return this.dimensions;
    },

    getNeighbours(...coordinates) {
        const prePoints = coordinates.reduce(
            (points, point) => {
                const lastIndex = this.array.length - 1;

                const prev = point - 1;
                const next = point + 1;

                let tmp = [];

                tmp.push(prev > -1 ? prev : lastIndex);
                tmp.push(point);
                tmp.push(next <= lastIndex ? next : 0);

                points.push(tmp);

                return points;
            },
            [],
        );

        let points = [];

        let rest = prePoints.slice();

        const addPoints = (points, [set, ...rest]) => {
            set.forEach(
                (coordinate) => points.push(coordinate)
            );

            return points;
        };

        addPoints(points, rest);

        const index = this.findIndex(...coordinates);

        return points
            .filter(
                (pointIndex) => pointIndex != index,
            )
            .map(
                (coordinates) => this.array[this.findIndex(coordinates)]
            );
    },
};

// memoization?

export default (...dimensions) => Object.create(prototype).init(...dimensions);
