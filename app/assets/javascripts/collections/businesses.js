GoAgainV2.Collections.Businesses = Backbone.Collection.extend({
	url: "/api/businesses",
	model: GoAgainV2.Models.Business,

	getOrFetch: function(id) {
		var business = this.get(id);

		if(!business) {
			business = new GoAgainV2.Models.Business({ id: id });
			business.fetch({
				success: function () {
					this.add(business);
				}.bind(this)
			});
		} else {
			business.fetch();
		}

		return business;
	}
});

GoAgainV2.businesses = new GoAgainV2.Collections.Businesses();