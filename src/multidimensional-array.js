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

    clone() {
        return Object.assign(
            Object.create(prototype).init(...this.dimensions),
            {
                array: Array.from(this.array)
            }
        );
    },

    setM(...params) {
        this.array[this.findIndex(...params.slice(0, -1))] = params[params.length - 1];

        return this;
    },

    set(...params) {
        return this.clone().setM(...params);
    },

    get(...coordinates) {
        return this.array[this.findIndex(...coordinates)];
    },

    findIndex(...coordinates) {
        if (!this.isInside(...coordinates)) {
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

    isInside(...coordinates) {
        return coordinates.length == this.dimensions.length &&
            coordinates.every((item, index) => item < this.dimensions[index]);
    },

    getDimensions() {
        return this.dimensions;
    },

    getNeighbours(...coordinates) {
        let rest   = this.getAreaAround(...coordinates);
        let points = [];

        const addPoints = (points, [set, ...rest]) => {
            // TODO: trampoline
            if (points.length) {
                let newPoints = [];

                points.forEach(
                    (base) =>
                        set.forEach(
                            (coordinate) => newPoints.push([...base, coordinate])
                        )
                );

                points = newPoints;
            } else {
                set.forEach(
                    (coordinate) => points.push([coordinate])
                );
            }

            return rest.length
                ? addPoints(points, rest)
                : points;
        };

        const index = this.findIndex(...coordinates);

        return addPoints(points, rest)
            .filter(
                (pointIndex) => this.findIndex(...pointIndex) != index
            )
            .map(
                (coordinates) => this.array[this.findIndex(...coordinates)]
            );
    },

    getAreaAround(...coordinates) {
        if (!this.isInside(...coordinates)) {
            throw new RangeError('Coordinates don’t match array dimensions. Sorry.');
        }

        return coordinates.reduce(
            (points, point, index) => {
                const lastIndex = this.dimensions[index] - 1;

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
    },
};

// TODO: memoization?
// TODO: using `propertiesObject` instead of init function, at least for dimensions

export default (...dimensions) => Object.create(prototype).init(...dimensions);
