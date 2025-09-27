import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FiltersBar from "@/components/FiltersBar.vue";

describe("FiltersBar.vue", () => {
  const sports = ["Soccer", "Basketball", "Motorsport"];

  it("renders input and select with initial values", () => {
    const wrapper = mount(FiltersBar, {
      props: { sports, search: "prem", sport: "Soccer" },
    });

    const input = wrapper.get("input.control.filtersInput");
    const select = wrapper.get("select.control.filtersSelect");

    expect((input.element as HTMLInputElement).value).toBe("prem");
    expect((select.element as HTMLSelectElement).value).toBe("Soccer");

    const options = wrapper.findAll("select option").map((o) => o.text());
    expect(options[0]).toBe("All Sports");
    expect(options.slice(1)).toEqual(sports);
  });

  it("emits update:search when typing in the input", async () => {
    const wrapper = mount(FiltersBar, {
      props: { sports, search: "", sport: "" },
    });

    const input = wrapper.get("input.control.filtersInput");
    await input.setValue("premier");

    expect(wrapper.emitted("update:search")).toBeTruthy();
    expect(wrapper.emitted("update:search")![0]).toEqual(["premier"]);
  });

  it("emits update:sport on select change", async () => {
    const wrapper = mount(FiltersBar, {
      props: { sports, search: "", sport: "" },
    });

    const select = wrapper.get("select.control.filtersSelect");
    await select.setValue("Basketball");

    expect(wrapper.emitted("update:sport")).toBeTruthy();
    expect(wrapper.emitted("update:sport")![0]).toEqual(["Basketball"]);
  });

  it("updates the rendered values if props change (controlled inputs)", async () => {
    const wrapper = mount(FiltersBar, {
      props: { sports, search: "", sport: "" },
    });

    await wrapper.setProps({ search: "lal", sport: "Motorsport" });

    const input = wrapper.get("input.control.filtersInput");
    const select = wrapper.get("select.control.filtersSelect");

    expect((input.element as HTMLInputElement).value).toBe("lal");
    expect((select.element as HTMLSelectElement).value).toBe("Motorsport");
  });

  it('emits empty string for "All Sports"', async () => {
    const wrapper = mount(FiltersBar, {
      props: { sports, search: "", sport: "Soccer" },
    });

    const select = wrapper.get("select.control.filtersSelect");
    await select.setValue("");

    expect(wrapper.emitted("update:sport")![0]).toEqual([""]);
  });
});
