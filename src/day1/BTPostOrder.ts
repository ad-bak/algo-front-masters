/**
 * Post-Order Binary Tree Traversal Implementation
 * Traverses a binary tree in post-order (left-right-root) and returns an array of values
 *
 * Example tree:
 *       20
 *      /  \
 *    10    50
 *   /  \   / \
 *  5   15 30 100
 *
 * Post-order traversal: [5, 15, 10, 30, 100, 50, 20]
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height of tree (due to recursion)
 */

/**
 * Recursive helper function to perform post-order traversal
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

    // Step 2: Recursively traverse right subtree
    // Example: if curr is 20, this will process all right children (50, 100) last
    walk(curr.right, path);

    // Step 3: Process current node by adding its value to path
    path.push(curr.value);

    // Return the path containing all processed values
    return path;
}

/**
 * Main function to initiate post-order traversal
 *
 * @param head - Root node of the binary tree
 * @returns Array of values in post-order traversal order
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
 * 3. Go right to 15
 * 4. Process 15 (path = [5, 15])
 * 5. Process root 10 (path = [5, 15, 10])
 */
export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
