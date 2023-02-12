
function dfsMatrix(
    finishNode,
    map,
    startNode,
    visited = map.map(hall => hall.map(room => room = false)),
    stack = [],
) {

}
function isValid(
    currRoom,
    map,
    visited,
    boundaries
) {

}
function waterPlants(pot) {
    let potNodesLength = 0;
    pot.map(hall => hall.map(room => potNodesLength++));

    dfsMatrix(pot[0][0], pot,)

}



// dfs with traverse ever node going deep before wide using a stack
// a more performant version could save time and stack space by returning early if the current node is within the bottom row
// a basic approach would be to dfs all nodes and return  a list for each open path of 0's
// or return back the entire traversal path and then loop through the traversal path once looking for a node with the bottom row

//steps

// implement dfs 
// traverse the graph 
// return traversal path
// check it for a node with row = graph.length-1
// return true if found else return false





