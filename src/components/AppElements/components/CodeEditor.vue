<template>
	<v-card class="rounded-0 pa-0 ma-0" width="100%" dark fixed flat>
		<v-tabs style="width: 90%" v-model="tab" :show-arrows="true" dark>
			<v-tabs-slider color="yellow"></v-tabs-slider>
			<v-tab> Settings </v-tab>
			<v-tab
				v-show="
					route !== '/htmlgenerator' &&
					route !== '/htmlimport' &&
					route !== '/sdk' && 
					route !== '/gallery'
				"
			>
				Document
			</v-tab>
			<v-tab
				v-show="
					route === '/emailpreview' ||
					route === '/emaileditor' ||
					route === '/gallery' ||
					route === '/variableeditor'
				"
			>
				Hooks
			</v-tab>
			<v-tab v-show="route === '/emaileditor'">Block Libraries</v-tab>
			<v-tab v-show="route === '/htmlgenerator'">Examples</v-tab>
			<v-tab v-show="route === '/htmlgenerator'">Input JSON</v-tab>
			<v-tab v-show="route === '/htmlgenerator'">Output HTML</v-tab>

			<v-tab v-show="route === '/htmlimport'">Input HTML</v-tab>
			<v-tab v-show="route === '/htmlimport'">Output JSON</v-tab>
		</v-tabs>

		<v-card
			v-show="tab === 0"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code :code="code" class="pa-0" lang="javascript" />
		</v-card>

		<v-card
			v-show="tab === 1"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code :code="doc" class="pa-0" lang="javascript" />
		</v-card>

		<v-card
			v-show="tab === 2"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="hooks" />
		</v-card>

		<v-card
			v-show="tab === 3"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="blockLibs" />
		</v-card>

		<v-card
			v-show="tab === 4"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="html" :code="htmlCode" />
		</v-card>

		<v-card
			v-show="tab === 5 || tab === 8"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="json" :code="htmlGeneratorDummyJSON" />
		</v-card>

		<v-card
			v-show="tab === 6 || tab === 7"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="html" :code="getDummyHtmlDocument" />
		</v-card>

		<v-card dark class="copyCard rounded-pill" elevation="0" v-show="snackbar"
			><v-card-text class="pa-1 px-4 success--text text-button"
				>Copied to Clipboard</v-card-text
			></v-card
		>
		<v-tab>
			<v-btn
				dark
				icon
				class="copyToClipboard grey--text text--darken-1"
				@click="copyToClipboard"
				><v-icon>mdi-clipboard-file-outline</v-icon></v-btn
			>
		</v-tab>
	</v-card>
</template>

<script>
import sdkCodeGenerator from "./CodeEditor/codeGenerators/sdkCodeGenerator";
import thumbnailCodeGenerator from "./CodeEditor/codeGenerators/thumbnailCodeGenerator";
import previewCodeGenerator from "./CodeEditor/codeGenerators/previewCodeGenerator";
import emailEditorCodeGenerator from "./CodeEditor/codeGenerators/emailEditorCodeGenerator";
import megaGalleryCodeGenerator from "./CodeEditor/codeGenerators/megaGalleryCodeGenerator";
import variableEditorCodeGenerator from "./CodeEditor/codeGenerators/variableEditorCodeGenerator";
import blockLibrariesCodeGenerator from "./CodeEditor/codeGenerators/blockLibrariesCodeGenerator";
import documentCodeGenerator from "./CodeEditor/codeGenerators/documentCodeGenerator";
import htmlGeneratorCodeGenerator from "./CodeEditor/codeGenerators/htmlGeneratorCodeGenerator";
import htmlImportCodeGenerator from "./CodeEditor/codeGenerators/htmlImportCodeGenerator";
import dummyHtmlCodeGenerator from "./CodeEditor/codeGenerators/dummyHtmlCodeGenerator";

import previewHooksGenerator from "./CodeEditor/hooks/previewHooks";
import variableEditorHooksGenerator from "./CodeEditor/hooks/variableEditorHooks";
import emailEditorHooksGenerator from "./CodeEditor/hooks/emailEditorHooks";
import megaGalleryHooksGenerator from "./CodeEditor/hooks/megaGalleryHooks";

import { mapGetters } from "vuex";

export default {
	updated() {
		let el = document.querySelector(".v-navigation-drawer .v-tab--active");
		let style = window.getComputedStyle(el);

		if (style.display === "none") this.tab = 0;
	},

	data: () => ({
		ignore: 0,
		snackbar: false,
		tab: 0,
		watchRouteChange: false,
	}),

	mounted() {
		let wait = setInterval(() => {
			if (this.$store.state.sdk) {
				clearInterval(wait);
				this.scrollCode({ hash: "#home" }, this.$route);
				this.ignore = 0;
				this.watchRouteChange = true;
			}
		}, 100);
	},

	watch: {
		$route(to, from) {
			if (this.watchRouteChange) this.scrollCode(from, to);
		},
	},

	computed: {
		...mapGetters({ menus: "getMenu" }),
		...mapGetters([
			"getHtmlGeneratorConfigObject",
			"getHtmlDocument",
			"getDummyHtmlDocument",
			"getDummyJSON",
			"getSize",
		]),

		route() {
			return this.$route.path;
		},

		doc() {
			return documentCodeGenerator(this.$store.state.document);
		},

		sdkCode() {
			return sdkCodeGenerator(this.$store.state.sdkConfig);
		},

		//Thumbnail
		thumbnailCode() {
			return thumbnailCodeGenerator(this.$store.getters.getThumbnailSettings);
		},

		//Preview
		previewCode() {
			return previewCodeGenerator(this.$store.getters.getPreviewConfigObject);
		},

		previewHooks() {
			return previewHooksGenerator();
		},

		//Email Editor
		blockLibs() {
			return blockLibrariesCodeGenerator(
				this.$store.state.editorConfig.BlockLibData.blockLibsData,
				this.$store.getters.getBlockLibs
			);
		},

		emailCode() {
			return emailEditorCodeGenerator(this.$store.getters.getConfigObject);
		},

		editorHooks() {
			return emailEditorHooksGenerator();
		},

		// Gallery

		galleryCode() {
			return megaGalleryCodeGenerator(this.$store.getters.getGalleryConfigObject);
		},

		galleryHooks() { 
			return megaGalleryHooksGenerator();
		},

		//Variable Editor
		variableEditorCode() {
			return variableEditorCodeGenerator(
				this.$store.getters.getVariableEditorConfigObject
			);
		},

		variableEditorHooks() {
			return variableEditorHooksGenerator();
		},

		//Html generator
		htmlGeneratorCode() {
			return htmlGeneratorCodeGenerator(this.getHtmlGeneratorConfigObject);
		},

		htmlGeneratorDummyJSON() {
			return JSON.stringify(this.getDummyJSON, null, " ");
		},

		htmlCode() {
			return dummyHtmlCodeGenerator(
				this.getDummyHtmlDocument,
				this.getSize,
				this.getHtmlGeneratorConfigObject.lineLength
			);
		},

		//Html import
		htmlImportCode() {
			return htmlImportCodeGenerator();
		},

		//Final
		code() {
			if (this.$route.path === "/emaileditor") return this.emailCode;
			else if (this.$route.path === "/sdk") return this.sdkCode;
			else if (this.$route.path === "/gallery") return this.galleryCode;
			else if (this.$route.path === "/emailpreview") return this.previewCode;
			else if (this.$route.path === "/emailthumbnail")
				return this.thumbnailCode;
			else if (this.$route.path === "/variableeditor")
				return this.variableEditorCode;
			else if (this.$route.path === "/htmlgenerator")
				return this.htmlGeneratorCode;
			else if (this.$route.path === "/htmlimport") return this.htmlImportCode;
			else return `console.log("${this.$route.path}");`;
		},

		hooks() {
			if (this.$route.path === "/emaileditor") return this.editorHooks;
			else if (this.$route.path === "/emailpreview") return this.previewHooks;
			else if (this.$route.path === "/gallery") return this.galleryHooks;
			else if (this.$route.path === "/variableeditor")
				return this.variableEditorHooks;
			else return "//There are no hooks available";
		},
	},

	methods: {
		scrollCode(from, to) {
			if (this.ignore > 0) {
				this.ignore--;
				return;
			}

			let pageIndex = this.menus.findIndex((el) => el.to === to.path.slice(1));

			if (!this.menus[pageIndex].children) return;

			let routes = this.menus[pageIndex].children;

			let toHash = to.hash;
			let fromHash = from.hash;

			let toInd = routes.findIndex((el) => el.to === toHash) + 1;
			let fromInd = routes.findIndex((el) => el.to === fromHash) + 1;

			if (to.hash === "#home") toInd = 0;
			if (from.hash === "#home") fromInd = 0;

			if (toInd === -1 || fromInd === -1) throw "CodeEditor: Menu not found";

			let dist = Math.abs(toInd - fromInd);

			if (toInd === 0)
				document.querySelector("code.hljs").scroll({
					top: 0,
					behavior: "smooth",
				});
			else {
				document.querySelectorAll(".hljs-attr").forEach((c) => {
					if (c.innerHTML === routes[toInd - 1].codePropToMatch) {
						let parent = c.parentElement;
						parent.scroll({
							top: c.offsetTop,
							behavior: "smooth",
						});
					}
				});
			}

			if (dist > 1) this.ignore = dist;
		},

		copyToClipboard() {
			let str;

			switch (this.tab) {
			case 0:
				str = this.code;
				break;
			case 1:
				str = this.doc;
				break;
			case 2:
				str = this.hooks;
				break;
			case 3:
				str = this.blockLibs;
				break;
			case 4:
				str = this.htmlCode;
				break;
			case 5:
			case 8:
				str = this.htmlGeneratorDummyJSON;
				break;
			case 6:
			case 7:
				str = this.getDummyHtmlDocument;
				break;
			default:
				str = "";
				break;
			}

			const el = document.createElement("textarea");
			el.value = str;
			el.setAttribute("readonly", "");
			el.style.position = "absolute";
			el.style.left = "-9999px";
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);

			this.snackbar = true;

			setTimeout(() => {
				this.snackbar = false;
			}, 800);
		},
	},
};
</script>

<style>
.copyToClipboard {
	position: fixed !important;
	margin: 8px;
	right: 0;
	top: 0;
	z-index: 2;
}

.copyCard {
	position: fixed !important;
	top: 0;
	right: 0;
	width: 100%;
	text-align: right;
	z-index: 2;
	margin-right: 58px;
	margin-top: 4px;
}

.hljs {
	padding: 40px !important;
	display: block;
	height: calc(100vh - 48px);
	background: transparent;
	overflow-y: auto;
	scrollbar-width: thin;

	font-family: "Source Code Pro", monospace;
}

.hljs::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.hljs::-webkit-scrollbar-thumb {
	background: #757575;
	border-radius: 99999px;
}
.hljs::-webkit-scrollbar-thumb:hover {
	background: white;
}
.hljs::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 99999px;
}

code {
	background-color: transparent !important;
	white-space: pre-wrap;
	overflow: auto;
}
</style>
