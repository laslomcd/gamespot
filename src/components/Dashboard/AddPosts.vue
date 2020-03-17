<template>
	<div class="dashboard_form">
		<h1>Add Posts</h1>
		<form @submit.prevent="submitHandler">
			<div class="input_field" :class="{invalid: $v.formData.title.$error}">
				<label for="title">Title</label>
				<input type="text" v-model="formData.title" @blur="$v.formData.title.$touch()" />
				<p class="error_label" v-if="$v.formData.title.$error">This input is required</p>
			</div>

			<div class="input_field" :class="{invalid: $v.formData.desc.$error}">
				<label for="desc">Description</label>
				<input type="text" v-model="formData.desc" @blur="$v.formData.desc.$touch()" />
				<p class="error_label" v-if="$v.formData.desc.$error">This input is required</p>
				<p
					class="error_label"
					v-if="!$v.formData.desc.maxLength"
				>Must not be greater than {{ $v.formData.desc.$params.maxLength.max }} characters.</p>
			</div>

			<div class="input_field">
				<wysiwyg></wysiwyg>
			</div>
		</form>
	</div>
</template>

<script>
	import { required, maxLength } from "vuelidate/lib/validators";

	export default {
		data() {
			return {
				formData: {
					title: "",
					desc: "",
					content: "",
					rating: ""
				}
			};
		},
		validations: {
			formData: {
				title: {
					required
				},
				desc: {
					required,
					maxLength: maxLength(100)
				},
				rating: {
					required
				}
			}
		},
		methods: {
			submitHandler() {}
		}
	};
</script>

<style scoped>
	@import "~vue-wysiwyg/dist/vueWysiwyg.css";

	.input_field.invalid input,
	.input_field.invalid select {
		border: 1px solid red;
	}
</style>