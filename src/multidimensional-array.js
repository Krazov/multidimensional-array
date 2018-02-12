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
            (points, point, index) => {
                const length = this.array.length;

                const prev = point - 1;
                const next = point + 1;

                let tmp = [];

                tmp.push(this.array[prev] !== undefined ? prev : length - 1);
                tmp.push(point);
                tmp.push(this.array[next] !== undefined ? next : 0);

                return (points.push(tmp), points);
            },
            [],
        );

        const furtherPoints = (points, array, segment) => {
            // const [set, ...rest] = segment;
            //
            // for (let i = 0; i < segment.length; i += 1) {
            //     array.push(set[i]);
            //
            //     if (i + 1 < set.length) {
            //         furtherPoints(points, array, rest);
            //     } else {
            //         points.push(array);
            //     }
            // }
        };

        let points = [];

        let set = prePoints[0];

        for (let j = 0; j < set.length; j += 1) {
            let tmpArray = [
                set[j],
            ];

            if (j + 1 < prePoints.length) {
                furtherPoints(points, tmpArray, prePoints.slice(1));
            } else {
                points.push(tmpArray);
            }
        }

        return points
            .filter(
                (pointIndex) => pointIndex != this.findIndex(...coordinates),
            )
            .map(
                (coordinates) => this.array[this.findIndex(...coordinates)],
            );
    },
};

// memoization?

export default (...dimensions) => Object.create(prototype).init(...dimensions);
