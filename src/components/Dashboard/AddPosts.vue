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
				<wysiwyg v-model="formData.content"></wysiwyg>
			</div>

			<div class="input_field" :class="{invalid: $v.formData.rating.$error}">
				<label for="rating">Rating</label>
				<select name="rating" id="rating" v-model="formData.rating" @blur="$v.formData.rating.$touch()">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
				<p class="error_label" v-if="$v.formData.rating.$error">You need to select a rating.</p>
			</div>

			<button type="submit">Add Post</button>
		</form>

		<md-dialog :md-active="dialog">
			<p>Your post has no content, are you sure you want to post this?</p>
			<md-dialog-actions>
				<md-button class="md-primary" @click="dialogOnCancel">Oops, I want to add it!</md-button>
				<md-button class="md-primary" @click="dialogOnConfirm">Yes, I am sure.</md-button>
			</md-dialog-actions>
		</md-dialog>

		<div v-if="addpost" class="post_succesfull">Your post was posted successfully!</div>
	</div>
</template>

<script>
	import { required, maxLength } from "vuelidate/lib/validators";

	export default {
		data() {
			return {
				dialog: false,
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
		computed: {
			addpost() {
				let status = this.$store.getters["admin/addPostStatus"];
				if (status) {
					this.clearPost();
				}
				return status;
			}
		},
		methods: {
			submitHandler() {
				if (!this.$v.$invalid) {
					if (this.formData.content === "") {
						this.dialog = true;
					} else {
						this.addPost();
					}
				} else {
					alert("something is wrong");
				}
			},
			addPost() {
				this.$store.dispatch("admin/addPost", this.formData);
			},
			dialogOnCancel() {
				this.dialog = false;
			},
			dialogOnConfirm() {
				this.dialog = false;
				this.addPost();
			},
			clearPost() {
				this.$v.$reset();
				this.formData = {
					title: "",
					desc: "",
					content: "",
					rating: ""
				};
			}
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