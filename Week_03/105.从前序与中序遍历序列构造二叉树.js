/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var tPreorder;
var tInorder;
var inoMap;
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    tPreorder = preorder;
    tInorder = inorder;

    inoMap = new Map();
    for (let i = 0; i < tInorder.length; i++) {
        inoMap.set(tInorder[i], i);
    }

    return myBuildTree(0, tPreorder.length, 0, tInorder.length);
};

function myBuildTree(preStart, preEnd, inoStart, inoEnd) {
    if (preStart == preEnd) {
        return null;
    }

    let node = new TreeNode(tPreorder[preStart]);
    // let node = { val: tPreorder[preStart] };
    let inRoot = inoMap.get(tPreorder[preStart]);

    let leftNum = inRoot - inoStart;
    let newLeftStart = preStart + 1;
    let newLeftEnd = newLeftStart + leftNum;
    node.left = myBuildTree(newLeftStart, newLeftEnd, inoStart, inRoot);
    let rightNum = inoEnd - (inRoot + 1);
    node.right = myBuildTree(newLeftEnd, newLeftEnd + rightNum, inRoot + 1, inoEnd);

    //drill down
    return node;
}

// let tree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
// console.log('end');
// @lc code=end

