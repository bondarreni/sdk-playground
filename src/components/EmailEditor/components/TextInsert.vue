<template>
	<div>
		<h2>Text Insert</h2>
		<p>
			If you want to provide predefined merge tags to your customers, text
			insert buttons are a great solution. They work similarly to any other
			configurable buttons in the SDK, whenever a user clicks on them, the
			onTextInsertPluginButtonClicked hook is invoked with a buttonId as a
			parameter.
		</p>
		<OptionWrapper>
			<TextInsertPreview />
		</OptionWrapper>

		<h3>Your Buttons</h3>
		<p>
			In case of these buttons, the icon field expects a URL to an image. You
			can either display the label of the button or the icon, but not both at
			the same time.
		</p>
		<OptionWrapper>
			<template>
				<v-row align="center" justify="end" class="ma-0">
					<AddButton @click="addTextInsertButton"> New Button </AddButton>
				</v-row>
			</template>
			<div
				v-if="btnArr.length > 0"
				class="mt-8 list3 rounded"
				style="max-height: 218px; overflow-y: auto"
			>
				<draggable handle=".dtrigger" v-model="btnArr">
					<div v-for="(item, ind) in btnArr" :key="ind">
						<ListItem3
							:id="item.id"
							:icon="item.icon"
							:label="item.label"
							@idChange="
								updateTextInsertButton({
									index: ind,
									id: $event,
								})
							"
							@labelChange="
								updateTextInsertButton({
									index: ind,
									label: $event,
								})
							"
							@iconChange="
								updateTextInsertButton({
									index: ind,
									icon: $event,
								})
							"
							@deleteClicked="deleteTextInsertButton(ind)"
						/>
						<v-divider v-show="ind !== btnArr.length - 1"></v-divider>
					</div>
				</draggable>
			</div>
		</OptionWrapper>
	</div>
</template>

<script>
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import ListItem3 from "../../Lists/components/ListItem3.vue";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import TextInsertPreview from "./TextInsert/TextInsertPreview.vue";
import draggable from "vuedraggable";
import { mapMutations } from "vuex";

export default {
	methods: {
		...mapMutations([
			"addTextInsertButton",
			"deleteTextInsertButton",
			"updateTextInsertOrder",
			"updateTextInsertButton",
		]),
	},
	computed: {
		btnArr: {
			get() {
				return this.$store.state.editorConfig.settings.buttons.textInsert;
			},
			set(val) {
				this.updateTextInsertOrder(val);
			},
		},
	},
	components: {
		AddButton,
		OptionWrapper,
		draggable,
		TextInsertPreview,
		ListItem3,
	},
};
</script>

<style></style>
