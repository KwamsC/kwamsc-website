// import BlankLayout from "@/layout/BlankLayout.vue";
import MainLayout from "@/layout/MainLayout.vue";
import PostsView from "@/views/PostsView.vue";
import RecipesView from "@/views/RecipesView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			meta: { layout: MainLayout },
			component: HomeView,
		},
		{
			path: "/blog",
			name: "blog",
			meta: { layout: MainLayout },
			component: PostsView,
		},
		{
			path: "/recipes",
			name: "recipes",
			meta: { layout: MainLayout },
			component: RecipesView,
		},
		{
			path: "/recipes/:id",
			name: "recipes-view",
			meta: { layout: MainLayout },
			component: () => import("../views/RecipeView.vue"),
		},
		{
			path: "/about",
			name: "about",
			meta: { layout: MainLayout },
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/AboutView.vue"),
		},
	],
});

export default router;
