<template>
	<div class="w-full flex flex-col justify-center items-center mt-28">
		<div
			class="max-w-lg bg-gray-100 shadow-lg rounded-xl mx-auto py-4 px-8 flex flex-col justify-center"
		>
			<img
				id="profile-img"
				src="@/assets/MoB-logo.png"
				alt="Mail On Bike Logo"
				class="w-40 mx-auto relative -top-24"
			/>

			<h2 class="text-center -mt-16 mb-10 text-2xl text-primary font-bold">
				Bienvenidos a Mail On Bike
			</h2>

			<router-link
				to="/login"
				class="bg-secondary px-4 py-2 text-white my-4 link rounded-lg text-center font-bold"
				custom
				v-slot="{ navigate }"
			>
				<span @click="navigate" role="link">
					Empezar
				</span>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
};
</script>

<style lang="scss" scoped>
.link {
	cursor: pointer;
}
</style>
