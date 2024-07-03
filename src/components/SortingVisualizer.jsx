import React, { useState, useEffect } from 'react';
import { generateArray, bubbleSort, insertionSort, selectionSort, linearSearch, binarySearch } from '../utils/algorithms';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [isSorting, setIsSorting] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;  // Prevent resetting while sorting
    const newArray = generateArray(50, 10, 500);
    setArray(newArray);
  };

  const handleSort = async () => {
    if (isSorting) return;  // Prevent starting another sort while already sorting
    setIsSorting(true);
    let animations = [];
    switch (algorithm) {
      case 'Bubble Sort':
        animations = bubbleSort(array);
        break;
      case 'Insertion Sort':
        animations = insertionSort(array);
        break;
      case 'Selection Sort':
        animations = selectionSort(array);
        break;
      default:
        break;
    }
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [barIdx, newHeight] = animations[i];
        setArray(prevArray => {
          const newArray = prevArray.slice();
          newArray[barIdx] = newHeight;
          return newArray;
        });
      }, i * 50);
    }
    setTimeout(() => setIsSorting(false), animations.length * 50);
  };

  const handleSearch = async () => {
    if (isSorting || target === null) return;
    setIsSorting(true);
    let animations = [];
    switch (algorithm) {
      case 'Linear Search':
        animations = linearSearch(array, target);
        break;
      case 'Binary Search':
        animations = binarySearch(array, target);
        break;
      default:
        break;
    }
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [barIdx, value, isFound] = animations[i];
        const color = isFound ? 'bg-green-500' : 'bg-red-500';
        document.getElementById(`bar-${barIdx}`).className = color;
      }, i * 100);
    }
    setTimeout(() => setIsSorting(false), animations.length * 100);
  };

  return (
    <div className="w-full ">
      <div className="flex justify-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={resetArray}
          disabled={isSorting}
        >
          Generate New Array
        </button>
        <select
          className="px-4 py-2 bg-white border rounded mr-2"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
        >
          <option>Bubble Sort</option>
          <option>Insertion Sort</option>
          <option>Selection Sort</option>
          <option>Linear Search</option>
          <option>Binary Search</option>
        </select>
        {algorithm.includes('Search') && (
          <input
            type="number"
            className="px-4 py-2 bg-white border rounded mr-2"
            value={target || ''}
            onChange={(e) => setTarget(Number(e.target.value))}
            placeholder="Target Value"
            disabled={isSorting}
          />
        )}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={algorithm.includes('Search') ? handleSearch : handleSort}
          disabled={isSorting}
        >
          {algorithm.includes('Search') ? 'Search' : 'Sort'} Array
        </button>
      </div>
      <div className="flex justify-center">
        {array.map((value, idx) => (
          <div
            key={idx}
            id={`bar-${idx}`}
            className="bg-blue-500"
            style={{
              height: `${value}px`,
              width: '10px',
              margin: '0 2px',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
