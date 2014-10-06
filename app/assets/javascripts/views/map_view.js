GoAgainV2.Views.MapView = Backbone.View.extend({
	template: JST['business/map_view'],

	initialize: function() {
		var mView = this;
		this.listenTo(this.collection, "sync", _.debounce(mView.addAndBind, 100));

	  this.mapOptions = {
	    zoom: 15,
	    center: new google.maps.LatLng(37.7851859,-122.421548)
	  };

		this.markers = [];
	},

	render: function () {
		var renderedContent = this.template();

		this.$el.html(renderedContent);

		this.initializeMap();

		setTimeout(function() {
			var view = this;
			view.findBusinesses(view.map.getBounds(), view.map.getCenter());
		}.bind(this), 300)

		return this;
	},

	addAndBind: function () {
		google.maps.event.trigger(this.map, "resize");

		setTimeout(function() {
			this.addMarkers();
			setTimeout(function() {
				this.bindListeners();
			}.bind(this), 200)
		}.bind(this), 200)
	},

	bindListeners: function() {
	  for(var i = 0; i < this.markers.length; i++) {
			google.maps.event.addListener(this.markers[i], "click", function(marker) {
  			this.map.panTo(marker.latLng);
  			this.findBusinesses(this.map.getBounds(), this.map.getCenter());
  		}.bind(this));
	  }

	  var counter = 0;

		google.maps.event.addListener(this.map, 'dragend', function() {
			if(counter % 20 === 0) {
				this.findBusinesses(this.map.getBounds(), this.map.getCenter());
			}
			counter++;
	  }.bind(this));
	},

	initializeMap: function () {
	  this.map = new google.maps.Map(this.$('#map')[0], this.mapOptions);
	},

	addMarkers: function () {
	  for (var i = 0; i < this.markers.length; i++) {
	    this.markers[i].setMap(null);
	  }
		this.markers = [];

  	// place some markers based on the response
  	var closest = this.model;
  	var others = this.collection;

  	// place closest marker
	  var closestMarker = new google.maps.Marker({
	    position: new google.maps.LatLng(closest.get('x_coord'), closest.get('y_coord')),
	    map: this.map,
	    title: closest.get('name'),
	    icon: 'http://maps.google.com/mapfiles/ms/micons/yellow-dot.png'
	  });

	  this.markers.push(closestMarker);

	  // place other markers
	 	this.collection.each(function(other) {
	  	var otherMarker = new google.maps.Marker({
	  		position: new google.maps.LatLng(other.get('x_coord'), other.get('y_coord')),
	  		map: this.map,
	  		title: other.get('name'),
	  		icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
	  	});
	  	this.markers.push(otherMarker);
	  }, this);

	  // populate preview
	  var model = this.collection.getActive();
	  $(".map-business-preview").html(new GoAgainV2.Views.MapBusinessPreview({
	  	model: this.model
	  }).render().$el);
	},

	findBusinesses: function(bounds, center) {
		var xRange = bounds.Ea.k + "," + bounds.Ea.j;
		var yRange = bounds.va.k + "," + bounds.va.j;
		var centerString = center.k + "," + center.B;

		var view = this;

		view.collection.fetch({data: { query: [xRange, yRange, centerString] }})
	}
});