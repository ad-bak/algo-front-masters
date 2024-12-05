/**
 * Bubble Sort Implementation
 * Sorts an array in ascending order by repeatedly stepping through the array,
 * comparing adjacent elements and swapping them if they are in the wrong order.
 *
 * @param arr - The array of numbers to be sorted
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export default function bubble_sort(arr: number[]): void {
    // Outer loop: represents how many elements have been "bubbled up" to their final position
    // i represents the number of elements that are already sorted at the end
    // After each iteration, the largest unsorted element "bubbles up" to its correct position
    for (let i = 0; i < arr.length; i++) {
        // Inner loop: compares adjacent elements and swaps them if needed
        // We subtract i because after each iteration, the last i elements are already sorted
        // We subtract 1 from length because we're comparing j with j+1 (prevents out-of-bounds)
        // Example: if array length is 5 and i is 2, we only need to check first 2 elements
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // Compare current element with next element
            // If current element is greater, they are in wrong order and need to be swapped
            if (arr[j] > arr[j + 1]) {
                // Perform swap using temporary variable
                // Store current element in tmp before we overwrite it
                const tmp = arr[j];
                // Move the smaller element (arr[j + 1]) to current position
                arr[j] = arr[j + 1];
                // Place the larger element (stored in tmp) in the next position
                arr[j + 1] = tmp;
            }
            // After this iteration, the larger element has "bubbled up" one position
        }
        // After this iteration, the largest unsorted element has "bubbled up" to its final position
        // The last i elements of the array are now guaranteed to be sorted
    }
    // When the outer loop completes, all elements have bubbled up to their correct positions
    // The array is now fully sorted in ascending order
}

/**
 * Functional Bubble Sort Implementation
 * Uses modern Array methods and immutable approach
 *
 * @param arr - The input array to be sorted
 * @returns A new sorted array, leaving the original unchanged
 * Time Complexity: O(n²)
 * Space Complexity: O(n) due to array copy
 */
export const functionalBubbleSort = (arr: number[]): number[] => {
    // Create a shallow copy of the input array to maintain immutability
    // This ensures we don't modify the original array
    const sortedArr = [...arr];

    // Create an array of undefined elements with length equal to input array
    // We don't care about the elements, just need the iteration count
    Array.from({ length: sortedArr.length }).forEach((_, i) => {
        // For each pass, create another array for the inner loop
        // The length decreases by i each time as the last i elements are sorted
        // We subtract 1 to avoid comparing with undefined (array bounds)
        Array.from({ length: sortedArr.length - i - 1 }).forEach((_, j) => {
            // Compare adjacent elements
            if (sortedArr[j] > sortedArr[j + 1]) {
                // Modern array destructuring for swap
                // This is cleaner than using a temporary variable
                [sortedArr[j], sortedArr[j + 1]] = [
                    sortedArr[j + 1], // Move smaller element left
                    sortedArr[j], // Move larger element right
                ];
            }
        });
    });

    // Return the new sorted array
    return sortedArr;
};

/**
 * One-liner Bubble Sort Implementation (NOT recommended for production!)
 * A complex, hard-to-read but technically functional implementation
 *
 * @param arr - Input array to be sorted
 * @returns New sorted array
 * Time Complexity: O(n²)
 * Space Complexity: O(n)
 */
export const oneLineBubbleSort = (arr: number[]): number[] =>
    // Create array of length arr.length filled with undefined values and spread it
    // Example: if arr.length is 3, [...Array(3)] creates [undefined, undefined, undefined]
    [...Array(arr.length)].reduce(
        (acc) =>
            // acc is our accumulator (the array we're sorting)
            // For each iteration, we map over the entire array
            acc.map((_: unknown, i: number, a: number[]) =>
                // For each element:
                // _ : current element (unused)
                // i : current index
                // a : the entire array

                // Compare current element (a[i]) with next element (a[i + 1])
                a[i + 1] < a[i]
                    ? // If next is smaller than current:
                      // Perform swap using destructuring
                      // [a, b] = [b, a] swaps values of a and b
                      // The parentheses are needed to return the first value
                      ([a[i], a[i + 1]] = [a[i + 1], a[i]])
                    : // If no swap needed, keep current element
                      a[i],
            ) &&
            // && acc returns the accumulator for the next iteration
            // This is necessary because map returns a new array, but we want to keep working
            // with our modified array
            acc,
        // Initial value is a copy of input array
        // [...arr] creates a new array with same elements
        [...arr],
    );
