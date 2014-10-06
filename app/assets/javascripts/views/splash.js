GoAgainV2.Views.Splash = Backbone.CompositeView.extend({
	template: JST['misc/splash'],

	initialize: function (options) {
		this.businesses = options.businesses;
		this.recentReviews = options.recentReviews;

		this.listenTo(this.recentReviews, "sync", this.render);
		this.listenTo(this.recentReviews, "add", this.addReview.bind(this));

		this.recentReviews.each(this.addReview.bind(this));
	},

	addReview: function (review) {
		var reviewShow = new GoAgainV2.Views.ReviewShow({
			model: review
		});
		this.addSubview(".recent-review-list", reviewShow);
	},

	render: function () {
		var renderedContent = this.template({
			reviews: this.collection
		});

		this.$el.html(renderedContent);
		this.attachSubviews();

		var allBusinessesView = new GoAgainV2.Views.CategoryShow({
			collection: this.businesses
		});

		$('.category-results').html(allBusinessesView.render().$el);

		return this;
	},

	events: {
		"click .get-more-reviews": "getMoreReviews",
		"click .category-link": "getCategory"
	},

	getMoreReviews: function(event) {
		event.preventDefault();

	  var url = "/api/reviews?page=" + this.count;
	  this.count++;

	  var view = this;

	  var options = {
	    url: url,
	    dataType: "json",
	    success: function (data) {
	    	if(view.count === 5) {
	    		view.$(".get-more-reviews").remove();
	    	}

	      _(data).each(function(review){
	      	var reviewModel = new GoAgainV2.Models.Review(review);
	      	view.recentReviews.add(reviewModel);
	      });
	    }
	  };

	  $.ajax(options);
	},

	count: 1,

	getCategory: function(event) {
		event.preventDefault();

		var category = $(event.currentTarget).attr('href');

		var categoryBusinesses = new GoAgainV2.Collections.Businesses();

		categoryBusinesses.fetch({data: { category: category }});

		var view = new GoAgainV2.Views.CategoryShow({
			collection: categoryBusinesses
		});

		$('.category-results').html(view.render().$el);
	}
});