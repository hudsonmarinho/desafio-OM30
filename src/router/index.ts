import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "PagesHome",
    component: () => import("@/views/Pages/Home/index.vue"),
    meta: {
      title: "Welcome to the Home"
    }
  },
  {
    path: "/admin/",
    name: "AdminPatientsIndex",
    component: () => import("@/views/Admin/Patients/index.vue"),
    meta: {
      hasAuth: true,
      title: "AdminPatientsIndex"
    }
  },
  {
    path: "/admin/patient/new",
    name: "AdminPatientNew",
    component: () => import("@/views/Admin/Patients/new.vue"),
    meta: {
      hasAuth: true,
      title: "AdminPatientNew"
    }
  },
  {
    path: "/admin/patient/edit/:id",
    name: "AdminPatientEdit",
    component: () => import("@/views/Admin/Patients/edit.vue"),
    meta: {
      hasAuth: true,
      title: "AdminPatientEdit"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/Erros/404/index.vue"),
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
