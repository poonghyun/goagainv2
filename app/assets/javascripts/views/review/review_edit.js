GoAgainV2.Views.ReviewEdit = Backbone.View.extend({
	template: JST['review/review_edit'],

	initialize: function(options) {
		this.business_name = options.business_name;
	},

	render: function () {
		var renderedContent = this.template({
			review: this.model,
			business_name: this.business_name
		});

		this.$el.html(renderedContent);

		return this;
	}
});