/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let dir = {};
    for (let i = 0; i < nums.length; i++) {
        let a = nums[i];

        if (a in dir) {
            return [dir[a], i];
        }
        let b = target - a;
        dir[b] = i;
    }
    return [-1, -1];
};
//暴力
// var twoSum = function (nums, target) {
//     for (let i = 0; i < nums.length - 1; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             if (nums[i] + nums[j] == target) {
//                 return [i, j];
//             }
//         }
//     }
//     return [-1, -1];
// };
// @lc code=end

