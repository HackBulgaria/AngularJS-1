(function () {
  var rules = {
    '#textinput': function (val) {
      return val.length >= 3 && val.length <= 15;
    },
    '#passwordinput': function (val) {
      return val.length >= 10 && val.length <= 25;
    },
    '#passwordinput2': function (val) {
      return $('#passwordinput').val() === val;
    },
    '#ssninput': function (val) {
      return /^\d{3}-?\d{2}-?\d{4}$/.test(val);
    }
  };
  $('input').keyup(function () {
    var inputs = Object.keys(rules).join(','),
        promises = [];
    $(inputs).each(function () {
      var deferred = Q.defer(),
          rule = rules['#' + this.id];
      promises.push(deferred.promise);
      $(this).parent().removeClass('has-error');
      if (rule(this.value || '')) {
        deferred.resolve(this.id);
      } else {
        deferred.reject(this.id);
      }
    });
    Q.all(promises)
    .done(function () {
      console.log('Everything is valid!');
    })
    .fail(function (error) {
      $('#' + error).parent().addClass('has-error');
    });
  });
}());
