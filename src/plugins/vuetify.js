import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		options: { customProperties: true },
		themes: {
			light: {
				primary: "#00C0E7",
			},
		},
	},
});
