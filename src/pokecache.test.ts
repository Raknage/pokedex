import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache";

describe("cache", () => {
  const cache = new Cache(1000 * 60 * 5);
  // must cast types as tuple or const for the destructuring to work with TS
  const testData1 = [
    "https://pokeapi.co/api/v2/location-area/",
    JSON.parse(
      `{"count":1089,"next":"https://pokeapi.co/api/v2/location-area/?offset=20&limit=20","previous":null,"results":[{"name":"canalave-city-area","url":"https://pokeapi.co/api/v2/location-area/1/"},{"name":"eterna-city-area","url":"https://pokeapi.co/api/v2/location-area/2/"},{"name":"pastoria-city-area","url":"https://pokeapi.co/api/v2/location-area/3/"},{"name":"sunyshore-city-area","url":"https://pokeapi.co/api/v2/location-area/4/"},{"name":"sinnoh-pokemon-league-area","url":"https://pokeapi.co/api/v2/location-area/5/"},{"name":"oreburgh-mine-1f","url":"https://pokeapi.co/api/v2/location-area/6/"},{"name":"oreburgh-mine-b1f","url":"https://pokeapi.co/api/v2/location-area/7/"},{"name":"valley-windworks-area","url":"https://pokeapi.co/api/v2/location-area/8/"},{"name":"eterna-forest-area","url":"https://pokeapi.co/api/v2/location-area/9/"},{"name":"fuego-ironworks-area","url":"https://pokeapi.co/api/v2/location-area/10/"},{"name":"mt-coronet-1f-route-207","url":"https://pokeapi.co/api/v2/location-area/11/"},{"name":"mt-coronet-2f","url":"https://pokeapi.co/api/v2/location-area/12/"},{"name":"mt-coronet-3f","url":"https://pokeapi.co/api/v2/location-area/13/"},{"name":"mt-coronet-exterior-snowfall","url":"https://pokeapi.co/api/v2/location-area/14/"},{"name":"mt-coronet-exterior-blizzard","url":"https://pokeapi.co/api/v2/location-area/15/"},{"name":"mt-coronet-4f","url":"https://pokeapi.co/api/v2/location-area/16/"},{"name":"mt-coronet-4f-small-room","url":"https://pokeapi.co/api/v2/location-area/17/"},{"name":"mt-coronet-5f","url":"https://pokeapi.co/api/v2/location-area/18/"},{"name":"mt-coronet-6f","url":"https://pokeapi.co/api/v2/location-area/19/"},{"name":"mt-coronet-1f-from-exterior","url":"https://pokeapi.co/api/v2/location-area/20/"}]}`,
    ),
  ] as const;
  const testData2: [string, string] = [
    "https://pokeapi.co/api/v2/location-area/?limit=20&offset=20",
    "data2",
  ];
  test.concurrent("Add entry to cache", async () => {
    cache.add(...testData1);
    expect(cache.get(testData1[0])?.createdAt).toBeTypeOf("number");
    expect(cache.get(testData1[0])?.val).toEqual(testData1[1]);
  });
  test.concurrent("Add second entry to cache", async () => {
    cache.add(...testData2);
    expect(cache.get(testData2[0])?.val).toStrictEqual(testData2[1]);
    expect(cache.cacheSize()).toStrictEqual(2);
  });
  test.concurrent("Empty cache", () => {
    cache.clearCache();
    expect(cache.cacheSize()).toStrictEqual(0);
  });
});

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key)?.val;
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 1000));
  const reaped = cache.get(key)?.val;
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
