### __位运算__
``` python
# N皇后终结位运算解法
def totalNQueens(self, n):
  if n < 1: return []
  self.count = 0
  self.DFS(n, 0, 0, 0, 0)
  return self.count
def DFS(self, n, row, cols, pie, na):
  # recursion terminator
  if row >= n:
    self.count += 1
    return
  bits = (~(cols | pie | na)) & ((1 << n) — 1) # 得到当前所有的空位
  while bits:
    p = bits & —bits # 取到最低位的1
    bits = bits & (bits — 1) # 表示在p位置上放入皇后
    self.DFS(n, row + 1, cols | p, (pie | p) << 1, (na | p) >> 1)
  # 不需要revert cols, pie, na 的状态
```
* \>> , << , | , &
* ~取反, ^异或
* <font color=yellow>__异或__：</font>相同为 0，不同为 1。也可用“不进位加法” 来理解
  * x ^ 0 = x
  * x ^ 1s = ~x // 注意 1s = ~0
  * x ^ (~x) = 1s
  * x ^ x = 0
  * c = a ^ b => a ^ c = b, b ^ c = a // 交换两个数
  * a ^ b ^ c = a ^ (b ^ c) = (a ^ b) ^ c // associative
* <font color=yellow>__指定位置的位运算__</font>
  * 将 x 最右边的 n位清零： x& (~0 << n)
  * 获取 x 的第 n位值（0 或者 1）： (x >> n) & 1
  * 获取 x 的第 n位的幂值： x& (1<<n)
  * 仅将第 n位置为 1： x | (1 << n)
  * 仅将第 n位置为 0： x & (~ (1 << n))
  * 将最高位至第n位（含）清零：x & ((1 << n) - 1)
* <font color=yellow>__实战位运算要点__</font>
  * 判断奇偶：
    * x % 2 == 1 —> (x & 1) == 1
    * x % 2 == 0 —> (x & 1) == 0
  * x >> 1—> x / 2.
    * 即： x = x / 2; —> x = x >> 1; 
    * mid = (left + right) / 2; —> mid = (left + right) >> 1;
  * X = X & (X-1) 清零最低位的 1
  * X&-X =>得到最低位的 1
  * X & ~X => 0
* <font color=yellow>__实战题__</font>
  * [191. 位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)
    * 循环32：每位测试、%2/2、&1>>1
    * 循环小于32：x&(x-1)清除每一位1
  * [231. 2的幂](https://leetcode-cn.com/problems/power-of-two/)
    * 循环除2
    * 循环>>1，判断末尾为1时是否大于1
    * 一次计算： x&(x-1)后判断是否为1
  * [190. 颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)
    * int->bin->string->reverse->int
    * for32，结果<<1+(原来的>>1&1)
  * [52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/description/)
    * bits = (~(cols | pie | na)) & ((1 << n) - 1) # 得到当前所有的空位
    * p = bits & -bits # 取到最低位的1
    * bits = bits & (bits - 1) # 表示在p位置上放入皇后
  * [338. 比特位计数](https://leetcode-cn.com/problems/counting-bits/description/)
    * 位运算+DP
### __布隆过滤器__
``` python
# Python 
from bitarray import bitarray 
import mmh3 
class BloomFilter: 
	def __init__(self, size, hash_num): 
		self.size = size 
		self.hash_num = hash_num 
		self.bit_array = bitarray(size) 
		self.bit_array.setall(0) 
	def add(self, s): 
		for seed in range(self.hash_num): 
			result = mmh3.hash(s, seed) % self.size 
			self.bit_array[result] = 1 
	def lookup(self, s): 
		for seed in range(self.hash_num): 
			result = mmh3.hash(s, seed) % self.size 
			if self.bit_array[result] == 0: 
				return "Nope" 
		return "Probably" 
bf = BloomFilter(500000, 7) 
bf.add("dantezhao") 
print (bf.lookup("dantezhao")) 
print (bf.lookup("yyj")) 
```
  * 原理(https://www.cnblogs.com/cpselvis/p/6265825.html)
  * 一个很长的 __二进制向量__ 和 __一系列随机映射函数__
  * 布隆过滤器可以用于检索一个元素是否在一个集合中。
  * <font color=yellow>总结</font>：查到没有一定没有，查到有只是可能有
  * <font color=yellow>优点</font>：空间效率和查询时间都远远超过一般的算法
  * <font color=yellow>缺点</font>：缺点是有一定的误识别率和删除困难
  * <font color=yellow>案例</font>
    * 比特币网络
    * 分布式系统（Map-Reduce） — Hadoop、search engine
    * Redis 缓存
    * 垃圾邮件、评论等的过滤
### __LRU Cache()__
``` python
# Python 
class LRUCache(object): 

	def __init__(self, capacity): 
		self.dic = collections.OrderedDict() 
		self.remain = capacity

	def get(self, key): 
		if key not in self.dic: 
			return -1 
		v = self.dic.pop(key) 
		self.dic[key] = v   # key as the newest one 
		return v 

	def put(self, key, value): 
		if key in self.dic: 
			self.dic.pop(key) 
		else: 
			if self.remain > 0: 
				self.remain -= 1 
			else:   # self.dic is full
				self.dic.popitem(last=False) 
		self.dic[key] = value
```
  * 两个要素： 大小 、替换策略
  * Hash Table + Double LinkedList
  * O(1) 查询
  * O(1) 修改、更新
  * 替换策略：
    * LFU - least frequently used 频次最少
    * LRU - least recently used  最近最少
  * 实战题：
    * [146. LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/#/)
### __排序算法__
> 快速排序
``` java
// Java
public static void quickSort(int[] array, int begin, int end) {
    if (end <= begin) return;
    int pivot = partition(array, begin, end);
    quickSort(array, begin, pivot - 1);
    quickSort(array, pivot + 1, end);
}
static int partition(int[] a, int begin, int end) {
    // pivot: 标杆位置，counter: 小于pivot的元素的个数
    int pivot = end, counter = begin;
    for (int i = begin; i < end; i++) {
        if (a[i] < a[pivot]) {
            int temp = a[counter]; a[counter] = a[i]; a[i] = temp;
            counter++;
        }
    }
    int temp = a[pivot]; a[pivot] = a[counter]; a[counter] = temp;
    return counter;
}
```
> 归并排序
``` java
public static void mergeSort(int[] array, int left, int right) {
    if (right <= left) return;
    int mid = (left + right) >> 1; // (left + right) / 2

    mergeSort(array, left, mid);
    mergeSort(array, mid + 1, right);
    merge(array, left, mid, right);
}

public static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1]; // 中间数组
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
        }

        while (i <= mid)   temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        for (int p = 0; p < temp.length; p++) {
            arr[left + p] = temp[p];
        }
        // 也可以用 System.arraycopy(a, start1, b, start2, length)
    }
```
> 堆排序
``` c++
void heap_sort(int a[], int len) {
  priority_queue<int,vector<int>,greater<int> > q;
  for(int i = 0; i < len; i++) {
    q.push(a[i]);
  }
  for(int i = 0; i < len; i++) {
    a[i] = q.pop();
  }
}
```
  * [十大经典排序原理及演示](https://www.cnblogs.com/onepixel/p/7674659.html)
  * [9种经典排序算法可视化动画和效率比较](https://www.bilibili.com/video/av25136272)
  * [6分钟看完15种排序算法动画展示](https://www.bilibili.com/video/av63851336)
  * 大分类：
    * __比较类排序__：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此也称为非线性时间比较类排序
    * __非比较类排序__：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序
  * 细分类：
    * 比较类
      * 交换排序
        * 冒泡排序  O(n^2)
        * 快速排序  O(nlogn)
      * 插入排序
        * 简单插入排序  O(n^2)
        * 希尔排序   O(n^1.3)
      * 选择排序
        * 简单选择排序  O(n^2)
        * 堆排序  O(nlogn)
      * 归并排序
        * 二路归并排序  O(nlogn)
        * 多路归并排序
    * 非比较类
      * 计数排序
      * 桶排序
      * 基数排序
  * 初级排序-O(n^2)
    * 选择排序（Selection Sort）: 每次找最小值，然后放到待排序数组的起始位置
    * 插入排序（Insertion Sort）: 从前到后逐步构建有序序列；对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入
    * 冒泡排序（Bubble Sort）: 嵌套循环，每次查看相邻的元素如果逆序，则交换
  * 高级排序-O(N*LogN)
    * <font color=yellow>快速排序（Quick Sort）</font>数组取标杆 pivot，将小元素放 pivot左边，大元素放右侧，然后依次对右边和右边的子数组继续快排；以达到整个序列有序。
    * <font color=yellow>归并排序（Merge Sort）— 分治</font>
      * 1.把长度为n的输入序列分成两个长度为n/2的子序列
      * 2.对这两个子序列分别采用归并排序
      * 3.将两个排序好的子序列合并成一个最终的排序序列
    * <font color=yellow>归并和快排比较</font>
      * 归并 和 快排 具有相似性，但步骤顺序相反
      * 归并：先排序左右子数组，然后合并两个有序子数组
      * 快排：先调配出左右子数组，然后对于左右子数组进行排序
    * <font color=yellow>堆排序（Heap Sort）</font>
      * 1.数组元素依次建立小顶堆
      * 2.依次取堆顶元素，并删除
  * 特殊排序-O(n)
    * 计数排序（Counting Sort）:
      * 计数排序要求输入的数据必须是有确定范围的整数。将输入的数据值转化为键存储在额外开辟的数组空间中；然后依次把计数大于 1 的填充回原数组
    * 桶排序（Bucket Sort）:
      * 桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。
    * 基数排序（Radix Sort）:
      * 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
  * <font color=yellow>实战题</font>
    * [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)
      * 快速排序
      * 基数排序
    * [56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)
      * 使用排序？？？！！！
    * [493. 翻转对](https://leetcode-cn.com/problems/reverse-pairs/)
      * 两层循环 O(n^2)
      * merge-sort 归并排序
      * 树状数组（需要自己了解，程序很漂亮，一般不需要了解）
  

