console.log("Hello");

// This is basically a linked list with two nextNodes.

// Data has to be sorted. No duplicates.

// Sort first before creating BST.

function balancedBinarySearchTree(unsortedArray) {
  function node(data, left, right) {
    return {
      data,
      left,
      right,
    };
  }

  function tree(arrayToBeSorted) {
    const root = buildTree(arrayToBeSorted);

    return root;
  }

  function buildTree(array) {
    const sortedArray = mergeSort(array);

    return splitArray(sortedArray);
  }

  function splitArray(arr) {
    if (arr.length === 1) {
      return arr;
    }
    const leftArr = arr.slice(0, arr.length / 2);

    console.log(leftArr);

    // const middleElement = [arr[Math.floor(arr.length / 2)]];

    // console.log(middleElement);

    // const rightArr = arr.slice(arr.length / 2 + 1, arr.length);

    const rightArr = arr.slice(arr.length / 2, arr.length);

    console.log(rightArr);
  }

  return tree(unsortedArray);
}

// balancedBinarySearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

balancedBinarySearchTree([1, 2, 3]);

//
//
//
// console.log(mergeSort([3, -1, 4, 1, -5, 9, 2, -6, 5, 3, -5]));
console.log(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
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
