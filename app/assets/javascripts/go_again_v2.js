window.GoAgainV2 = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var $main = $('#main');

  	new GoAgain.Routers.Router({
  		$rootEl: $main
  	});
  	
  	Backbone.history.start();
  }
};

$(document).ready(function(){
  GoAgainV2.initialize();
});