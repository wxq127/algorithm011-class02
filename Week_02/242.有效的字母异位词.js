/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
//最优hashmap
var isAnagram = function (s, t) {
    let countMap = {};
    let size = 0;
    for (let c of s) {
        if (!(c in countMap)) {
            countMap[c] = 0;
            size++;
        }
        countMap[c]++;
    }
    for (let c of t) {
        if (!(c in countMap)) {
            return false;
        }
        countMap[c]--;
        if (countMap[c] == 0) {
            delete countMap[c];
            size--;
        }
    }
    return size == 0;
};
//暴力排序
// var isAnagram = function (s, t) {
//     let sSroted = arrayToString(stringToArray(s).sort());
//     let tSorted = arrayToString(stringToArray(t).sort());
//     return sSroted == tSorted;
// };
// function stringToArray(s) {
//     let array = [];
//     for (let c of s) {
//         array.push(c);
//     }
//     return array;
// }
// /**
//  * 
//  * @param {array} arr 
//  */
// function arrayToString(arr) {
//     let s = '';
//     for (let a of arr) {
//         s += a;
//     }
//     return s;
// }
// @lc code=end

