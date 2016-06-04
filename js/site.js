$(function() {
  var CONTAINER_ELEMENT = '.mdl-layout__content';
  var IDS = ['#banner', '#about', '#education', '#research', '#industry', '#honors'];

  var offsets = {};
  IDS.forEach(function(id) {
    offsets[id] = $(id).offset().top;
  });

  $('a').click(function(){
    $(CONTAINER_ELEMENT).animate({
      scrollTop: $(CONTAINER_ELEMENT).scrollTop() + $(this.hash).offset().top - 55
    }, 1000, 'swing');
    return false;
  });

  $(CONTAINER_ELEMENT).on('scroll', function() {
    IDS.forEach(function(id) {
      var offset = offsets[id];
      if ($(CONTAINER_ELEMENT).scrollTop() + 80 >= offset) {
        $('a').removeClass('active');
        $('a[href*=' + '"' + id + '"]').addClass('active');
      }
    });
  });
});