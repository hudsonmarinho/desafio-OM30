import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const PagesHome = () => import("@/views/Pages/Home/index.vue");
const AdminDashboard = () => import("@/views/Admin/Dashboard/index.vue");

const PageNotFound = () => import("@/views/Erros/404/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: PagesHome,
    meta: {
      title: "Welcome to the Home"
    }
  },
  {
    path: "/admin/",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: {
      hasAuth: true,
      title: "AdminDashboard"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
    meta: {
      title: "Page Not Found!"
    }
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

router.beforeEach((to, from, next) => {
  const defaultTitle = "Desafio OM30";
  const title = to.meta.title;

  if (title) {
    document.title = `${title} | ${defaultTitle}`;
  } else {
    document.title = defaultTitle;
  }

  next();
});

export default router;
