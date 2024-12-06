/**
 * Binary Tree Comparison Implementation
 * Compares two binary trees to check if they are structurally identical
 * and have the same values in corresponding nodes
 *
 * Example trees that are equal:
 *     10           10
 *    /  \         /  \
 *   5    15      5    15
 *
 * Example trees that are not equal:
 *     10           10
 *    /  \         /  \
 *   5    15      5    20
 *
 * Time Complexity: O(min(n1,n2)) where n1, n2 are number of nodes in each tree
 * Space Complexity: O(h) where h is height of the smaller tree (due to recursion)
 */

/**
 * Recursively compares two binary trees
 *
 * @param a - Root node of first tree
 * @param b - Root node of second tree
 * @returns boolean indicating if trees are identical
 */
export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // Base case 1: If both nodes are null, trees are equal at this point
    // Example: comparing two leaf nodes' null children
    if (a === null && b === null) {
        return true;
    }

    // Base case 2: If only one node is null, trees are not equal
    // Example: one tree has a node where the other has null
    if (a === null || b === null) {
        return false;
    }

    // Base case 3: If values don't match, trees are not equal
    // Example: comparing node with value 10 to node with value 15
    if (a.value !== b.value) {
        return false;
    }

    // Recursive case: Trees are equal if:
    // 1. Current nodes are equal (checked above)
    // 2. Left subtrees are equal
    // 3. Right subtrees are equal
    return compare(a.left, b.left) && compare(a.right, b.right);
}

/**
 * Example execution:
 * Tree1:     Tree2:
 *   10         10
 *  /  \       /  \
 * 5    15    5    15
 *
 * 1. compare(10, 10) -> values match, check children
 * 2. compare(5, 5) -> values match, check children (both null) -> true
 * 3. compare(15, 15) -> values match, check children (both null) -> true
 * 4. Final result: true (trees are identical)
 */
