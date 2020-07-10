import {cache, ecs} from 'src/state/ecs';
import {Layout} from 'src/constants';
import {idToCell, isPointOnRectEdge, rectangle} from 'src/lib/grid';

export function initCaverns() {
    const cavern = rectangle(Layout.map);

    cavern.forEach((locId) => {
        const position = idToCell(locId);
        if (isPointOnRectEdge(position)) {
            const entity = ecs.createPrefab('WallPrefab', {position});
            cache.addSet('map', locId, entity.id);
        }
    });
}
