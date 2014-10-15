var hackables = {
  'type-the-word': function(codeMirror) {
    return {
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
      })
    };
  }
};
