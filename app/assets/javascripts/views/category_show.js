GoAgainV2.Views.CategoryShow = Backbone.View.extend({
	template: JST['business/category_show'],

	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},

	render: function() {
		var renderedContent = this.template({
			businesses: this.collection
		});

		this.$el.html(renderedContent);

		var view = this;
		setTimeout(function() {
			view.$('.category-thumbnail').css("opacity", "1");
		}, 0);

		return this;
	}
});