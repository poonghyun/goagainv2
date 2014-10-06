GoAgainV2.Views.AboutMe = Backbone.View.extend({
	template: JST['user/about_me'],

	render: function () {
		var renderedContent = this.template();

		this.$el.html(renderedContent);

		return this;
	},

	events: {
		"submit form": "submit"
	},

	submit: function(event) {
		event.preventDefault();

		if($(event.target).find('textarea').val()) {
			var view = this;
			var params = $(event.currentTarget).serializeJSON();

			var update = new GoAgainV2.Models.User();
			update.save({
				id: view.model.id,
				about_me: params.about_me
			},
			{
				success: function (user) {
					// append the about me with edit button, and remove
				}
			})
		} else {
			// signify error
		}
	}
});