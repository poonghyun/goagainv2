$.BusinessSearch = function (el) {
  var businessMatcher = function(businesses) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
   
      // an array that will be populated with substring matches
      matches = [];
   
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
   
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(businesses, function(i, business) {
        if (substrRegex.test(business.name)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: business });
        }
      });
   
      cb(matches);
    };
  };

  $.ajax({
    url: "api/businesses",
    dataType: "json",
    method: "GET",
    success: function (results) {
      $('#typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'results',
        displayKey: function(result){ return result.value.name; },
        source: businessMatcher(results),
        templates: {
          empty: [
            '<div class="empty-search-result">',
            'No results',
            '</div>'
          ].join('\n'),
          suggestion: Handlebars.compile('<div class="business-search-result" data-b-id={{value.id}}><a href="#/business/{{value.id}}">{{value.name}}</a></div>')
        }
      })

      $search = $('#typeahead');

      $search.keyup(function(e) {
        if(e.keyCode === 13) {

          var suggestions = $('.tt-suggestion').length;

          if($search.typeahead('val') && (suggestions > 0)) {
            var b_id = $('.tt-suggestion > .business-search-result').data('b-id');
            var fragmentUrl = "/business/" + b_id;
            Backbone.history.navigate(fragmentUrl, { trigger: true });

            $search.typeahead('val', '');
          }
        } else {
          // handle non-enter input

          // case for arrow keys
          // case for typing

        }
      })

    } // end of success callback
  });

};

$.fn.businessSearch = function () {
  return this.each(function () {
    new $.BusinessSearch(this);
  });
};