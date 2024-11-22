class Hashmap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
    
        return hashCode % this.capacity
    }

    increaseCapacity() {
        const prevBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
        for (const bucket of prevBuckets) {
            for (const [key, value] of bucket) {
                this.set(key,value);
            }
        }
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value; // overwrites data
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;

        if (this.size > (this.capacity * this.loadFactor)) {
            this.increaseCapacity();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        return null; // Key isnt found
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const pair of bucket) {
            if (pair[0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1); // Finds matching key and removes the pair
                this.size--;
                return true;
            }
        }
        return flase // Key isnt found, nothing to remove
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    key() {
        const keys = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                keys.push(pair[0]);
            }
        }
        return keys;
    }

    //key and value functions are the same but grab the key ([0]) or the value ([1]);

    value() {
        const values = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                values.push(pair[1]);
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                entries.push(pair);
            }
        }
        return entries
    }
}

const test = new Hashmap();


test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.length());
console.log('size', test.size);

test.set('apple', 'green');
console.log(test.length());
console.log('Original Capacity: ', test.capacity);

test.set('moon', 'silver');
console.log('added 1', test.length());
console.log('Capacity doubled: ', test.capacity);

test.set('frog', 'brown');
test.set('grape', 'white');
test.set('ice cream', 'chocolate');
test.remove('hat');
console.log('Values: ', test.value());
console.log('Keys: ', test.key());
console.log('Entries: ', test.entries());
test.clear();
console.log('cleared');
console.log(test.length());