/**
 * Pre-Order Binary Tree Traversal Implementation
 * Traverses a binary tree in pre-order (root-left-right) and returns an array of values
 *
 * Example tree:
 *       20
 *      /  \
 *    10    50
 *   /  \   / \
 *  5   15 30 100
 *
 * Pre-order traversal: [20, 10, 5, 15, 50, 30, 100]
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height of tree (due to recursion)
 */

/**
 * Recursive helper function to perform pre-order traversal
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

    // Step 1: Process current node by adding its value to path
    path.push(curr.value);

    // Step 2: Recursively traverse left subtree
    walk(curr.left, path);

    // Step 3: Recursively traverse right subtree
    walk(curr.right, path);

    // Return the path containing all processed values
    return path;
}

/**
 * Main function to initiate pre-order traversal
 *
 * @param head - Root node of the binary tree
 * @returns Array of values in pre-order traversal order
 *
 * Example:
 * Let's pretend our tree is:
 *     10
 *    /  \
 *   5    15
 *
 * The traversal would go:
 * 1. Process 10 (path = [10])
 * 2. Go left to 5
 * 3. Process 5 (path = [10, 5])
 * 4. Go right to 15
 * 5. Process 15 (path = [10, 5, 15])
 */
export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
