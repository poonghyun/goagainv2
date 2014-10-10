GoAgainV2.Views.ReviewNew = Backbone.View.extend({
	template: JST['review/review_new'],

	render: function () {
		var renderedContent = this.template({
			business: this.model
		});

		this.$el.html(renderedContent);

		return this;
	},

	events: {
		"click .add-pictures": "addPictures"
	},

	addPictures: function (event) {
		event.preventDefault();

		var view = this;

		filepicker.setKey("AcXki9SpLRNG0P2Y00ihoz");

		filepicker.pickMultiple({},
			function(Blobs) {
				_(Blobs).each(function(Blob) {
					var imgTagString = '<img class="form-thumbnail" src="' + Blob.url + '">';
					var inputTagString = '<input type="hidden" name="review[photos][urls][]" value="' + Blob.url + '">';
					$('.form-photos').append(imgTagString);
					$('.form-photos').append(inputTagString);
				})
			}
		);
		
		$('.add-pictures').remove();

	}
});