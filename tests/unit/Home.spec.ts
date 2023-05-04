import { shallowMount } from "@vue/test-utils";
import { RouterLink } from "vue-router";

import Home from "@/views/Pages/Home/index.vue";

describe("Home.vue", () => {
  it("renders title and content", () => {
    const pageContent = "Home";
    const wrapper = shallowMount(Home, {
      global: {
        components: {
          "router-link": RouterLink
        }
      }
    });

    expect(wrapper.text()).toMatch(pageContent);
  });
});
