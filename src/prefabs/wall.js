import {
    Appearance,
    IsBlocking,
    IsOpaque,
    TerrainLayer,
    Position,
} from 'src/components';

import {TileMap} from 'src/constants';

export default {
    name: "WallPrefab",
    components: [
        {
            type: Appearance,
            properties: TileMap.wall,
        },
        {type: IsBlocking},
        {type: IsOpaque},
        {type: TerrainLayer},
        {type: Position},
    ],
};
