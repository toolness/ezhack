function ColorWidget(options) {
  Widget.call(this, options);
}

ColorWidget.prototype = _.extend(Object.create(Widget.prototype), {
  constructor: ColorWidget,
  defaultTitle: 'Click to edit color.',
  _createEl: function() {
    return $('<input class="hackable"></input>');
  },
  _onElAttached: function() {
    this.picker = new jscolor.color(this.el, {hash: true});
  },
  _getValue: function() {
    return this.picker.toString();
  },
  _setValue: function(newValue) {
    this.picker.fromString(newValue);
  }
});
