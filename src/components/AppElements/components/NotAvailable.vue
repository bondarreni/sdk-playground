<template>
	<v-card
		class="
			noselect
			white
			rounded-0
			d-flex
			flex-column
			align-center
			justify-center
		"
		style="max-height: 100vh"
		height="100%"
		width="100%"
	>
		<h1 class="notFoundH1 primary--text">We're</h1>

		<div
			style="max-width: 100%; margin-top: -11vw"
			class="d-flex justify-center"
		>
			<div class="primary--text letters" style="margin-right: 5px">S</div>
			<div class="logoLetter" v-chamaileonLogo></div>
			<div class="primary--text letters">rry!</div>
		</div>

		<h2 class="notFoundH2 primary--text">
			This website is not available on your device! If you are interested in our
			SDK, please check out the
			<a href="https://chamaileon.io/sdk/docs/">documentation</a>.
		</h2>
	</v-card>
</template>

<script>
const chamaileonLogo = require("chamaileon-logo");

export default {
	computed: {
		primary() {
			return this.$vuetify.theme.themes.light.primary;
		},
	},

	directives: {
		chamaileonLogo: {
			inserted: function (el) {
				el.appendChild(chamaileonLogo());

				let svgElem = document.querySelector("svg");

				let boundingBoxDimensions = svgElem.getAttribute("viewBox").split(" ");

				boundingBoxDimensions[0] -= 1;
				boundingBoxDimensions[1] -= 1;
				boundingBoxDimensions[2] = Math.floor(boundingBoxDimensions[2]) + 3;
				boundingBoxDimensions[3] = Math.floor(boundingBoxDimensions[3]) + 3;

				svgElem.setAttribute("viewBox", boundingBoxDimensions.join(" "));
			},
		},
	},
};
</script>

<style>
.letters {
	font-size: 25vw;
	font-weight: 500;
}

.logoLetter {
	width: 15vw;
	padding-top: 13.1vw;

	fill: var(--v-primary-base) !important;
	stroke: var(--v-primary-base);
	stroke-width: 2;
}

.noselect {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.notFoundH1 {
	font-size: 5vw;
	text-align: center;
}

.notFoundH2 {
	font-size: 3vw;
	text-align: center;
	width: 68vw;
}
</style>
