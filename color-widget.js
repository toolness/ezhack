function ColorWidget(options) {
  Object.defineProperty(this, 'value', {
    get: this._getValue,
    set: this._setValue
  });

  this.codeMirror = options.codeMirror;
  this.title = options.title;
  this._buildWidget(options.from, options.to, options.defaultValue);
}

ColorWidget.prototype = {
  _buildWidget: function(from, to, value) {
    this.$el = $('<input class="hackable"></input>')
      .attr('title', this.title || 'Click to edit color.');
    this.el = this.$el[0];
    this.marker = this.codeMirror.markText(from, to, {
      replacedWith: this.el
    });
    this.picker = new jscolor.color(this.el, {hash: true});
    this.$el.cancelZoom();
    this.value = value || this.codeMirror.getRange(from, to);
  },
  _getValue: function() {
    return this.picker.toString();
  },
  _setValue: function(newValue) {
    this.picker.fromString(newValue);
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
