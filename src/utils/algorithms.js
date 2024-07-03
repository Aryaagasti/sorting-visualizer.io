export const generateArray = (size, min, max) => {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    return array;
  };
  
  export const bubbleSort = (array) => {
    const animations = [];
    const arr = array.slice();
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          animations.push([j, arr[j + 1]]);
          animations.push([j + 1, arr[j]]);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return animations;
  };
  
  export const insertionSort = (array) => {
    const animations = [];
    const arr = array.slice();
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        animations.push([j + 1, arr[j]]);
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      animations.push([j + 1, key]);
      arr[j + 1] = key;
    }
    return animations;
  };
  
  export const selectionSort = (array) => {
    const animations = [];
    const arr = array.slice();
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        animations.push([i, arr[minIdx]]);
        animations.push([minIdx, arr[i]]);
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      }
    }
    return animations;
  };

  // Linear Search
export const linearSearch = (array, target) => {
    const animations = [];
    for (let i = 0; i < array.length; i++) {
      animations.push([i, array[i], array[i] === target]);
    }
    return animations;
  };

  // Binary Search
export const binarySearch = (array, target) => {
    const animations = [];
    let low = 0;
    let high = array.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      animations.push([mid, array[mid]]);
      if (array[mid] === target) {
        animations.push([mid, array[mid], true]);
        break;
      } else if (array[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return animations;
  };


  