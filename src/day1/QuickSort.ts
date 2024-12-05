/**
 * QuickSort Implementation
 * A divide-and-conquer sorting algorithm that uses a pivot element
 * to partition the array into smaller sub-arrays.
 *
 * Time Complexity:
 * - Average: O(n log n)
 * - Worst: O(n²) when array is already sorted
 * Space Complexity: O(log n) due to recursion
 */

/**
 * Recursive QuickSort helper function
 * @param arr - Array to sort
 * @param lo - Lower bound of current partition
 * @param hi - Upper bound of current partition
 *
 * Example: For array [9,3,7,4,69,420,42]
 * First call would be: qs(arr, 0, 6)
 */
function qs(arr: number[], lo: number, hi: number): void {
    // Base case: if partition size is 1 or less, it's sorted
    if (lo >= hi) return;

    // Get pivot index and partition array around it
    // Example: might return 3, meaning everything before index 3 is smaller
    const pivotIdx = partition(arr, lo, hi);

    // Recursively sort left and right partitions
    // Left side: elements smaller than pivot
    // Right side: elements larger than pivot
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

/**
 * Partitions array section between lo and hi
 * Uses last element as pivot and arranges elements around it
 *
 * Example: [9,3,7,4,69,420,42] with lo=0, hi=6
 * Pivot = 42
 * After partition: [9,3,7,4,42,420,69]
 * Returns: position of 42
 */
function partition(arr: number[], lo: number, hi: number): number {
    // Choose last element as pivot
    const pivot = arr[hi];

    // Index for tracking smaller element position
    let idx = lo - 1;

    // Iterate through partition range
    for (let i = lo; i < hi; i++) {
        // If current element is smaller than pivot
        if (arr[i] <= pivot) {
            idx++; // Move smaller elements index

            // Swap current element with element at smaller elements index
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    // Place pivot in its final position
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx; // Return pivot's final position
}

/**
 * Main QuickSort function
 * Initializes the recursive sorting process
 *
 * Example usage:
 * const arr = [9, 3, 7, 4, 69, 420, 42];
 * quick_sort(arr);
 * console.log(arr); // [3, 4, 7, 9, 42, 69, 420]
 */
export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
