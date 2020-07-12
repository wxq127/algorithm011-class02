### 非线性多维结构
> hash表
* 复杂度在一般情况下都是o(1)
* 键值对，内部数组结构，key直接用hash函数算出数组索引直接使用
* 不同key有可能算出同样的数组索引，解决办法是在数组后面引用链表、看源码貌似还有数结构。
* __Map：__ hash表的一种实现，键值对形式，key查找value
* __Set：__ key不重复的数组集合模式，底层原理是基于Map，add的时候也是去查找Map.contain()，不使用key查找
* 实战题：
    * [242. 有效的字母异位词：](https://leetcode-cn.com/problems/valid-anagram/description/)
    一张Map表记录count+-；暴力排序字符串对比
    * [49. 字母异位词分组：](https://leetcode-cn.com/problems/group-anagrams/)
    每个字符串技术处理成类似char-'a'的索引对应26长度数组转字符串当key统计；暴力每个字符串排序当key统计
    * [1. 两数之和：](https://leetcode-cn.com/problems/two-sum/description/)
    map存储余数作为key查找；暴力双重遍历查找
>树、二叉树、二叉搜索树
* __树：__ 链表下个节点分叉扩展得来，链表升维
* __二叉树：__ 只有左右节点的结构 node{val;leftNode,rightNode}
    * 前序遍历：根左右
    * 中序遍历：左根右
    * 后序遍历：左右根
* __二叉搜索树：__
    * 一定规律的二叉树
    * 所有的 __左子树节点__ 都小于 __右子树节点__ ，注意不是左右节点单一规律
    * 查询操作都是o(logn)，比链表查询o(n)操作o(1)更高效
    * __插入：__ 常规查询到目的位置插入
    * __删除：__ 
        * 删除叶子节点：直接删除
        * 删除中间节点：查找刚好比该值小一点或者大一点的都可以，一般查找比该值刚好大一点的值顶上当前节点位置即可
    * 特殊退化成一根棍子，复杂度变成了o(n)，和链表一致，需要处理成平衡二叉树
* 实战题：
    * [94. 二叉树的中序遍历：](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
    递归；迭代栈？；颜色标记法处理迭代栈
    * [144. 二叉树的前序遍历：](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)
    递归；迭代栈（容易，先 __push右再左__ ）
    * [590. N叉树的后序遍历：](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)
    * [589. N叉树的前序遍历：](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/description/)
    * [429. N叉树的层序遍历：](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)
>堆、二叉堆、图
* __堆：__
    * 一种抽象结构，只要能满足findMax o(1)，操作o(logn)即可
    * 大顶堆和小顶堆
    * [各种实现堆效率](https://en.wikipedia.org/wiki/Heap_(data_structure))
    * __优先队列__ 就是一种API中常见实现堆结构
* __二叉堆：__
    * 最简单、最容易实现的堆结构
    * 堆中效率最低，指的操作，查询都是o(1)
    * 基于完全二叉树结构（不是二叉搜索树）
    * 任意节点值大于子节点值，不像二叉搜索树需要整个左子树小于右子树，这里左右没有要求
    * 一般使用数组实现即可
        * 左节点：2*i+1
        * 右节点：2*i+2
        * 父节点：floor((i-1)/2)
    * __插入：__
        * 先加到尾节点
        * HeapifyUp：再和父节点比较，大于父节点就和父节点交换，到根为止
    * __删除（某个节点）：__
        * 堆尾顶到节点位置
        * HeapifyDown：一直往下检查左右节点，谁大于我，且是两个节点更大的和我对调
* __图：__
    * 点：度（出度、入度），点与点之间连通与否
    * 边：有向还是无向，权重
    * 邻接矩阵：mxm m即多少点，值为连通与否或者权重，如果是无向图则是对称矩阵
    * 邻接表：数组，每个元素为该点能到的点的链表
    * 相关算法：DFS和BFS，其中和树等最大的算法区别是一定有个 __visited__ 表用来存储已访问的元素，图可以有环
* 实战题：
    * [剑指 Offer 40. 最小的k个数：](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)
    * [239. 滑动窗口最大值：](https://leetcode-cn.com/problems/sliding-window-maximum/)
    暴力双层循环；双端队列；优先队列（使用堆）；
    * [200. 岛屿数量：](https://leetcode-cn.com/problems/number-of-islands/)