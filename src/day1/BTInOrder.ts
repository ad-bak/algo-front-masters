/**
 * In-Order Binary Tree Traversal Implementation
 * Traverses a binary tree in-order (left-root-right) and returns an array of values
 *
 * Example tree:
 *       20
 *      /  \
 *    10    50
 *   /  \   / \
 *  5   15 30 100
 *
 * In-order traversal: [5, 10, 15, 20, 30, 50, 100]
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height of tree (due to recursion)
 */

/**
 * Recursive helper function to perform in-order traversal
 *
 * @param curr - Current node being processed
 * @param path - Array collecting the traversal path
 * @returns Array containing traversal path
 */
function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // Base case: if current node is null, return current path
    // This happens when we've reached a leaf node's child
    if (!curr) {
        return path;
    }

    // Step 1: Recursively traverse left subtree
    // Example: if curr is 20, this will process all left children (10, 5) first
    walk(curr.left, path);

    // Step 2: Process current node by adding its value to path
    path.push(curr.value);

    // Step 3: Recursively traverse right subtree
    // Example: if curr is 20, this will process all right children (50, 100) last
    walk(curr.right, path);

    // Return the path containing all processed values
    return path;
}

/**
 * Main function to initiate in-order traversal
 *
 * @param head - Root node of the binary tree
 * @returns Array of values in in-order traversal order
 *
 * Example:
 * Let's pretend our tree is:
 *     10
 *    /  \
 *   5    15
 *
 * The traversal would go:
 * 1. Go left to 5
 * 2. Process 5 (path = [5])
 * 3. Return to and process 10 (path = [5, 10])
 * 4. Go right to 15
 * 5. Process 15 (path = [5, 10, 15])
 */
export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
