var clock = function * () {
    while (true) {
        console.log('Tick');
        yield;
        console.log('Tock');
        yield;
    }
}
const a = clock();
a.next();
a.next();
a.next();