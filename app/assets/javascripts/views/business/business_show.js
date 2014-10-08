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

		$('.rateit').rateit();

		return this;
	},

	events: {
		"click .launch-new-review": "newReviewModal",
		"click .launch-edit-review": "editReviewModal"
	},

	newReviewModal: function () {
		var view = new GoAgainV2.Views.ReviewNew({
			model: this.model
		});

		var modal = new Backbone.BootstrapModal({
			content: view,
			animate: true
		}).open();

		modal.on("ok", function() {
			modal.preventClose();

			var params = $("form").serializeJSON();

			this.okClicked(params, modal);
		}.bind(this));
	},

	editReviewModal: function () {
		
	},

	okClicked: function(params, modal) {

	}
});