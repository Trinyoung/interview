// import count from './count.mjs'
const container = document.getElementById('container');
const btn = document.getElementById('btn');
let count = 0;
container.innerHTML = count;
btn.addEventListener('click', () => {
    count++;
    container.innerHTML = count;
})