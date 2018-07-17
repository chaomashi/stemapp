/* jshint unused:false */
var profile = {
	resourceTags: {
		test: function (filename, mid) {
			return (/test/).test(mid);
		},

		copyOnly: function (filename, mid) {
			/* jshint unused:false */
			return false;
		},

		amd: function (filename, mid) {
			return !this.copyOnly(filename, mid) && /\.js$/.test(filename) && !/NearMe\/libs/.test(filename) &&
				!/EmergencyResponseGuide\/js\/jquery/.test(filename) &&
				!/Visibility\/js\/jquery/.test(filename);
		},

		miniExclude: function (filename, mid) {
			return mid in {
				'widgets/package': 1
			};
		}
	}
};