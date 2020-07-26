### **深度搜索、广度搜索、优先级搜索（启发式搜索）**

>DFS递归写法 代码模板 
``` Python
#Python
visited = set() 

def dfs(node, visited):
    if node in visited: # terminator
    	# already visited 
    	return 

	visited.add(node) 

	# process current node here. 
	...
	for next_node in node.children(): 
		if next_node not in visited: 
			dfs(next_node, visited)
```

>DFS非递归写法 代码模板 
``` Python
#Python
def DFS(self, tree): 

	if tree.root is None: 
		return [] 

	visited, stack = [], [tree.root]

	while stack: 
		node = stack.pop() 
		visited.add(node)

		process (node) 
		nodes = generate_related_nodes(node) 
		stack.push(nodes) 

	# other processing work 
	...
```

>BFS 代码模板
``` Python
# Python
def BFS(graph, start, end):
    visited = set()
	queue = [] 
	queue.append([start]) 
	while queue: 
		node = queue.pop() 
		visited.add(node)
		process(node) 
		nodes = generate_related_nodes(node) 
		queue.push(nodes)
	# other processing work 
	...
```

* DFS：递归和循环栈
* BFS：队列
* 实战题：
  * [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/#/description)
  BFS（加标记、每层做一个node）； DFS（遍历放到对应层数组）
  * [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/#/description)
  DFS解决
  * [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
  DFS（找到岛屿相关深度打掉）

### **贪心算法**
* 对比：
  * 贪心：当下做局部最优判断
  * 回溯：能够回退
  * 动态规划：最优判断+回退
* 常见问题：求图中的最小生成树；求哈夫曼编码
* 实战题：
  * [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)
  * [455. 分发饼干](https://leetcode-cn.com/problems/assign-cookies/description/)
  * [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/description/)
  * [55. 跳跃游戏](https://leetcode-cn.com/problems/jump-game/) 
  双层循环标记true；反向贪心

### **二分查找**

> 二分查找模板
``` Python
# Python
left, right = 0, len(array) - 1 
while left <= right: 
	  mid = (left + right) / 2 
	  if array[mid] == target: 
		    # find the target!! 
		    break or return result 
	  elif array[mid] < target: 
		    left = mid + 1 
	  else: 
		    right = mid - 1
```

* 前提：
    * 目标单调性
    * 存在上下界
    * 能够索引访问
* 实战题：
  * [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)
    * 二分查找
    * [Fast InvSqrt()雷霆3平方根分之一](https://www.beyond3d.com/content/articles/8/)
    * 牛顿迭代法：cur=(cur+x/cur)/2
  * [33. 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)
  暴力还原再二分； 二分查找（判断左右哪里旋转）
  * [74. 搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix/)
  连接成一维二分； 先线形查找右上或左下到行再线形