import {
    Animation,
    Appearance,
    IsBlocking,
    IsOpaque,
    Position,
    TerrainLayer,
} from 'src/components';


export const WheelPrefab = {
    name: 'WheellPrefab',
    components: [
        {
            type: Appearance,
            properties: {char: '◯', color: '#302a25', background: '#302a25'},
        },
        {type: IsBlocking},
        {type: IsOpaque},
        {type: TerrainLayer},
        {type: Position},
        {
            type: Animation,
            frames: [
                {char: '◐'},
                {char: '◓'},
                {char: '◑'},
                {char: '◒'},
            ],
            fps: 4,
            step: 1,
        },
    ],
};
