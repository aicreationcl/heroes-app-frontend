import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

describe("Hero API", () => {

  test("should be configure pointing to the testing server", () => {

    expect(heroApi).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
    expect(BASE_URL).toContain('3000'); //3001 para vitest en env.test

  });


});