/**
 * MinHeap Implementation
 * A min-heap is a binary tree where each node is less than or equal to its children
 * The smallest element is always at the root of the tree
 *
 * Time Complexity: O(log n) for insert and delete
 * Space Complexity: O(n) for storage of elements
 */
export default class MinHeap {
    /**
     * Number of elements in the heap
     */
    public length: number;

    /**
     * Array to store the heap elements
     */
    private data: number[];

    /**
     * Initializes a new MinHeap
     */
    constructor() {
        this.data = []; // Initialize empty array to store heap elements
        this.length = 0; // Initialize length to 0
    }

    /**
     * Inserts a new value into the heap
     * @param value - The value to insert
     */
    insert(value: number): void {
        this.data[this.length] = value; // Add value to the end of the array
        this.heapifyUp(this.length); // Restore heap property
        this.length++; // Increment length
    }

    /**
     * Deletes the minimum value from the heap
     * @returns The minimum value
     */
    delete(): number {
        // If heap is empty, return -1
        if (this.length === 0) {
            // Return -1 to indicate an empty heap
            return -1;
        }

        const out = this.data[0]; // Store the root value
        this.length--; // Decrement length
        if (this.length === 0) {
            this.data = []; // Reset array if empty
            return out;
        }

        this.data[0] = this.data[this.length]; // Move last element to root
        this.heapifyDown(0); // Restore heap property

        return out;
    }

    /**
     * Restores the heap property by moving the element up the tree
     * @param idx - The index of the element to move up
     */
    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return; // If at root, return
        }

        const p = this.parent(idx); // Get parent index
        const parentV = this.data[p]; // Get parent value
        const v = this.data[idx]; // Get current value

        if (parentV > v) {
            this.data[idx] = parentV;
            this.data[p] = v;
            this.heapifyUp(p);
        }
    }

    /**
     * Restores the heap property by moving the element down the tree
     * @param idx - The index of the element to move down
     */
    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx); // Get left child index
        const rIdx = this.rightChild(idx); // Get right child index

        if (idx >= this.length || lIdx >= this.length) {
            return; // If at or beyond the last element, return
        }

        const v = this.data[idx];
        const lV = this.data[lIdx]; // Get left child value
        const rV = this.data[rIdx]; // Get right child value

        if (lV > rV && v > rV) {
            this.data[idx] = rV; // Swap with right child
            this.data[rIdx] = v;
            this.heapifyDown(rIdx);
        } else if (rV > lV && v > lV) {
            this.data[idx] = lV; // Swap with left child
            this.data[lIdx] = v;
            this.heapifyDown(lIdx);
        }
    }

    /**
     * Calculates the index of the parent node
     * @param idx - The index of the current node
     * @returns The index of the parent node
     */
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2); // Calculate parent index
    }

    /**
     * Calculates the index of the left child node
     * @param idx - The index of the current node
     * @returns The index of the left child node
     */
    private leftChild(idx: number): number {
        return 2 * idx + 1; // Calculate left child index
    }

    /**
     * Calculates the index of the right child node
     * @param idx - The index of the current node
     * @returns The index of the right child node
     */
    private rightChild(idx: number): number {
        return 2 * idx + 2; // Calculate right child index
    }
}
