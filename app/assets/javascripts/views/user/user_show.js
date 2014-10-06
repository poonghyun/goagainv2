GoAgainV2.Views.UserShow = Backbone.CompositeView.extend({
	template: JST['user/user_show'],

	initialize: function() {
		this.collection = this.model.reviews();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.collection, "add", this.addReview.bind(this));
		this.listenTo(this.collection, "change", this.render);

		this.photos = this.model.photos();

		this.collection.each(this.addReview.bind(this));
	},

	addReview: function (review) {
		var reviewShow = new GoAgainV2.Views.ReviewUserShow({
			model: review
		});
		this.addSubview(".review-user-list", reviewShow);
	},

	render: function() {
		var renderedContent = this.template({
			user: this.model
		});

		this.$el.html(renderedContent);
		this.attachSubviews();

		return this;
	}
});