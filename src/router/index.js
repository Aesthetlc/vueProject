import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/home")
      },
      {
        path: "/page1",
        name: "page1",
        component: () => import("@/views/other/page1")
      },
      {
        path: "/page2",
        name: "page2",
        component: () => import("@/views/other/page2")
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/user")
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
