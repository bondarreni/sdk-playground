<template>
	<div>
		<h2>Header</h2>
		<p>
			You can add buttons and dropdowns to the right of the header. It is a
			great way to interact with your application from this plugin. Whenever you
			click on a button or a dropdown item, a hook will be called with the ID of
			that button. This allows you to attach any custom functionality to each
			button.
		</p>
		<OptionsWrapper>
			<HeaderPreview />
		</OptionsWrapper>

		<h3>Your Buttons and Dropdowns</h3>
		<p>
			You can add and customize your buttons and dropdowns below. The icon is
			required to be a <br />
			<a href="https://materialdesignicons.com/" target="_blank"
				>Material Design Icon</a
			>
			without <em>mdi-</em> prefix. Keep in mind that the header can only store
			a limited amount of buttons.
		</p>
		<OptionsWrapper>
			<template>
				<v-row align="center" justify="end" class="ma-0">
					<AddButton class="mr-lg-6" @click="addBtn"> New Button </AddButton>
					<AddButton class="mt-6 mt-lg-0" @click="addDD">
						New DropDown
					</AddButton>
				</v-row>
			</template>

			<List6 :section="'Editor'" />
		</OptionsWrapper>
	</div>
</template>

<script>
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import HeaderPreview from "./Header/HeaderPreview.vue";
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import List6 from "../../Lists/components/List6.vue";
import { mapMutations } from "vuex";

export default {
	components: {
		AddButton,
		HeaderPreview,
		OptionsWrapper,
		List6,
	},
	methods: {
		...mapMutations({
			addBtn: "addEditorBtn",
			addDD: "addEditorDropdown",
		}),
	},
	data() {
		return {
			rules: {
				required: (value) => !!value || "Required.",
				unique: (value) =>
					!this.$store.state.editorConfig.idArr.includes(value),
			},
		};
	},
};
</script>

<style></style>
