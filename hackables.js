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
  }
};
