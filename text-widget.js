function TextWidget(options) {
  Object.defineProperty(this, 'value', {
    get: this._getValue,
    set: this._setValue
  });

  this.codeMirror = options.codeMirror;
  this.title = options.title;
  this.prompt = options.prompt;
  this.filter = options.filter || TextWidget.filters.none;
  this._buildWidget(options.from, options.to, options.defaultValue);
}

TextWidget.prototype = {
  _buildWidget: function(from, to, value) {
    this.$el = $('<button class="hackable"></button>')
      .attr('title', this.title || 'Click to edit text.');
    this.el = this.$el[0];
    this.marker = this.codeMirror.markText(from, to, {
      replacedWith: this.el
    });
    this.$el.click(function() {
      var oldValue = this.filter.unescape(this.value);
      var newValue = window.prompt(this.prompt || 'Enter a new value.',
                                   oldValue);
      if (newValue === null) return;
      this.value = this.filter.escape(newValue);
    }.bind(this));
    this.$el.cancelZoom();
    this.value = value || this.codeMirror.getRange(from, to);
  },
  _getValue: function() {
    return this.$el.text();
  },
  _setValue: function(newValue) {
    this.$el.text(newValue);
    this.marker.changed();
  },
  reflect: function() {
    // Reflect our current value into the code.
    //
    // Strangely, there is no way to change the value of the underlying
    // code that our marker points at without destroying the marker too,
    // so we'll need to rebuild our marker and associated widget.

    var where = this.marker.find();
    var value = this.value;
    this.marker.clear();
    this.codeMirror.replaceRange(value, where.from, where.to);
    var newTo = this.codeMirror.posFromIndex(
      this.codeMirror.indexFromPos(where.from) + value.length
    );
    this._buildWidget(where.from, newTo);
  }
};

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
