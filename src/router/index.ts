import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const PagesHome = () => import("@/views/Pages/Home/index.vue");

const AdminPatientsIndex = () => import("@/views/Admin/Patients/index.vue");
const AdminPatientNew = () => import("@/views/Admin/Patients/new.vue");
const AdminPatientEdit = () => import("@/views/Admin/Patients/edit.vue");

const PageNotFound = () => import("@/views/Erros/404/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "PagesHome",
    component: PagesHome,
    meta: {
      title: "Welcome to the Home"
    }
  },

  {
    path: "/admin/",
    name: "AdminPatientsIndex",
    component: AdminPatientsIndex,
    meta: {
      hasAuth: true,
      title: "AdminPatientsIndex"
    }
  },
  {
    path: "/admin/patient/new",
    name: "AdminPatientNew",
    component: AdminPatientNew,
    meta: {
      hasAuth: true,
      title: "AdminPatientNew"
    }
  },
  {
    path: "/admin/patient/edit/:id",
    name: "AdminPatientEdit",
    component: AdminPatientEdit,
    meta: {
      hasAuth: true,
      title: "AdminPatientEdit"
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
