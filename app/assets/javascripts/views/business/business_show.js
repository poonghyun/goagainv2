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

	newReviewModal: function (event) {
		event.preventDefault();

		var view = new GoAgainV2.Views.ReviewNew({
			model: this.model
		});

		var modal = new Backbone.BootstrapModal({
			content: view
		}).open();

		$('.rateit').rateit();

		modal.on("ok", function() {
			modal.preventClose();

			var params = $("form").serializeJSON();

			this.okClicked(params, modal);
		}.bind(this));
	},

	editReviewModal: function (event) {
		event.preventDefault();

		var bView = this;
		var review = this.collection.get(bView.model.get('current_user_review').id);

		var view = new GoAgainV2.Views.ReviewEdit({
			model: review,
			business_name: this.model.get('name')
		});

		var modal = new Backbone.BootstrapModal({
			content: view
		}).open();

		$('.rateit').rateit();

		modal.on("ok", function() {
			modal.preventClose();

			var params = $("form").serializeJSON();

			this.okClicked(params, modal);
		}.bind(this));
	},

	okClicked: function(params, modal) {
		var view = this;
		var review = new GoAgainV2.Models.Review(params["review"]);

		if(!params["review"].go_again) {
			review.set({ go_again: false })
		}

		var starValue = $('#review-stars > div').attr('aria-valuenow');
		review.set({ stars: starValue });

		review.save({}, {
			success: function (resp) {
				modal.close();

				if(params["review"]["photos"]) {
					_(params["review"]["photos"]["urls"]).each(function(url){
						var photo = new GoAgainV2.Models.Photo({
							review_id: resp.id,
							fp_url: url
						})

						photo.save();
					});
				}

				view.model.fetch();
			},
			error: function(model, resp) {
				var errorJSON = resp.responseJSON;
				$('.form-group').removeClass('has-error');
				if(errorJSON.content) {
					$('#review-content').parent().addClass('has-error');
				}
				if(errorJSON.stars) {
					$('#review-stars').parent().addClass('has-error');
				}
			}
		});
	}
});