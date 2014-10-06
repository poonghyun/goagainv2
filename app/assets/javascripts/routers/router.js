GoAgainV2.Routers.Router = Backbone.Router.extend({
	routes: {
		"": "splash",
		"business/new": "businessNew",
		"business/:id": "businessShow",
		"user/:id": "userShow",
		"explore": "explore"
	},

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	splash: function() {
		var view = new GoAgainV2.Views.Splash({
			businesses: GoAgainV2.businesses,
			recentReviews: GoAgainV2.reviews
		});

		GoAgainV2.businesses.fetch();
		GoAgainV2.reviews.fetch();

		this._swapView(view);
	},

	businessNew: function() {
		var view = new GoAgainV2.Views.BusinessNew();

		this._swapView(view);
	},

	businessShow: function(id) {
		var business = GoAgainV2.businesses.getOrFetch(id);

		var view = new GoAgainV2.Views.BusinessShow({
			model: business
		});

		this._swapView(view);
	},

	userShow: function(id) {
		var user = new GoAgainV2.Models.User({ id: id });

		var view = new GoAgainV2.Views.UserShow({
			model: user
		});

		user.fetch();

		this._swapView(view);
	},

	explore: function() {
		var view = new GoAgainV2.Views.MapView({
			collection: GoAgainV2.businesses,
			model: GoAgainV2.businesses.getActive()
		});

		GoAgainV2.businesses.fetch();

		this._swapView(view);
	},

	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	}
});