import type { Door, Wall, Window as Win } from '$lib/models/types';

export interface RenderOpening<T extends Door | Win> {
  opening: T;
  position: number;
  width: number;
  sourceWallId: string;
  projected: boolean;
}

interface StraightWallInfo {
  len: number;
  ux: number;
  uy: number;
}

function straightWallInfo(wall: Wall): StraightWallInfo | null {
  if (wall.curvePoint) return null;
  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  const len = Math.hypot(dx, dy);
  if (len < 1) return null;
  return { len, ux: dx / len, uy: dy / len };
}

function projectDistanceOnWall(wall: Wall, info: StraightWallInfo, x: number, y: number): number {
  return (x - wall.start.x) * info.ux + (y - wall.start.y) * info.uy;
}

function distanceToWallCenterline(wall: Wall, info: StraightWallInfo, x: number, y: number): number {
  return Math.abs((x - wall.start.x) * (-info.uy) + (y - wall.start.y) * info.ux);
}

export function getOpeningsForWall<T extends Door | Win>(
  targetWall: Wall,
  walls: Wall[],
  openings: T[],
  tolerance = 4,
): RenderOpening<T>[] {
  const targetInfo = straightWallInfo(targetWall);
  if (!targetInfo) {
    return openings
      .filter((opening) => opening.wallId === targetWall.id)
      .map((opening) => ({
        opening,
        position: opening.position,
        width: opening.width,
        sourceWallId: opening.wallId,
        projected: false,
      }));
  }

  const targetHalfThickness = Math.max(targetWall.thickness, 1) / 2;
  const rendered: RenderOpening<T>[] = [];

  for (const opening of openings) {
    if (opening.wallId === targetWall.id) {
      rendered.push({
        opening,
        position: opening.position,
        width: opening.width,
        sourceWallId: opening.wallId,
        projected: false,
      });
      continue;
    }

    const sourceWall = walls.find((wall) => wall.id === opening.wallId);
    if (!sourceWall) continue;
    const sourceInfo = straightWallInfo(sourceWall);
    if (!sourceInfo) continue;

    const parallel = Math.abs(sourceInfo.ux * targetInfo.uy - sourceInfo.uy * targetInfo.ux);
    if (parallel > 0.02) continue;

    const sourceHalfThickness = Math.max(sourceWall.thickness, 1) / 2;
    const sourceCenterX = sourceWall.start.x + sourceInfo.ux * opening.position * sourceInfo.len;
    const sourceCenterY = sourceWall.start.y + sourceInfo.uy * opening.position * sourceInfo.len;
    const maxCenterlineDistance = sourceHalfThickness + targetHalfThickness + tolerance;
    if (distanceToWallCenterline(targetWall, targetInfo, sourceCenterX, sourceCenterY) > maxCenterlineDistance) {
      continue;
    }

    const sourceLeftX = sourceCenterX - sourceInfo.ux * opening.width / 2;
    const sourceLeftY = sourceCenterY - sourceInfo.uy * opening.width / 2;
    const sourceRightX = sourceCenterX + sourceInfo.ux * opening.width / 2;
    const sourceRightY = sourceCenterY + sourceInfo.uy * opening.width / 2;
    const targetA = projectDistanceOnWall(targetWall, targetInfo, sourceLeftX, sourceLeftY);
    const targetB = projectDistanceOnWall(targetWall, targetInfo, sourceRightX, sourceRightY);
    const left = Math.max(0, Math.min(targetA, targetB));
    const right = Math.min(targetInfo.len, Math.max(targetA, targetB));

    if (right - left < 1) continue;
    rendered.push({
      opening,
      position: ((left + right) / 2) / targetInfo.len,
      width: right - left,
      sourceWallId: opening.wallId,
      projected: true,
    });
  }

  return rendered;
}
