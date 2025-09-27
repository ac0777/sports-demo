import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLeagues } from "../../../src/composables/useLeagues";

describe("useLeagues", () => {
  const mockPayload = {
    leagues: [
      {
        idLeague: "1",
        strLeague: "English Premier League",
        strSport: "Soccer",
      },
      { idLeague: "2", strLeague: "NBA", strSport: "Basketball" },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    // simple fetch mock
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => mockPayload,
      })) as any
    );
  });

  it("loads leagues and computes sports list", async () => {
    const { leagues, sports, isLoading, error, loadLeagues } = useLeagues();
    await loadLeagues({ force: true });

    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
    expect(leagues.value.length).toBe(2);
    expect(sports.value).toEqual(["Basketball", "Soccer"]);
  });
});
