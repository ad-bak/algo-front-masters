/**
 * Breadth-First Search (BFS) Binary Tree Implementation
 * Searches for a specific value in a binary tree using level-order traversal
 *
 * Example tree:
 *       20
 *      /  \
 *    10    50
 *   /  \   / \
 *  5   15 30 100
 *
 * BFS traversal order: [20, 10, 50, 5, 15, 30, 100]
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(w) where w is max width of tree
 */

/**
 * Main function to perform BFS search
 *
 * @param head - Root node of the binary tree
 * @param needle - Value we're searching for
 * @returns boolean indicating if value was found
 */
export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    // Initialize queue with root node
    // Queue will store nodes to be processed in FIFO order
    // Example: if head is 20, queue starts as [20]
    const q: (BinaryNode<number> | null)[] = [head];

    // Continue processing while queue is not empty
    // This ensures we visit all nodes level by level
    while (q.length) {
        // Remove and process the first node in queue
        // Example: if queue is [20, 10, 50], curr becomes 20
        const curr = q.shift() as BinaryNode<number>;

        // Skip null nodes
        // This happens when a node has no left or right child
        if (!curr) {
            continue;
        }

        // Check if current node has the value we're looking for
        // Example: if needle is 50 and curr.value is 50, return true
        if (curr.value === needle) {
            return true;
        }

        // Add left child to queue for later processing
        // Example: if curr is 20, this adds 10 to queue
        q.push(curr.left);

        // Add right child to queue for later processing
        // Example: if curr is 20, this adds 50 to queue
        q.push(curr.right);
    }

    // If we've processed all nodes and haven't found the needle,
    // return false to indicate the value doesn't exist in the tree
    return false;
}

/**
 * Example execution for tree:
 *     20
 *    /  \
 *   10   50
 *
 * Searching for 50:
 * 1. Queue starts as [20]
 * 2. Process 20, not found, add children: queue = [10, 50]
 * 3. Process 10, not found, add children: queue = [50]
 * 4. Process 50, found! Return true
 *
 * Searching for 7:
 * 1. Queue starts as [20]
 * 2. Process all nodes level by level
 * 3. Never find 7, return false
 */
