import { TileKeys } from "../../definitions/enums";

const lgLayouts = [
  { i: TileKeys.utilityOverview, x: 0, y: 0, w: 6, h: 3 },
  { i: TileKeys.calculationsPerUtility, x: 6, y: 0, w: 14, h: 3 },
  { i: TileKeys.RTOPerUtility, x: 0, y: 3, w: 10, h: 2 },
  { i: TileKeys.eBoks, x: 10, y: 3, w: 4, h: 2 }
];

const mdLayouts = [
  { i: TileKeys.utilityOverview, x: 0, y: 0, w: 4, h: 2 },
  { i: TileKeys.calculationsPerUtility, x: 4, y: 0, w: 8, h: 2 },
  { i: TileKeys.RTOPerUtility, x: 0, y: 2, w: 8, h: 2 },
  { i: TileKeys.eBoks, x: 8, y: 2, w: 3, h: 2 }
];

const smLayouts = [
  { i: TileKeys.utilityOverview, x: 0, y: 0, w: 1, h: 4 },
  { i: TileKeys.calculationsPerUtility, x: 0, y: 3, w: 1, h: 4 },
  { i: TileKeys.RTOPerUtility, x: 0, y: 6, w: 1, h: 4 },
  { i: TileKeys.eBoks, x: 0, y: 9, w: 2, h: 3 }
];

export const gridLayouts = { lg: lgLayouts, md: mdLayouts, sm: smLayouts };

export const breakpoints = { lg: 1600, md: 1200, sm: 900 };

export const cols = { lg: 20, md: 12, sm: 1 };
