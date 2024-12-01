function test2(tokens) {
    const total = tokens.reduce((res, item) => {
        return res += item;
    }, 0)
    tokens.sort((a, b) => a - b);
    // let minus = 0;
    let min = 0;
    // const tokensMap = tokens.reduce(item => )
    for (let i = 0; i < tokens.length - 4; i++) {
        // minus = Math.abs(Math.abs(tokens[i + 1] - tokens[i]) - minus);
        for (let j = i + 1; j < tokens.length - 3; j++ ) {
            for (let k = j + 1; k < tokens.length - 2; k ++) {
                for (let m = k + 1; m < tokens.length - 1; m++) {
                    for (let n = m + 1; n < tokens.length; n ++) {}
                    let sum = tokens[i] + tokens[j] + tokens[k] + tokens[m] + tokens[n];
                    min = Math.min(min, total - 2 * sum)
                }
            }
        }
    }
    console.log(min)
}
test2([1, 4, 5, 6, 8, 9, 10, 2, 3, 7])