export default function linear_search(
    haystack: number[],
    needle: number,
): boolean {
    // for (let i = 0; i < haystack.length; ++i) {
    //     if (haystack[i] === needle) {
    //         return true;
    //     }
    // }
    // return false;
    //
    // best one
    return haystack.includes(needle);
    // return haystack.some((item) => item === needle);
    // return haystack.indexOf(needle) !== -1;
    // return haystack.findIndex((item) => item === needle) !== -1;
    // return haystack.find((item) => item === needle) !== undefined;
    // return haystack.some((item) => item === needle);

    // worst
    // return haystack.filter((item) => item === needle).length > 0;
}
