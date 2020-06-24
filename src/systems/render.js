import {clearCanvas, drawCell} from 'src/lib/display';
import {
    backgroundLayerEntities,
    terrainLayerEntities,
    markingsLayerEntities,
    itemsLayerEntities,
    actorsLayerEntities,
    uiLayerEntities,
} from 'src/queries';

const drawEntity = (entity) => {
    const {appearance, isInFov, isRevealed} = entity;

    if (isInFov) {
        drawCell(entity);
    }
    else if (isRevealed) {
        drawCell(entity, {fgA: 0.5, bgA: 0.5});
    }
};

export default const render = (interpolation) => {
    clearCanvas();

    backgroundLayerEntities.get().forEach(drawEntity);
    terrainLayerEntities.get().forEach(drawEntity);
    markingsLayerEntities.get().forEach(drawEntity);
    itemsLayerEntities.get().forEach(drawEntity);
    actorsLayerEntities.get().forEach(drawEntity);
    uiLayerEntities.get().forEach(drawEntity);
};
