GoAgainV2.Views.ReviewBusinessShow = Backbone.CompositeView.extend({
	template: JST['review/review_business_show'],

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},

	render: function() {
		var renderedContent = this.template({
			review: this.model
		});

		this.$el.html(renderedContent);

		return this;
	}
});