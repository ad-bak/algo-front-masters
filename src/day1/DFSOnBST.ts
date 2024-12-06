/**
 * Depth-First Search (DFS) on Binary Search Tree (BST) Implementation
 * Searches for a specific value in a binary search tree using DFS
 *
 * Example tree:
 *       20
 *      /  \
 *    10    30
 *   /  \     \
 *  5   15    40
 *
 * Searching for 15 would traverse: 20 -> 10 -> 15
 *
 * Time Complexity: O(h) where h is height of the tree
 * Space Complexity: O(h) due to recursion stack
 */

/**
 * Recursive helper function to perform DFS search
 *
 * @param curr - Current node being processed
 * @param needle - Value we're searching for
 * @returns boolean indicating if value was found
 */
function search(curr: BinaryNode<number> | null, needle: number): boolean {
    // Base case 1: If current node is null, value is not found
    // This happens when we've reached a leaf node's child
    if (!curr) {
        return false;
    }

    // Base case 2: If current node's value matches the needle, return true
    // Example: if curr.value is 15 and needle is 15, return true
    if (curr.value === needle) {
        return true;
    }

    // Recursive case 1: If needle is less than current node's value, search left subtree
    // Example: if curr.value is 20 and needle is 10, search left child
    if (needle < curr.value) {
        return search(curr.left, needle);
    }

    // Recursive case 2: If needle is greater than current node's value, search right subtree
    // Example: if curr.value is 20 and needle is 30, search right child
    return search(curr.right, needle);
}

/**
 * Main function to initiate DFS search
 *
 * @param head - Root node of the binary search tree
 * @param needle - Value we're searching for
 * @returns boolean indicating if value was found
 */
export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}

/**
 * Example execution for tree:
 *     20
 *    /  \
 *   10   30
 *
 * Searching for 15:
 * 1. Start at 20, needle < 20, go left
 * 2. At 10, needle > 10, go right
 * 3. At 15, needle == 15, found! Return true
 *
 * Searching for 25:
 * 1. Start at 20, needle > 20, go right
 * 2. At 30, needle < 30, go left (null)
 * 3. Reached null, not found, return false
 */
