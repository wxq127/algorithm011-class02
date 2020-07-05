/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// var removeDuplicates = function (nums) {

// };
//暴力优化
var removeDuplicates = function (nums) {
    let insertIndex = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[insertIndex - 1] != nums[i]) {
            nums[insertIndex++] = nums[i];
        }
    }
    return insertIndex;
};
// //暴力
// var removeDuplicates = function (nums) {
//     let insertIndex = 1;
//     for (let i = 1; i < nums.length; i++) {
//         let contains = false;
//         for (let j = 0; j < insertIndex; j++) {
//             if (nums[j] == nums[i]) {
//                 contains = true;
//                 break;
//             }
//         }
//         if (!contains) {
//             nums[insertIndex++] = nums[i];
//         }
//     }
//     return insertIndex;
// };
// removeDuplicates([1, 1, 2])
// @lc code=end

