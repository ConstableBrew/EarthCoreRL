import {
    Appearance,
    IsBlocking,
    IsOpaque,
    ActorLayer,
    Position,
} from 'src/components';

import {TileMap} from 'src/constants';

export default {
    name: "PlayerPawnPrefab",
    components: [
        {
            type: Appearance,
            properties: TileMap.pawn,
        },
        {type: IsBlocking},
        {type: IsOpaque},
        {type: ActorLayer},
        {type: Position},
    ],
};
