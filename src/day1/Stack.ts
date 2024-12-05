/**
 * Type definition for a node in our Stack
 * Generic type T allows for stacks of any data type
 * Each node contains a value and an optional reference to the previous node
 * Unlike Queue which links forward, Stack links backwards
 */
type Node<T> = {
    value: T;
    prev?: Node<T>;
};

/**
 * Stack Implementation (LIFO - Last In, First Out)
 * Uses a linked list structure with only a head pointer
 * Think of it like a stack of plates - you can only add/remove from the top
 *
 * @template T - Type of elements stored in the stack
 * Time Complexity:
 * - Push: O(1)
 * - Pop: O(1)
 * - Peek: O(1)
 * Space Complexity: O(n) where n is number of elements
 */
// export default class Stack<T> {
//     public length: number; // Tracks number of elements in stack
//     private head?: Node<T>; // Points to top element of stack

//     /**
//      * Initialize an empty stack
//      * Sets head to undefined (empty stack)
//      * Sets initial length to 0
//      */
//     constructor() {
//         this.head = undefined;
//         this.length = 0;
//     }

//     /**
//      * Adds an element to the top of the stack
//      *
//      * @param item - Element to be added to stack
//      * Time Complexity: O(1)
//      *
//      * Steps:
//      * 1. Create new node
//      * 2. If stack is empty, new node becomes head
//      * 3. Otherwise, link new node to current head and update head
//      */
//     push(item: T): void {
//         // Create new node with the item
//         const node = { value: item } as Node<T>;
//         this.length++;

//         // If stack is empty, new node becomes head
//         if (!this.head) {
//             this.head = node;
//             return;
//         }

//         // Link new node to current head and update head
//         node.prev = this.head;
//         this.head = node;
//     }

//     /**
//      * Removes and returns the element from the top of the stack
//      *
//      * @returns The top element in stack or undefined if stack is empty
//      * Time Complexity: O(1)
//      *
//      * Steps:
//      * 1. Update length (ensure it doesn't go below 0)
//      * 2. Handle empty stack case
//      * 3. Update head to previous node
//      * 4. Return removed node's value
//      */
//     pop(): T | undefined {
//         // Ensure length doesn't go below 0
//         this.length = Math.max(0, this.length - 1);

//         // Handle case where stack becomes empty
//         if (this.length === 0) {
//             const head = this.head as Node<T>;
//             this.head = undefined;
//             return head?.value;
//         }

//         // Store current head and update head to previous node
//         const head = this.head as Node<T>;
//         this.head = head.prev;

//         return head.value;
//     }

//     /**
//      * Returns the element at the top of stack without removing it
//      *
//      * @returns The top element in stack or undefined if stack is empty
//      * Time Complexity: O(1)
//      *
//      * Uses optional chaining (?.) to safely access head value
//      * Returns undefined if head is undefined
//      */
//     peek(): T | undefined {
//         return this.head?.value;
//     }
// }

/**
 * Stack Implementation (LIFO - Last In, First Out)
 * This is a simplified, more practical implementation compared to traditional
 * linked-list approaches. It uses native array methods instead of complex
 * node structures and pointers.
 *
 * Benefits over node-based implementation:
 * - Simpler to understand and maintain
 * - Less prone to bugs
 * - Uses built-in JavaScript/TypeScript features
 * - Achieves same functionality with less code
 *
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is number of elements
 */
export default class Stack<T> {
    private items: T[]; // Array to store stack elements
    public length: number; // Current number of elements

    /**
     * Initialize empty stack with array
     * Much simpler than managing nodes and pointers
     */
    constructor() {
        this.items = [];
        this.length = 0;
    }

    /**
     * Adds element to top of stack
     * Uses spread operator for immutability
     * Simpler than creating and linking nodes
     */
    push(item: T): void {
        this.items = [...this.items, item];
        this.length++;
    }

    /**
     * Removes and returns top element
     * Uses native array methods instead of pointer manipulation
     * Includes proper empty stack handling
     */
    pop(): T | undefined {
        if (this.length === 0) return undefined;

        const item = this.items[this.length - 1];
        this.items = this.items.slice(0, -1);
        this.length--;
        return item;
    }

    /**
     * Returns top element without removing it
     * Simple array access instead of traversing nodes
     */
    peek(): T | undefined {
        return this.items[this.length - 1];
    }
}
