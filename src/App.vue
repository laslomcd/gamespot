<template>
	<div>
		<app-header></app-header>
		<router-view></router-view>
		<app-footer></app-footer>
	</div>
</template>

<script>
	export default {
		created() {
			this.$store.dispatch("admin/refreshToken");
		}
	};
</script>

<style>
	@import "./assets/style.css";
</style>
