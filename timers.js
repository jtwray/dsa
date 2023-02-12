
function timeMethodPerf(cb, timesToRun = 1, nameThisTest = null) {
    console.time(nameThisTest);
    for (let i = 0; i < timesToRun; i++) { cb }
    console.timeEnd(nameThisTest);
};

// function runTest(fn, n = 1) {
//     console.time("Test");
//     for (let i = 0; i < n; i++) {
//         fn();
//     }
//     console.timeEnd("Test");
// }
// // we can pass the function and number of iteration . 
// For comparing two functions

// function compareFunction(fn1, fn2, n = 1) {
//     console.time("Fn1");
//     for (let i = 0; i < n; i++) {
//         fn1();
//     }
//     console.timeEnd("Fn1");
//     console.time("Fn2");
//     for (let i = 0; i < n; i++) {
//         fn2();
//     }
//     console.timeEnd("Fn2");
// }
// // we c