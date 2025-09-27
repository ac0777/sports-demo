import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import LeagueList from "../../../src/components/LeagueList.vue";

const leagues = [
  {
    idLeague: "1",
    strLeague: "English Premier League",
    strSport: "Soccer",
    strLeagueAlternate: "EPL",
  },
  {
    idLeague: "2",
    strLeague: "NBA",
    strSport: "Basketball",
    strLeagueAlternate: "",
  },
];

const LeagueItemStub = {
  template: `<div data-testid="league-item">{{ league.strLeague }}</div>`,
  props: ["league"],
};

describe("LeagueList.vue", () => {
  it("shows loading state", () => {
    const wrapper = mount(LeagueList, {
      props: { leagues: [], isLoading: true },
      global: { stubs: { LeagueItem: LeagueItemStub } },
    });
    expect(wrapper.text()).toContain("Loading…");
    expect(wrapper.find(".grid").exists()).toBe(false);
  });

  it("shows error state", () => {
    const wrapper = mount(LeagueList, {
      props: { leagues: [], error: "Boom" },
      global: { stubs: { LeagueItem: LeagueItemStub } },
    });
    const err = wrapper.get("p.err");
    expect(err.text()).toContain("Error: Boom");
    expect(wrapper.find(".grid").exists()).toBe(false);
  });

  it("shows empty state when no leagues", () => {
    const wrapper = mount(LeagueList, {
      props: { leagues: [] },
      global: { stubs: { LeagueItem: LeagueItemStub } },
    });
    expect(wrapper.text()).toContain("No leagues match your filters.");
    expect(wrapper.find(".grid").exists()).toBe(false);
  });

  it("renders a grid of LeagueItem when there are leagues", () => {
    const wrapper = mount(LeagueList, {
      props: { leagues },
      global: { stubs: { LeagueItem: LeagueItemStub } },
    });

    expect(wrapper.find(".grid").exists()).toBe(true);

    const items = wrapper.findAll('[data-testid="league-item"]');
    expect(items).toHaveLength(leagues.length);

    expect(items[0].text()).toBe("English Premier League");
    expect(items[1].text()).toBe("NBA");

    expect(wrapper.text()).not.toContain("Loading…");
    expect(wrapper.text()).not.toContain("Error:");
    expect(wrapper.text()).not.toContain("No leagues match your filters.");
  });

  it("prioritizes error over data (v-else-if chain)", () => {
    const wrapper = mount(LeagueList, {
      props: { leagues, error: "Oops" },
      global: { stubs: { LeagueItem: LeagueItemStub } },
    });
    expect(wrapper.get(".err").text()).toContain("Error: Oops");
    expect(wrapper.find(".grid").exists()).toBe(false);
  });
});
