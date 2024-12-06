/**
 * LRU (Least Recently Used) Cache Implementation
 * Maintains a fixed-size cache that evicts least recently used items
 *
 * Example usage:
 * const cache = new LRU<string, number>(3);
 * cache.update("a", 1); // Cache: [a:1]
 * cache.update("b", 2); // Cache: [b:2, a:1]
 * cache.get("a");       // Cache: [a:1, b:2]
 *
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is the capacity
 */

/**
 * Node type for doubly-linked list implementation
 */
type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

/**
 * Creates a new node with given key and value
 */
function createNode<K, V>(key: K, value: V): Node<V> {
    return { value };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>; // Most recently used
    private tail?: Node<V>; // Least recently used

    // Maps keys to nodes for O(1) lookup
    private lookup: Map<K, Node<V>>;
    // Maps nodes back to keys for O(1) key lookup during eviction
    private reverseLookup: Map<Node<V>, K>;

    constructor(private readonly capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    /**
     * Updates or inserts a key-value pair
     * Moves updated items to front (most recently used)
     */
    update(key: K, value: V): void {
        let node = this.lookup.get(key);
        if (!node) {
            // Create new node if key doesn't exist
            node = createNode(key, value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            // Update both lookups
            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // Move existing node to front
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }

    /**
     * Retrieves value for key and marks as recently used
     * Returns undefined if key doesn't exist
     */
    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        // Move to front (mark as recently used)
        this.detach(node);
        this.prepend(node);

        return node.value;
    }

    /**
     * Removes a node from the linked list
     * Handles all edge cases (head, tail, middle, single node)
     */
    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.length === 1) {
            this.tail = this.head = undefined;
        }

        if (this.head === node) {
            this.head = node.next;
        }

        if (this.tail === node) {
            this.tail = node.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    /**
     * Adds a node to the front of the list
     * Handles empty list case
     */
    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    /**
     * Removes least recently used item when cache exceeds capacity
     * Updates both lookups accordingly
     */
    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node<V>;
        this.detach(this.tail as Node<V>);

        // Remove from both lookups
        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}
