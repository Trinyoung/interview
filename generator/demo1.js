function* helloGenerator (){
    console.log(1)
    yield 'hello';
    yield 'world';
    // return 'ending';
}

var hg = helloGenerator();
// console.log(hg, '-')
// console.log(hg.next());
// console.log(hg.next());
// console.log(hg.next());
// console.log(hg.next());
for (let value of hg) {
    console.log(value)
}
// hg.forEach(item => {
//     console.log(item, '---------------')
// })