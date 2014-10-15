var hackables = {
  'type-the-word': function(codeMirror) {
    var fields = {
      'winbg': new ColorWidget({
        from: {line:9, ch:22}, to: {line:9, ch:29},
        title: 'Background color for win screen.',
        codeMirror: codeMirror
      }),
      'losebg': new ColorWidget({
        from: {line: 13, ch: 22}, to: {line: 13, ch: 29},
        title: 'Background color for lose screen.',
        codeMirror: codeMirror
      }),
      'lettercolor': new ColorWidget({
        from: {line: 36, ch: 11}, to: {line: 36, ch: 16},
        title: 'Color of letters to be typed.',
        defaultValue: '#000000',
        codeMirror: codeMirror
      }),
      'instructions': new TextWidget({
        from: {line: 47, ch: 26}, to: {line: 47, ch: 39},
        title: 'Instruction text.',
        prompt: 'Enter new instructions.',
        filter: TextWidget.filters.html,
        codeMirror: codeMirror
      }),
      'wintext': new TextWidget({
        from: {line: 114, ch: 22}, to: {line: 114, ch: 30},
        title: 'Text shown when player wins.',
        prompt: 'Enter new win text.',
        filter: TextWidget.filters.js,
        codeMirror: codeMirror
      }),
      'losetext': new TextWidget({
        from: {line: 144, ch: 22}, to: {line: 144, ch: 29},
        title: 'Text shown when player loses.',
        prompt: 'Enter new lose text.',
        filter: TextWidget.filters.js,
        codeMirror: codeMirror
      })
    };
    [
      {from: {line: 59, ch: 6}, to: {line: 59, ch: 11}},
      {from: {line: 60, ch: 6}, to: {line: 60, ch: 12}},
      {from: {line: 61, ch: 6}, to: {line: 61, ch: 12}},
      {from: {line: 62, ch: 6}, to: {line: 62, ch: 12}},
      {from: {line: 63, ch: 6}, to: {line: 63, ch: 12}},
      {from: {line: 64, ch: 6}, to: {line: 64, ch: 12}},
      {from: {line: 65, ch: 6}, to: {line: 65, ch: 11}}
    ].forEach(function(where, i) {
      fields['easy_word_' + i] = new TextWidget(_.extend(where, {
        title: 'A potential word for the player to type in easy mode.',
        prompt: 'Enter a new word for easy mode (must be all caps).',
        filter: TextWidget.filters.js,
        codeMirror: codeMirror
      }));
    });
    return fields;
  }
};
