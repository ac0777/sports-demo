import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import LeagueBadge from "../../../src/components/LeagueBadge.vue";

describe("LeagueBadge", () => {
  it("renders league badge", () => {
    const wrapper = mount(LeagueBadge, {
      props: {
        season: {
          strSeason: "2014-2015",
          strBadge:
            "https://r2.thesportsdb.com/images/media/league/badgearchive/571jj21690676218.png",
        },
      },
    });
    expect(wrapper.text()).toContain("2014-2015");
    const img = wrapper.get("img");
    expect(img.attributes("src")).toBe(
      "https://r2.thesportsdb.com/images/media/league/badgearchive/571jj21690676218.png"
    );
  });
});
