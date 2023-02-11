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
    dfs([[0][0]], pot, visited, unvisitedRooms)
    return waterReachesBottom;
}

function loadAdjList(pot) {
    let adj = {};
    for (let hall; hall < pot.length; hall++) {
        for (let room; room < pot[0].length; room++) {
            let d, l, r, u;
            function checkBoundary(map, hall, room) {
                return map[hall, room];
            }
            d = [map[hall + 1, room] ?? [hall, room]];
            u = [map[hall - 1, room] ?? [hall, room]];
            r = [map[hall, room + 1] ?? [hall, room]];
            l = [map[hall, room - 1] ?? [hall, room]];
            let doors = [d, l, r, u];
            let unlockedDoors = doors.filter((door) => pot[door[0]][door[1]] === 0);
            adj[hall][room] = unlockedDoors;
        }
    }
    return adj;
}

function dfs(startingNode, grid, visited, q) {
    q.push(startingNode);
    while (q.length > 0) {
        let [hall, room] = q[q.length - 1];
        q.pop();
        if (visited[hall][room]) {
            continue;
        }
        if (hall === grid[0].length - 1) {
            waterReachesBottom = true;
            break;
        }
        let newDoorsToExplore = unlockedDoors(map, hall, room);
        q.push(...newDoorsToExplore);
        visited[hall][room] = true;
    }
}

const adjDoors = (map, hall, room) => [
    [map[hall - 1, room] ?? [hall, room]],
    [map[hall, room - 1] ?? [hall, room]],
    [map[hall, room + 1] ?? [hall, room]],
    [map[hall + 1, room] ?? [hall, room]],
]

let [d, l, r, u] = (map, hall, room) => [
    [map[hall - 1, room] ?? [hall, room]],
    [map[hall, room - 1] ?? [hall, room]],
    [map[hall, room + 1] ?? [hall, room]],
    [map[hall + 1, room] ?? [hall, room]],
]
const unlockedDoors = (map, hall, room) => {
    let d = [map[hall - 1, room] ?? [hall, room]];
    let l = [map[hall, room - 1] ?? [hall, room]];
    let r = [map[hall, room + 1] ?? [hall, room]];
    let u = [map[hall + 1, room] ?? [hall, room]];
    return [
        d,
        l,
        r,
        u,
    ].filter(([hallNumber, doorNumber]) => map[hallNumber][doorNumber] === 0);
}