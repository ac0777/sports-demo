import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import LeagueItem from "../../../src/components/LeagueItem.vue";
import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/league-badges/:id",
      name: "leagueBadges",
      component: { template: "<div />" },
    },
  ],
});

describe("LeagueItem", () => {
  it("renders league fields", () => {
    const wrapper = mount(LeagueItem, {
      props: {
        league: {
          idLeague: "4328",
          strLeague: "English Premier League",
          strSport: "Soccer",
          strLeagueAlternate: "Premier League, EPL",
        },
      },
    });
    expect(wrapper.text()).toContain("English Premier League");
    expect(wrapper.text()).toContain("Soccer");
    expect(wrapper.text()).toContain("Premier League, EPL");
  });

  it("navigates on click", async () => {
    const pushSpy = vi.spyOn(router, "push");
    const wrapper = mount(LeagueItem, {
      global: { plugins: [router] },
      props: {
        league: { idLeague: "4328", strLeague: "EPL", strSport: "Soccer" },
      },
    });
    await router.isReady();
    await wrapper.get("article.card").trigger("click");
    expect(pushSpy).toHaveBeenCalledWith({
      name: "leagueBadges",
      params: { id: "4328" },
      query: { name: "EPL" },
    });
  });
});
