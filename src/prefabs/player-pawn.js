import {
    Appearance,
    IsBlocking,
    IsOpaque,
    ActorsLayer,
    Position,
} from 'src/components';

import {TileMap} from 'src/constants';

export const PlayerPawnPrefab = {
    name: 'PlayerPawnPrefab',
    components: [
        {
            type: Appearance,
            properties: TileMap.pawn,
        },
        {type: IsBlocking},
        {type: IsOpaque},
        {type: ActorsLayer},
        {type: Position},
    ],
};
