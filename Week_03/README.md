### **递归**
> 递归模板
``` java
// Java
public void recur(int level, int param) { 
  // terminator 
  if (level > MAX_LEVEL) { 
    // process result 
    return; 
  }

  // process current logic 
  process(level, param); 

  // drill down 
  recur( level: level + 1, newParam); 

  // restore current status 
 
}
```

* 实战题
  * [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)
  数学归纳法
  * [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)
  暴力穷举2n边格子最后判断符合的；左右格子数提前穷举判断符合剪枝
  * [98. 验证二叉搜索树 BST](https://leetcode-cn.com/problems/validate-binary-search-tree/)
  利用定义递归验证，上下边界； 中序升序（BST特性）验证
  * [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
  最大深度为左右子树深度加一

### **分治、回溯**

>分治模板
``` Python
# Python
def divide_conquer(problem, param1, param2, ...): 
  # recursion terminator 
  if problem is None: 
	print_result 
	return 

  # prepare data 
  data = prepare_data(problem) 
  subproblems = split_problem(problem, data) 

  # conquer subproblems 
  subresult1 = self.divide_conquer(subproblems[0], p1, ...) 
  subresult2 = self.divide_conquer(subproblems[1], p1, ...) 
  subresult3 = self.divide_conquer(subproblems[2], p1, ...) 
  …

  # process and generate the final result 
  result = process_result(subresult1, subresult2, subresult3, …)
	
  # revert the current level states
```

* **分治：** 将一个复杂问题化解成多个子问题再合并子问题结果
* **回溯：** 找到一个可能存在的正确答案，不断尝试，尝试了所有分步宣告没有答案
* 实战题：
  * [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)
  暴力循环； 分治每次求一半n/2
  * [78. 子集](https://leetcode-cn.com/problems/subsets/)
  暴力格子2n穷举； 分治类似爬楼梯每次加入一个元素和之前元素结果拼接；
  * [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)
  回溯格子穷举法； 
  * [51. N皇后](https://leetcode-cn.com/problems/n-queens/)
  回溯每行每列防止测试，撇捺字典特殊判断
