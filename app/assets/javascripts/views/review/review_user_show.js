GoAgainV2.Views.ReviewUserShow = Backbone.CompositeView.extend({
	template: JST['review/review_user_show'],

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