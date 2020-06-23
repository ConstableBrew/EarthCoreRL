export const TileTypes = {
    unused: 0,
    open: 1,
    wall: 2,
    _debug: -1,
};

export const TileMap = {
    [TileTypes.unused]: [' ', '#000', '#000'],
    [TileTypes.open]: [' ', '#302a25', '#302a25'],
    [TileTypes.wall]: ['▒', '#333', '#543'],
    [TileTypes._debug]: ['💀', 'rgba(0,255,255,0.5)', 'rgba(0,0,0,0.5)'],
};
