GoAgainV2.Views.BusinessShow = Backbone.CompositeView.extend({
	template: JST['business/business_show'],

	initialize: function() {
		this.collection = this.model.reviews();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.collection, "add", this.addReview.bind(this));
		this.listenTo(this.collection, "change", this.render);

		this.photos = this.model.photos();

		this.collection.each(this.addReview.bind(this));
	},

	addReview: function (review) {
		var reviewShow = new GoAgainV2.Views.ReviewBusinessShow({
			model: review
		});
		this.addSubview(".review-business-list", reviewShow);
	},

	render: function() {
		var renderedContent = this.template({
			business: this.model
		});

		this.$el.html(renderedContent);
		this.attachSubviews();

		return this;
	},

	events: {
		"click .launch-new-review": "newReviewModal",
		"click .launch-edit-review": "editReviewModal"
	},

	newReviewModal: function () {

	},

	editReviewModal: function () {
		
	}
});