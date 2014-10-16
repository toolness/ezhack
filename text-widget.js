function TextWidget(options) {
  this.prompt = options.prompt;
  this.filter = options.filter || TextWidget.filters.none;
  Widget.call(this, options);
}

TextWidget.prototype = _.extend(Object.create(Widget.prototype), {
  defaultTitle: 'Click to edit text.',
  _createEl: function() {
    return $('<button class="hackable"></button>');
  },
  _onElAttached: function() {
    this.$el.click(function() {
      var oldValue = this.filter.unescape(this.value);
      var newValue = window.prompt(this.prompt || 'Enter a new value.',
                                   oldValue);
      if (newValue === null) return;
      this.value = this.filter.escape(newValue);
    }.bind(this));
  },
  _getValue: function() {
    return this.$el.text();
  },
  _setValue: function(newValue) {
    this.$el.text(newValue);
  }
});

TextWidget.filters = {
  none: {
    escape: function(s) { return s; },
    unescape: function(s) { return s; }
  },
  html: {
    escape: _.escape.bind(_),
    unescape: _.unescape.bind(_)
  },
  js: {
    escape: function(s) {
      return JSON.stringify(s);
    },
    unescape: function(s) {
      return esprima.parse(s).body[0].expression.value;
    }
  }
};
