// console.log("Hello");

// If you know how to mess around with js objects, this will not be an issue for you.

// This is basically a linked list with two nextNodes.

// Data has to be sorted. No duplicates.

// Sort first before creating BST.

function balancedBinarySearchTree(unsortedArray) {
  const rootNode = tree(unsortedArray);

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
      // console.log(temp.data);

      if (temp.data === value) {
        console.log("Node already exists");
        return;
      }

      if (value < temp.data) {
        // console.log("LEFT");
        if (!temp.left) {
          temp.left = node(value, null, null);
          return;
        }
        temp = temp.left;
        continue;
      }

      if (value > temp.data) {
        // console.log("RIGHT");
        if (!temp.right) {
          // console.log("WUT");
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
    // console.log("TEST");
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
  function height(node){
    const getNode = find(node);

    let count = 0

    function countEdge(root, edge = -1) {
      if (!root) {

        // console.log("WUD:"+i)
        if (edge > count) {
          count = edge
        }
        
        return;
      }

      console.log(root)

    // console.log(i)

      edge++

      // console.log(i)
      // console.log("WUT")
      countEdge(root.left, edge);
      countEdge(root.right, edge);
      // callback(root);
      
    }

    countEdge(getNode)

    return count

  }

// 9.
  function depth(node){
    // const getNode = find(node);

    let count = 0;

    let found  = false;

    function countEdge(root, edge = -1) {

      // console.log(root)
      // console.log("DAMMIT");
      if(found){
        return;
      }

      if (!root) {
        return
      }
      edge++

      if (root.data === node) {
        count = edge;
        console.log(root.data +" count is "+ count);
        found = true;
        return;
      }

      countEdge(root.left, edge);
      countEdge(root.right, edge);

      
    }

    countEdge(rootNode)

    return count
  }




  return {
    rootNode,
    insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
  };
}

// balancedBinarySearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// console.log(balancedBinarySearchTree([1, 2, 3, 4]));

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

// prettyPrint(balancedBinarySearchTree([1, 2, 3, 4]));

const newTree = balancedBinarySearchTree([1, 2, 3, 4, 4, 5, 6, 7, 8, 9]);

// newTree.insert(5);

// newTree.insert(7);

// newTree.insert(50);

// console.log(newTree.deleteNode(6));

// console.log(newTree.deleteNode(3));

// console.log(newTree.deleteNode(11));

// console.log(newTree.deleteNode(1));

// console.log(newTree.deleteNode(9));

// newTree.insert(6);

// newTree.insert(6);

// newTree.insert(11);

// newTree.insert(5);

// newTree.deleteNode(8);

newTree.insert(7.5);

newTree.insert(7.6);

newTree.insert(7.8);

newTree.insert(7.9);

// newTree.insert(7.4);

// newTree.deleteNode();

// newTree.deleteNode(7);

// newTree.deleteNode(8);

// newTree.deleteNode(11);
// console.log(newTree.deleteNode(2));

// console.log(newTree.find(9));

// newTree.levelOrder(demo);

// newTree.inOrder(demo);

// newTree.height(8);


// console.log(newTree.height(5));

console.log(newTree.depth(6))

function demo(val, count = 0) {
  console.log("DATA VALUE: "+val.data);
  // count++
  // return count
  // console.log("Count total: "+ count);
  // return count
}

prettyPrint(newTree.rootNode);

//
//
//
// console.log(mergeSort([3, -1, 4, 1, -5, 9, 2, -6, 5, 3, -5]));
// console.log(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
// console.log(mergeSort([5, 7, 1, 15, 9, 2, 14, 8, 7, 3, 3]));

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
