### **字典树Trie和并查集**
> 字典树Trie
``` Python
# Python 
class Trie(object):
  
	def __init__(self): 
		self.root = {} 
		self.end_of_word = "#" 
 
	def insert(self, word): 
		node = self.root 
		for char in word: 
			node = node.setdefault(char, {}) 
		node[self.end_of_word] = self.end_of_word 
 
	def search(self, word): 
		node = self.root 
		for char in word: 
			if char not in node: 
				return False 
			node = node[char] 
		return self.end_of_word in node 
 
	def startsWith(self, prefix): 
		node = self.root 
		for char in prefix: 
			if char not in node: 
				return False 
			node = node[char] 
		return True
```
  * 多叉树
  * 前缀树
  * 结点存放字符，路径代表整个单词
  * 常用语大量字符串搜索，搜索引擎词频统计
  * 优点：最大限度减少无谓的字符串比较，查询效率比哈希表高
  * 空间换时间
  * 实战题：
    * [208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/#/description)
    * [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)
      * words遍历->board search O(N*m*m*4^k)
      * trie:words构建trie，board->trie search；四方向dx=[-1,1,0,0] dy=[0,0,-1,1]
>并查集
``` python
# Python 
def init(p): 
	# for i = 0 .. n: p[i] = i; 
	p = [i for i in range(n)] 
 
def union(self, p, i, j): 
	p1 = self.parent(p, i) 
	p2 = self.parent(p, j) 
	p[p1] = p2 
 
def parent(self, p, i): 
	root = i 
	while p[root] != root: 
		root = p[root] 
	while p[i] != i: # 路径压缩 ?
		x = i; i = p[i]; p[x] = root 
	return root
```
* 领头羊的父结点指向自己，否则群集中的结点的祖父一定会到领头羊，初始状态都是自己指向自己
* 查询：一直查到领头羊代表集群
* 合并：任意一个领头羊指向另外一个领头羊
* 路径压缩：存在一条链表形式需要每个节点重新指向领头羊
* 实战题：
  * [547. 朋友圈](https://leetcode-cn.com/problems/friend-circles/)
    * DFS,BFS（类似岛屿问题）
    * 并查集
  
### **高级搜索**
>剪枝
* 实战题：
  * [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)
    * 括号格子递归时判断所有括号数量等来剪枝
  * [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)
    * 已经找过的数缓存剪枝
  * [51. N皇后](https://leetcode-cn.com/problems/n-queens/)
    * 撇捺缓存来剪枝
  * [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/#/description)
    * 全局横竖块缓存快速剪枝  
>双向BFS,two-end BFS
* ！！！？？？代码块模板自己总结
* 头尾BFS，中间碰上达到目的
* 实战题：
  * [127. 单词接龙](https://leetcode-cn.com/problems/word-ladder/)
    * BFS、DFS
    * two-end BFS：每个字符位置a-z扩散去wordList中找寻，begin和end谁小就调换最后要遍历完或者找到在另外一边结束
> 启发式搜索
```python
# Python
def AstarSearch(graph, start, end):
	pq = collections.priority_queue() # 优先级 —> 估价函数
	pq.append([start]) 
	visited.add(start)
	while pq: 
		node = pq.pop() # can we add more intelligence here ?
		visited.add(node)
		process(node) 
		nodes = generate_related_nodes(node) 
   unvisited = [node for node in nodes if node not in visited]
		pq.push(unvisited)
```
* 基于BFS，使用优先队列priority_queue
* 启发式函数、估价函数h(n)，返回非负实数
* [物种流行估价函数对比](https://dataaspirant.com/five-most-popular-similarity-measures-implementation-in-python/)
* 实战题：
  * [1091. 二进制矩阵中的最短路径](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)
    * dp(动态规划)
    * BFS
    * A*
  * [773. 滑动谜题](https://leetcode-cn.com/problems/sliding-puzzle/)
    * [花花酱各种解法效率对比](https://zxi.mytechroad.com/blog/searching/8-puzzles-bidirectional-astar-vs-bidirectional-bfs/)
    * 某个解法：变成一维字符串'123450'，跳转索引字典，key：0的位置 value：可能去到的位置索引
    * 各种BFS解法基础上A*解法
### **红黑树和AVL树**
>AVL树
* Balance factor(平衡因子)：左子树减右子树高度，在{-1,0,1}范围内
* 通过旋转保证平衡
  * 左旋（右右树）
  * 右旋（左左树）
  * 左右旋（左右树）
  * 右左旋（右左树）
  * 带有子树旋转
    * 右旋：左边节点右子节点移到右边节点左节点
    * 左旋：右边节点左子节点移动左边节点右节点
  * 总结：
    * 平衡二叉树
    * 每个节点存balance factor={-1,0,1}
    * 四种旋转
    * __不足__：节点需要存储额外int信息，且插入删除调整太过频繁
>红黑树
* __近似平衡__ 二叉搜索树
* 任何节点左右子树的 __高度差小于两倍__
* 满足特性：
  * 每个节点要么红要么黑
  * 根节点黑
  * 每个叶子（空节点）黑
  * 不能有相邻接的两个红
  * 从任意一个节点到其每个叶子路径包含相同数量黑
>AVL和红黑对比
* AVL查询更快
* 红黑插入、删除更快
* 红黑额外空间小，存bit红黑，AVL存int因子或int高度
* 高级语言库使用红黑树：map、set；DB使用AVL