/**
 * 给定一个二叉树，返回所有从根节点到叶子结点的路径
说明：叶子结点是指没有子节点的结点
树输入按层序遍历序列化表示，每组子节点由空值分割（参见示例）
示例：
输入：root = [1, 2, 3, null, 5]
输出：["1->2->5", "1->3"]
解释：所有根节点到叶子结点的路径为：1-2-5，1-3
 */

// function TreeNode(val, left, right) {
//   this.val = (val===undefined ? 0 : val)
//   this.left = (left===undefined ? null : left)
//   this.right = (right===undefined ? null : right)
// }
import { LeetCodeTree } from '@/utils/binary-tree';
var binaryTreePathsO = function(root) {
  const paths = [];
  const construct_paths = (root, path) => {
      if (root) {
          path += root.val.toString();
          if (root.left === null && root.right === null) { // 当前节点是叶子节点
              paths.push(path); // 把路径加入到答案中
          } else {
              path += "->"; // 当前节点不是叶子节点，继续递归遍历
              construct_paths(root.left, path);
              construct_paths(root.right, path);
          }
      }
  }
  construct_paths(root, "");
  return paths;
};

var binaryTreePathsT = function(root) {
  const paths = [];
  if (root === null) {
      return paths;
  }
  const node_queue = [root];
  const path_queue = [root.val.toString()];

  while (node_queue.length) {
      const node = node_queue.shift(); 
      const path = path_queue.shift();

      if (node.left === null && node.right === null) {
          paths.push(path);
      } else {
          if (node.left !== null) {
              node_queue.push(node.left);
              path_queue.push(path + "->" + node.left.val.toString());
          }

          if (node.right !== null) {
              node_queue.push(node.right);
              path_queue.push(path + "->" + node.right.val.toString());
          }
      }
  }
  return paths;
};

const arr = [1, 2, 3, null, 5];
//    1
//   / \
//  2   3
//   \
//    5
const b = new LeetCodeTree(arr);
console.log('b', binaryTreePathsO(b.root), binaryTreePathsT(b.root));

var arr2 = [3,9,20,null,null,15,7];
// 3
// / \
// 9  20
//  /  \
// 15   7
const c = new LeetCodeTree(arr2);
console.log('c', binaryTreePathsO(c.root), binaryTreePathsT(c.root));

const d = new LeetCodeTree([6,2,3,4,9,8,7,12,1,22])
console.log(`
// 如图1中序遍历结果：1 2 3 4 6 7 8 9 12 22
// 如图1前序遍历结果：6 2 1 3 4 9 8 7 12 22
// 如图1后序遍历结果：1 4 3 2 7 8 22 12 9 6
`)
// 如图1中序遍历结果：1 2 3 4 6 7 8 9 12 22
// 如图1前序遍历结果：6 2 1 3 4 9 8 7 12 22
// 如图1后序遍历结果：1 4 3 2 7 8 22 12 9 6
console.log('d', d.root, d.middleTraverse(), d.preTraverse(), d.afterTraverse());