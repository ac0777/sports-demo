import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomeView from "../views/HomeView.vue";

const LeagueBadgesView = () =>
  import(
    /* webpackChunkName: "league-badges" */ "../views/LeagueBadgesView.vue"
  );

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/league-badges/:id",
    name: "leagueBadges",
    component: LeagueBadgesView,
    props: (route) => ({
      idLeague: route.params.id as string,
      leagueName: (route.query.name as string) || "",
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
