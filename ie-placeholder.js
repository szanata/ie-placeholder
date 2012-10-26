//IE placeholder;
$(function (){
  if ($.browser.msie) {
    function resetPlaceholder() {
      if ($(this).val() === '') {
        $(this).val($(this).attr('placeholder'))
          .attr('data-placeholder', true);
        if ($(this).is(':password')) {
          var field = $('<input />');
          $.each(this.attributes, function (i, attr) {
            if (attr.name !== 'type') {
              field.attr(attr.name, attr.value);
            }
          });
          field.attr({
            'type': 'text',
            'data-input-password': true,
            'value': $(this).val()
          });
          $(this).replaceWith(field);
        }
      }
    }

    $('[placeholder]').each(function () {
      resetPlaceholder.call(this);
    });
    $(document).on('focus', '[placeholder]', function () {
      if ($(this).attr('data-placeholder')) {
        $(this).val('').removeAttr('data-placeholder');
      }
    }).on('blur', '[placeholder]', function () { resetPlaceholder.call(this); });
    $(document).on('focus', '[data-input-password]', function () {
      var field = $('<input />');
      $.each(this.attributes, function (i, attr) {
        if (['type','data-placeholder','data-input-password','value'].indexOf(attr.name) === -1) {
          field.attr(attr.name, attr.value);
        }
      });
      field.attr('type', 'password').on('focus', function () { this.select(); });
      $(this).replaceWith(field);
      field.trigger('focus');
    });
});