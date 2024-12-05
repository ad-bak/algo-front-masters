/**
 * Type definition for a node in our Queue
 * Generic type T allows for queues of any data type
 * Each node contains a value and an optional reference to the next node
 */
type QNode<T> = {
    value: T;
    next?: QNode<T>;
};

/**
 * Queue Implementation (FIFO - First In, First Out)
 * Uses a linked list structure with head and tail pointers
 *
 * @template T - Type of elements stored in the queue
 * Time Complexity:
 * - Enqueue: O(1)
 * - Dequeue: O(1)
 * - Peek: O(1)
 * Space Complexity: O(n) where n is number of elements
 */
export default class Queue<T> {
    public length: number; // Tracks number of elements in queue
    private head?: QNode<T>; // Points to first element (front of queue)
    private tail?: QNode<T>; // Points to last element (back of queue)

    /**
     * Initialize an empty queue
     * Sets head and tail to undefined (empty queue)
     * Sets initial length to 0
     */
    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    /**
     * Adds an element to the back of the queue
     *
     * @param item - Element to be added to queue
     * Time Complexity: O(1)
     *
     * Steps:
     * 1. Create new node
     * 2. If queue is empty, set both head and tail to new node
     * 3. Otherwise, link current tail to new node and update tail
     */
    enqueue(item: T): void {
        // Create new node with the item
        const node = { value: item } as QNode<T>;
        this.length++;

        // If queue is empty, set both head and tail to new node
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        // Link current tail to new node and update tail
        this.tail.next = node;
        this.tail = node;
    }

    /**
     * Removes and returns the element from the front of the queue
     *
     * @returns The first element in queue or undefined if queue is empty
     * Time Complexity: O(1)
     *
     * Steps:
     * 1. If queue is empty, return undefined
     * 2. Store current head
     * 3. Update head to next node
     * 4. Handle case where queue becomes empty
     * 5. Clean up removed node and return its value
     */
    deque(): T | undefined {
        // Return undefined if queue is empty
        if (!this.head) {
            return undefined;
        }

        this.length--;

        // Store the current head node
        const head = this.head;
        // Move head pointer to next node
        this.head = this.head.next;

        // If we just removed the last item, update tail to undefined
        if (this.length === 0) {
            this.tail = undefined;
        }

        // Clean up the removed node's next pointer
        head.next = undefined;

        // Return the value of the removed node
        return head.value;
    }

    /**
     * Returns the element at the front of queue without removing it
     *
     * @returns The first element in queue or undefined if queue is empty
     * Time Complexity: O(1)
     *
     * Uses optional chaining (?.) to safely access head value
     * Returns undefined if head is undefined
     */
    peek(): T | undefined {
        return this.head?.value;
    }
}
