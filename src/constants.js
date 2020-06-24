export const TileTypes = {
    unused: 'unused',
    open: 'open',
    wall: 'wall',
    pawn: 'pawn',
    _debug: '_debug',
};

export const TileMap = {
    [TileTypes.unused]: {char: ' ', color: '#000', background: '#000'],
    [TileTypes.open]: {char: ' ', color: '#302a25', background: '#302a25'],
    [TileTypes.wall]: {char: '▒', color: '#333', background: '#543'],
    [TileTypes.pawn]: {char: '🧗', color: '#fff'],
    [TileTypes._debug]: {char: '💀', color: 'rgba(0,255,255,0.5)', background: 'rgba(0,0,0,0.5)'],
};


export const displayArea = {
    width: 120,
    height: 75,

    map: {
        width: 120,
        height: 75,
        x: 0,
        y: 0,
    },
};