let pot = [
    [1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1],
];
function loadVisitedMultiDimHASH(grid, visited) {
    grid.map((hall, h) => { visited[h] = {}; hall.map((room, r) => visited[h][r] = false) })
}
function isValidNeighbor(pot, hall, room, visited) {
    const rightBound = pot[0].length - 1;
    const leftBound = 0;
    const bottomBound = pot.length - 1;
    const topBound = 0;
    const isVisited = visited?.[hall]?.[room];
    const isOpen = pot?.[hall]?.[room] === 0;
    const isHallInBounds = (bottomBound >= hall >= topBound);
    const isRoomInBounds = (rightBound >= room >= leftBound);
    return !isVisited && isOpen && isHallInBounds && isRoomInBounds;
}
function canFlowThru(pot) {
    let stack = [];
    let visited = {};
    let waterCanFlowThru;
    loadVisitedMultiDimHASH(pot, visited);

    function addNewNeighborsToStack(pot, hall, room) {
        // let t = pot.map((hall, h) => hall.map((room, r) => room))
        // t[hall][room] = 8
        // console.log(stack,
        //     'addingnbrs', {
        //     t,
        //     pot
        // })
        const neighbors = [[hall - 1, room], [hall + 1, room], [hall, room - 1], [hall, room + 1],];
        for (let nbr = 0; nbr < 4; nbr++) {
            let nbrNode = neighbors[nbr];
            let neighborValidity = isValidNeighbor(pot, nbrNode[0], nbrNode[1], visited)
            if (neighborValidity) { stack.push(nbrNode) }
        };
    }
    function dfsMatrixR(startNode) {
        const [hall, room] = startNode;
        console.log({
            stack,
            hall,
            room,
            // visited
        });
        if (hall === 0) {
            waterCanFlowThru = true;
            console.log({ 'returningtrue': { waterCanFlowThru } });
            return;
        }

        addNewNeighborsToStack(pot, startNode[0], startNode[1]);

        if (stack.length === 0) {
            waterCanFlowThru = false;
            console.log({ 'returningfalsee': { waterCanFlowThru } });
            return;
        } else {
            visited[hall][room] = true;
            startNode = stack[stack.length - 1];
            stack.pop();
            dfsMatrixR(startNode)
        }



        // work backwordfrombottom row
        // addtostack
        // set curr to stack.length-1 
        // pop curr from stack
        // add curr to visited
        // check for valid neighbors( in bounds, open path, visited previously)
        // teminatingocndiftion(stack is empty dont start next loop, if curr is top of pot stop & set canPassThru true ))
        // recurse calling dfsM(stack.length-1)
        // return canPassTHrough = true||false

        // terminating conditions ===true 
        // ? exit 
        // : recurse(stack.lastnode)
        //  recurse==
        // --- add startNode to visited,
        // --- add valid startNode.neighbors to stack,
        // --- setStartNode to stack.last, 
        // --- pop stack.last,


    }
    const bottomRowNode = [4, 1];
    stack.push(bottomRowNode)
    dfsMatrixR(bottomRowNode);
    console.log({ waterCanFlowThru })
    return waterCanFlowThru;
}


canFlowThru(pot)



