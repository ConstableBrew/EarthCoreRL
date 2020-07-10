export const TileTypes = {
    unused: 'unused',
    open: 'open',
    wall: 'wall',
    pawn: 'pawn',
    _debug: '_debug',
};

export const TileMap = {
    [TileTypes.unused]: {char: ' ', color: '#000', background: '#000'},
    [TileTypes.open]: {char: ' ', color: '#302a25', background: '#302a25'},
    [TileTypes.wall]: {char: '▒', color: '#333', background: '#543'},
    [TileTypes.pawn]: {char: '🧗', color: '#fff'},
    [TileTypes._debug]: {char: '💀', color: 'rgba(0,255,255,0.5)', background: 'rgba(0,0,0,0.5)'},
};


export const Layout = {
    // Target screen size 1920x1080, 16:9, 17x16.875
    // Total canvas grid size
    width: 113,
    height: 64,
    map: {
        x1: 0,
        y1: 10,
        x2: 82,
        y2: 63,
        width: 83,
        height: 54,
    },
    hud: {
        x1: 0,
        y1: 0,
        x2: 82,
        y2: 9,
        width: 83,
        height: 10,
    },
    log: {
        x1: 83,
        y1: 0,
        x2: 112,
        y2: 63,
        width: 30,
        height: 64,
    },
};