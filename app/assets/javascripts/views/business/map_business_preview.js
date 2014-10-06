GoAgainV2.Views.MapBusinessPreview = Backbone.View.extend({
	template: JST['business/map_business_preview'],

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},

	render: function() {
		var renderedContent = this.template({
			business: this.model
		});

		this.$el.html(renderedContent);

		return this;
	}
});