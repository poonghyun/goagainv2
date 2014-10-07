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
	},

	events: {
		"click .new-about-me-link": "newAboutMe",
		"click .edit-about-me-link": "editAboutMe",
		"click .user-avatar-container a": "uploadAvatar"
	},

	newAboutMe: function(event) {
		event.preventDefault();

		var formView = new GoAgainV2.Views.AboutMe({
			model: this.model
		});

		$('.new-about-me-link').replaceWith(formView.render().$el);
	},

	editAboutMe: function(event) {
		event.preventDefault();

		$('.about-me-field').remove();

		var formView = new GoAgainV2.Views.AboutMeEdit({
			model: this.model
		});

		$('.edit-about-me-link').replaceWith(formView.render().$el);
	},

	uploadAvatar: function(event) {
		event.preventDefault();

		var model = this.model;

		filepicker.setKey("AcXki9SpLRNG0P2Y00ihoz");

		filepicker.pick(
		  {
		    mimetypes: ['image/*', 'text/plain'],
		    container: 'window',
		    services:['COMPUTER', 'FACEBOOK', 'GMAIL'],
		  },
		  function(Blob){
		  	model.set({ avatar_url: Blob.url });
		  	model.save();
		  }
		);
	}

});