/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
//深度遍历递归
var preorderTraversal = function (root) {
    let res = [];
    perTraverse(res, root);
    return res;
};
/**
 * 
 * @param {number[]} res 
 * @param {*} root 
 */
function perTraverse(res, root) {
    if (!root) {
        return;
    }

    res.push(root.val);
    perTraverse(res, root.left);
    perTraverse(res, root.right);
}
// //迭代 栈
// var preorderTraversal = function (root) {
//     if (!root) {
//         return [];
//     }
//     let stack = [];
//     let res = [];
//     stack.push(root);
//     while (stack.length > 0) {
//         let node = stack.pop();
//         res.push(node.val);
//         if (node.right) {
//             stack.push(node.right);
//         }
//         if (node.left) {
//             stack.push(node.left);
//         }
//     }
//     return res;
// };
// @lc code=end

