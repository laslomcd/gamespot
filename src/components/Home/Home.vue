<template>
	<div>
		<app-slider></app-slider>
		<app-content></app-content>
	</div>
</template>

<script>
	import Slider from "./Slider";
	import Content from "./Content";

	export default {
		components: {
			"app-slider": Slider,
			"app-content": Content
		}
	};
</script>