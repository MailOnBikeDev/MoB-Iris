<template>
	<div id="app">
		<header>
			<Navigation />
		</header>

		<main class="cols-md-12 container mx-auto justify-center">
			<router-view />
		</main>
	</div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
	name: "App",
	components: { Navigation },
};
</script>
