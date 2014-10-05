GoAgainV2.Collections.Reviews = Backbone.Collection.extend({
	url: "/api/reviews",
	model: GoAgainV2.Models.Review
});

GoAgainV2.reviews = new GoAgainV2.Collections.Reviews();