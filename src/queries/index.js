import {ecs} from 'src/state';

import {
    Appearance,
    IsBlocking,
    IsInFov,
    IsOpaque,
    IsRevealed,
    MoveTo,
    Position,
    BackgroundLayer,
    TerrainLayer,
    MarkingsLayer,
    ItemsLayer,
    ActorsLayer,
    UILayer,
} from 'src/components';


export const backgroundLayerEntities = ecs.createQuery({
    all: [Appearance, Position, BackgroundLayer],
    any: [IsInFov, IsRevealed],
});

export const terrainLayerEntities = ecs.createQuery({
    all: [Appearance, Position, TerrainLayer],
    any: [IsInFov, IsRevealed],
});

export const markingsLayerEntities = ecs.createQuery({
    all: [Appearance, Position, MarkingsLayer],
    any: [IsInFov, IsRevealed],
});

export const itemsLayerEntities = ecs.createQuery({
    all: [Appearance, Position, ItemsLayer],
    any: [IsInFov, IsRevealed],
});

export const actorsLayerEntities = ecs.createQuery({
    all: [Appearance, Position, ActorsLayer],
    any: [IsInFov, IsRevealed],
});

export const uiLayerEntities = ecs.createQuery({
    all: [Appearance, Position, UILayer],
    any: [IsInFov, IsRevealed],
});


export const blockingEntities = ecs.createQuery({
    all: [IsBlocking, Position],
});

export const inFovEntities = ecs.createQuery({
    all: [IsInFov],
});

export const movableEntities = ecs.createQuery({
    all: [MoveTo, Position],
});

export const opaqueEntities = ecs.createQuery({
    all: [IsOpaque],
});
