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
	},

	getActive: function() {
		this._active = this._active || new GoAgainV2.Models.Business();
		return this._active;
	},

	parse: function(response) {
		if(response.closest) {
			this.getActive().set(response.closest)

			if(response.closest.photos) {
				this.getActive().photos().set(response.closest.photos);
			}

			delete response.closest;
		}

		return response.others || response;
	}
});

GoAgainV2.businesses = new GoAgainV2.Collections.Businesses();