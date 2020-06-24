import {IsInFov, IsRevealed} from 'src/components';
import {inFovEntities, opaqueEntities} from 'src/queries';
import {displayArea} from 'src/constants';

export default const fov = () => {
    const {width, height} = displayArea;

    const originX = width >> 1;
    const originY = height >> 1;


    // clear out stale fov
    inFovEntities.get().forEach((entity) => entity.remove(IsInFov));

    // todo: real fov
    opaqueEntities.get().forEach((entity) => {
        entity.add(IsRevealed));
        // add isinfov if distance < 10 from origin
        //.......
    });
};