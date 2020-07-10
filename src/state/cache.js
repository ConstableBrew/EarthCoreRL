import {get, set} from 'lodash';

export class Cache {
    map = {};

    clear() {
        this.map = {};
    }

    deserialize(data) {
        this.clear();

        this.map = Object.keys(data.map).reduce(
            (acc, val) => {
                acc[val] = new Set(data.map[val]);
                return acc;
            },
            {}
        );
    }

    serialize() {
        const map = Object.keys(this.map).reduce(
            (acc, val) => {
                acc[val] = [...this.map[val]];
                return acc;
            },
            {}
        );

        return {
            map,
        };
    }

    addSet(name, key, value) {
        if (!this.validate(name, key, 'addSet')) return;

        if (this[name][key]) {
            this[name][key].add(value);
        } else {
            this[name][key] = new Set();
            this[name][key].add(value);
        }
    }

    readSet(name, key, value) {
        if (!this.validate(name, key, 'readSet')) return;

        if (value) {
            return this[name][key].get(value);
        }

        return this[name][key];
    }

    addObj(name, path, value) {
        set(this[name], path, value);
    }

    readObj(name, path) {
        return get(this[name], path);
    }

    delete(name, key, value) {
        if (!this.validate(name, key, 'delete')) return;

        if (this[name][key].has(value)) {
            this[name][key].delete(value);
        }
    }

    print(name, key) {
        if (!name) {
            return console.log(this);
        }

        if (name && !key) {
            return console.log(this[name]);
        }

        if (name && key) {
            return console.log(this[name][key]);
        }
    }

    validate(name, key, operation) {
        if (!this[name]) {
            console.warn(`Cannot '${operation}'. Cache '${name}' does not exist`);
            return false;
        }

        switch (operation) {
            case 'delete':
            case 'read':
            case 'readSet':
                if (!this[name]) {
                    console.warn(`Cannot '${operation}'. Cache '${name}.${key}' does not exist`);
                    return false;
                }
                return true;

            default:
                return true;
        }
    }
}
