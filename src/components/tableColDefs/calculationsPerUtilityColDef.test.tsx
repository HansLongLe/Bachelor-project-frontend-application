import { categorizeBasedOnState, sortZonesComparator } from "./calculationsPerUtilityColDef";

describe("categorizeBasedOnState function", () => {
  test("categorizes numbers correctly", () => {
    const numbers = [-1, 0, 1, 2, 3];
    const result = categorizeBasedOnState(numbers);
    expect(result).toEqual({ greyCount: 1, greenCount: 1, yellowCount: 1, redCount: 2 });
  });

  test("handles empty input array", () => {
    const emptyArray: number[] = [];
    const result = categorizeBasedOnState(emptyArray);
    expect(result).toEqual({ greyCount: 0, greenCount: 0, yellowCount: 0, redCount: 0 });
  });
});

describe("sortZonesComparator function", () => {
  test("sorts zones based on categorization", () => {
    const zoneA = [-1, 0, 1, 2, 0];
    const zoneB = [0, 1, 2, 0, 0];
    const zoneC = [-1, -1, 0, 1, 3];
    const zoneD = [2, 3, 3, 0, 0];

    const result = [zoneA, zoneB, zoneC, zoneD].sort(sortZonesComparator);

    expect(result).toEqual([zoneD, zoneB, zoneA, zoneC]);
  });

  test("handles empty arrays during sorting", () => {
    const zoneA: number[] = [];
    const zoneB: number[] = [];
    const zoneC: number[] = [];

    const result = [zoneA, zoneB, zoneC].sort(sortZonesComparator);

    expect(result).toEqual([zoneA, zoneB, zoneC]);
  });
});
