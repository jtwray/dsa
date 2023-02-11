const pot1 =
    [[0, 1, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0]]

const pot2 =
    [[0, 1, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0]]

const pot3 =
    [[0, 1, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0]]

function isPathThruForH2O(pot) {
    const visited = {};

    let curr = { x: 0, y: 0 };
    let isOpenPath = pot[curr.x][curr.y] === 0;
    let waterHeight = curr.y;

    const last = { col: pot[0].length, row: pot.length }
    const allCellsLen = last[col] * last[row];

    let goLt = { x: -1, y: 0 };
    let goRt = { x: +1, y: 0 };
    let goUp = { x: 0, y: -1 };
    let goDn = { x: 0, y: +1 };
    let directions = [goLt, goRt, goUp, goDn];

    function takeStep(dir) { return ({ x: curr.x += dir.x, y: curr.y += dir.y }); }

    if (isOpenPath && waterHeight === last[row]) {
        return true;
    }
    function loadQ(q) { directions.map(d => q.push(takeStep(directions[d]))) }
    while (curr.x < last[col] && curr.y < last[row]) {

        curr = dfs(takeStep())
    }

    let adj = {};
    adj[pos] = [doors]
    function dfs(pos) {
        visited[pos] = true;
        console.log("visiting", pos);
        for (let i = 0; i < adj[pos].length; i++) {
            if (!visited[adj[pos][i]]) {
                dfs(adj[pos][i])
            }
        }
    }

}



function checkWaterPath(pot) {
    let waterReachesBottom = false;
    let visited = {};
    let unvisitedRooms = [];
    let adj = loadAdjList(pot);
    console.log({ adj })
    dfs([[0][0]], pot, visited, unvisitedRooms, adj)
    return waterReachesBottom;
}

function loadAdjList(map) {
    let adj = [[]];
    for (let hall = 0; hall < map.length; hall++) {
        adj[hall] = [];
        for (let room = 0; room < map[0].length; room++) {
            adj[hall][room] = [];
            let d, l, r, u;
            let borders = {
                l: 0,
                r: map[0].length - 1,
                u: 0,
                d: map.length - 1
            }
            d = hall < borders.d ? [hall + 1, room] : [hall, room];
            u = hall > borders.u ? [hall - 1, room] : [hall, room];
            r = room < borders.r ? [hall, room + 1] : [hall, room];
            l = room > borders.l ? [hall, room - 1] : [hall, room];
            let doors = [d, l, r, u];
            let unlockedDoors = doors.filter(
                (door) => map[door[0]][door[1]] === 0);
            adj[hall][room] = unlockedDoors;
        }
    }
    return adj;
}

function dfs(startingNode, grid, visited, q, adj) {
    q.push(startingNode);
    while (q.length > 0) {
        let [hall, room] = q[q.length - 1];
        q.pop();
        if (visited[hall][room]) continue;
        if (hall === grid[0].length - 1) {
            waterReachesBottom = true;
            break;
        }
        // let newDoorsToExplore = unlockedDoors(adjDoors(map, hall, room));
        let newDoorsToExplore = adj[hall][room];
        q.push(...newDoorsToExplore);
        visited[hall][room] = true;
    }
}

const adjDoors = (map, hall, room) => {
    let d, l, r, u;
    let borders = {
        l: 0,
        r: map[0].length - 1,
        u: 0,
        d: map.length - 1
    }
    return [
        d = hall < borders.d ? [hall + 1, room] : [hall, room],
        u = hall > borders.u ? [hall - 1, room] : [hall, room],
        r = room < borders.r ? [hall, room + 1] : [hall, room],
        l = room > borders.l ? [hall, room - 1] : [hall, room]
    ]
}

// const unlockedDoors = (map, hall, room) => {
//     let borders = {
//         d: map.length - 1,
//         l: 0,
//         r: map[0].length - 1,
//         u: 0,
//     }
//     return [
//         d = hall < borders.d ? [hall + 1, room] : [hall, room],
//         l = room > borders.l ? [hall, room - 1] : [hall, room],
//         r = room < borders.r ? [hall, room + 1] : [hall, room],
//         u = hall > borders.u ? [hall - 1, room] : [hall, room],
//     ].filter(([hallNumber, doorNumber]) => map[hallNumber][doorNumber] === 0);
// }
const unlockedDoors = adjDoors =>
    adjDoors.filter(([hallNumber, doorNumber]) => map[hallNumber][doorNumber] === 0);
