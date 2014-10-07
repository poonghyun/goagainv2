GoAgainV2.Views.AboutMeEdit = Backbone.View.extend({
	template: JST['user/about_me_edit'],

	render: function () {
		var renderedContent = this.template({
			user: this.model
		});

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
					var $editLink = $('<a href="#" class="edit-about-me-link">Edit</a>');
					var $aboutMe = $('<p class="about-me-field">').text(user.attributes.about_me);

					$('.about-me-container').append($editLink);
					$('.about-me-container').append($aboutMe);
					
					view.remove();
				}
			})
		} else {
			this.$('.form-group').addClass('has-error');
		}
	}
});