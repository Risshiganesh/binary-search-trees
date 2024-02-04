function balancedBinarySearchTree(unsortedArray) {
  let rootNode = tree(unsortedArray);

  // 1.
  function node(data, left, right) {
    return {
      data,
      left,
      right,
    };
  }

  // 2.
  function tree(arrayToBeSorted) {
    const root = buildTree(arrayToBeSorted);

    return root;
  }

  // 3.
  function buildTree(array) {
    const sortedArray = mergeSort(array);

    return createBST(sortedArray);
  }

  // 3.
  function createBST(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    const midPoint = Math.floor((start + end) / 2);

    const middleElement = arr[midPoint];

    const newRoot = node();

    newRoot.data = middleElement;

    newRoot.left = createBST(arr, start, midPoint - 1);

    newRoot.right = createBST(arr, midPoint + 1, end);

    return newRoot;
  }

  // 4.
  function insert(value) {
    let temp = rootNode;

    while (temp) {
      if (temp.data === value) {
        console.log("Node already exists");
        return;
      }

      if (value < temp.data) {
        if (!temp.left) {
          temp.left = node(value, null, null);
          return;
        }
        temp = temp.left;
        continue;
      }

      if (value > temp.data) {
        if (!temp.right) {
          temp.right = node(value, null, null);
          return;
        }
        temp = temp.right;
        continue;
      }
    }
  }

  // 4.
  function deleteNode(value) {
    let temp = rootNode;

    let prevNode = null;

    let direction = null;

    while (temp) {
      if (temp.data === value) {
        break;
      }

      if (value < temp.data) {
        prevNode = temp;
        direction = "left";
        temp = temp.left;

        continue;
      }

      if (value > temp.data) {
        prevNode = temp;
        direction = "right";
        temp = temp.right;

        continue;
      }
    }

    if (!temp) {
      console.log("Node not found.");
      return;
    }

    deleteOperation(prevNode, direction, temp);

    return;
  }

  function deleteOperation(prevNode, direction, selectedNode) {
    let replacementNode = selectedNode;
    let rnParent = null;
    let dir = null;

    if (!selectedNode.left && !selectedNode.right) {
      prevNode[direction] = null;
      return;
    }

    if (selectedNode.left && selectedNode.right) {
      rnParent = replacementNode;
      // move right once
      dir = "right";
      replacementNode = selectedNode.right;

      // check if left nodes exists loop if yes
      while (replacementNode.left) {
        rnParent = replacementNode;
        dir = "left";
        replacementNode = replacementNode.left;
      }
      selectedNode.data = replacementNode.data;
      rnParent[dir] = replacementNode.right;

      return;
    }

    if (selectedNode.left || selectedNode.right) {
      if (selectedNode.left) {
        prevNode[direction] = selectedNode.left;
        return;
      }

      if (selectedNode.right) {
        prevNode[direction] = selectedNode.right;
        return;
      }
    }
  }

  // 5.
  function find(value) {
    temp = rootNode;

    while (temp) {
      if (temp.data === value) {
        break;
      }

      if (value < temp.data) {
        temp = temp.left;

        continue;
      }

      if (value > temp.data) {
        temp = temp.right;

        continue;
      }
    }

    if (!temp) {
      console.log("Node not found");
    }

    return temp;
  }

  // 6.
  function levelOrder(callback) {
    const root = rootNode;
    let queue = [root];
    let index = 0;

    // iteration
    function iteration(queue, callback) {
      while (queue[index]) {
        callback(queue[index]);
        if (queue[index].left) {
          queue.push(queue[index].left);
        }
        if (queue[index].right) {
          queue.push(queue[index].right);
        }
        index++;
      }
    }

    // iteration(queue, callback);

    function recursion(queue, callback) {
      if (!queue[index]) {
        return;
      }
      callback(queue[index]);

      if (queue[index].left) {
        queue.push(queue[index].left);
      }
      if (queue[index].right) {
        queue.push(queue[index].right);
      }
      index++;

      recursion(queue, callback);
    }

    recursion(queue, callback);
  }

  // 7.
  function inOrder(callback, root = rootNode) {
    if (!root) {
      return;
    }
    inOrder(callback, root.left);
    callback(root);
    inOrder(callback, root.right);
  }

  // 7.
  function preOrder(callback, root = rootNode) {
    if (!root) {
      return;
    }
    callback(root);
    preOrder(callback, root.left);
    preOrder(callback, root.right);
  }

  // 7.
  function postOrder(callback, root = rootNode) {
    if (!root) {
      return;
    }
    postOrder(callback, root.left);
    postOrder(callback, root.right);
    callback(root);
  }

  // 8.
  function height(node) {
    const getNode = find(node);

    let count = 0;

    function countEdge(root, edge = -1) {
      if (!root) {
        if (edge > count) {
          count = edge;
        }

        return;
      }

      console.log(root);

      edge++;
      countEdge(root.left, edge);
      countEdge(root.right, edge);
    }

    countEdge(getNode);

    return count;
  }

  // 9.
  function depth(node) {
    let count = 0;

    let found = false;

    function countEdge(root, edge = -1) {
      console.log(root);

      if (!root || found) {
        return;
      }
      edge++;

      if (root.data === node) {
        count = edge;
        console.log(root.data + " count is " + count);
        found = true;
        return;
      }

      countEdge(root.left, edge);
      countEdge(root.right, edge);
    }

    countEdge(rootNode);

    return count;
  }

  function isBalanced() {
    const countArray = [];

    function countEdge(root, edge = -1) {
      if (!root) {
        return;
      }

      edge++;

      if (!root.left && !root.right) {
        countArray.push(edge);
      }

      countEdge(root.left, edge);
      countEdge(root.right, edge);
    }

    countEdge(rootNode);

    const sortedCount = countArray.sort(function (a, b) {
      return a - b;
    });

    console.log(sortedCount);

    const difference = sortedCount[sortedCount.length - 1] - sortedCount[0];

    // console.log(difference);

    if (difference > 1) {
      return false;
    }

    if (difference <= 1) {
      return true;
    }

    return difference;
  }

  function rebalance() {
    const newArray = [];

    temp = rootNode;

    inOrder(function (temp) {
      newArray.push(temp.data);
    }, temp);

    rootNode = tree(newArray);

    console.log("rebalanced");

    return;
  }

  function getRoot() {
    return rootNode;
  }

  return {
    getRoot,
    insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const newTree = balancedBinarySearchTree([1, 2, 3, 4, 4, 5, 6, 7, 8, 9]);

function printElements(val) {
  console.log("DATA VALUE: " + val.data);
}

function driverScript() {
  // 1.
  function createRandomNumbers(num) {
    const randomNumArray = [];
    let number = num + 1;
    while (!(randomNumArray.length === 100)) {
      randomNumArray.push(Math.floor(Math.random() * number));
    }

    console.log();
    return randomNumArray;
  }

  function insertArrayNums(tree, array) {
    array.forEach((num) => {
      tree.insert(num);
    });
  }

  return {
    createRandomNumbers,
    insertArrayNums,
  };
}

const DS = driverScript();

const BST = balancedBinarySearchTree(DS.createRandomNumbers(100));
// 2.
// console.log(BST.isBalanced());

// 3.
// BST.preOrder(printElements);

// BST.postOrder(printElements);

// BST.inOrder(printElements);

// 4.
DS.insertArrayNums(BST, DS.createRandomNumbers(200));

// 5.
console.log(BST.isBalanced());
// 6.
BST.rebalance();
// 7.
console.log(BST.isBalanced());
// 8.
// BST.preOrder(printElements);
// BST.postOrder(printElements);
BST.inOrder(printElements);
prettyPrint(BST.getRoot());

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
function mergeSort(array) {
  if (array.length === 0) {
    return console.log("Array is empty");
  }

  function split(arr) {
    if (arr.length === 1) {
      return arr;
    }
    const splitLeft = arr.slice(0, arr.length / 2);

    const splitRight = arr.slice(arr.length / 2, arr.length);

    return sort(split(splitLeft), split(splitRight));
  }

  function sort(left, right, newArray = []) {
    // console.log(left, right, newArray);

    if (left.length === 0) {
      //   console.log("^^^^^^^^^^^^^^^^^^^^^^^^");

      //   console.log("CONCAT ALL RIGHT ARRAY ELEMENTS");

      return newArray.concat(right);
    }

    if (right.length === 0) {
      //   console.log("^^^^^^^^^^^^^^^^^^^^^^^^");

      //   console.log("CONCAT ALL LEFT ARRAY ELEMENTS");

      return newArray.concat(left);
    }

    if (left[0] === right[0]) {
      right = right.slice(1);
      return sort(left, right, newArray);
    }

    if (left[0] < right[0]) {
      newArray.push(left[0]);

      return sort(left.slice(1), right, newArray);
    } else {
      newArray.push(right[0]);

      return sort(left, right.slice(1), newArray);
    }
  }

  return split(array);
}
