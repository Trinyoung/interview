// function test(totalHours, arr) {
//     arr.sort((a, b) => a[0] - b[0]); // 按照时长进行排序；
//     console.log(arr, 'arr is hehhehhe')
//     const workMap = arr.reduce((res, item) => {
//         if (!res[item[0]]) {
//             res[item[0]] = [res[item[1]]]
//         } else {
//             res[item[0]].push(item[1])
//         }
//         return res;
//     }, {})
//     for (let key in workMap) {
//         workMap[key] = workMap[key].sort((a, b) => b - a);
//     }
//     const dp = new Array(Number(totalHours) + 1).fill(0);
//     dp[i] = dp[i - arr[j]]
//     for (let i = arr[0][0]; i <= Number(totalHours); i++) {
//         dp[i] = 0;
//         for (let j = 0; j < arr.length; j++) {
//             dp[i] = Math.max(dp[i], dp[i - arr[j][0]] + workMap[arr[j][0]][0])
//         }
//     }
//     function interate() {
//         // 求两组数之间的和之差的最小值

//     }
//     console.log(dp[dp.length - 1])
// }
maxProfit(60, [[20, 10], [20, 5], [20, 20], [20, 15]])

function maxProfit(n, arr) {
    const dp = new Array(n + 1).fill(0);
    for (let i = 0; i < arr.length; i++) {
      const [time, profit] = arr[i];
      for (let j = n; j >= time; j--) {
        if (!dp[j - time]) {
          // 如果上一个状态不存在（说明之前没选过可以耗时达到 j - time 的任务）
          dp[j] = Math.max(dp[j], dp[j - time] + profit);
        } else if (dp[j - time] + profit > dp[j]) {
          // 如果上一个状态存在且当前任务加入后收益更大
          dp[j] = dp[j - time] + profit;
        }
      }
    }
    console.log(dp[n])
    return dp[n];
  }
//   test(40, )