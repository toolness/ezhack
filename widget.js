function Widget(options) {
  Object.defineProperty(this, 'value', {
    get: this._getValue,
    set: this._setValueAndChangeMarker
  });

  this.codeMirror = options.codeMirror;
  this.title = options.title;
  this._buildWidget(options.from, options.to, options.defaultValue);
}

Widget.prototype = {
  _setValueAndChangeMarker: function(newValue) {
    this._setValue(newValue);
    this.marker.changed();
  },
  _buildWidget: function(from, to, value) {
    this.$el = $(this._createEl())
      .attr('title', this.title || this.defaultTitle);
    this.el = this.$el[0];
    this.marker = this.codeMirror.markText(from, to, {
      replacedWith: this.el
    });
    this._onElAttached();
    this.$el.cancelZoom();
    this.value = value || this.codeMirror.getRange(from, to);
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
