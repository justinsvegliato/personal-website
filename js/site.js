function initialize_scroller(container, ids, jump) {
  var offsets = {};
  ids.forEach(function (id) {
    offsets[id] = $(id).offset().top;
  });

  $('a').click(function () {
    $(container).animate({
      scrollTop: $(container).scrollTop() + $(this.hash).offset().top - 55
    }, 1000, 'swing');
    return false;
  });

  $(container).on('scroll', function () {
    ids.forEach(function (id) {
      var offset = offsets[id];
      if ($(container).scrollTop() + jump >= offset) {
        $('a').removeClass('active');
        $('a[href*=' + '"' + id + '"]').addClass('active');
      }
    });
  });
}