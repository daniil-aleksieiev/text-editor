import React, { useState, useEffect } from 'react';
import './ControlPanel.css';

export default function ControlPanel({ getSelected }) {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const format = (command) => {
    document.execCommand(command);

    switch (command) {
      case 'bold':
        setBold(true);
        break;
      case 'italic':
        setItalic(true);
        break;
      case 'underline':
        setUnderline(true);
        break
      default:
        setBold(false);
        setItalic(false);
        setUnderline(false);
    }
  }

  const navUpdate = () => {
    const range = window.getSelection().getRangeAt(0);
    const parentList = [];

    let tempBold = false;
    let tempItalic = false;
    let tempUnderline = false;

    function gettingNodeParents(node) {
      parentList.push(node);
      if (node.parentElement) gettingNodeParents(node.parentElement);
    }

    gettingNodeParents(range.startContainer.parentElement);

    parentList.forEach((element) => {
      if (element.tagName === 'B' || element.tagName === 'STRONG') tempBold = true;
      if (element.tagName === 'I') tempItalic = true;
      if (element.tagName === 'U') tempUnderline = true;
    });

    setBold(tempBold);
    setItalic(tempItalic);
    setUnderline(tempUnderline);

    getSelected()
  }

  useEffect(() => {
    const editor = document.getElementById('file');

    editor.onclick = navUpdate;
    editor.onkeydown = navUpdate;
    editor.onkeyup = navUpdate;
    editor.onkeypress = navUpdate;
    editor.onchange = navUpdate;
  });

  return (
    <div id="control-panel">
      <div id="format-actions">
        <button
          className={`format-action ${bold ? 'selected' : null}`}
          type="button"
          onClick={() => format('bold')}>
          <b>B</b>
        </button>

        <button
          className={`format-action ${italic ? 'selected' : null}`}
          type="button"
          onClick={() => format('italic')}>
          <i>I</i>
        </button>


        <button
          className={`format-action ${underline ? 'selected' : null}`}
          type="button"
          onClick={() => format('underline')}>
          <u>U</u>
        </button>
      </div>
      {/* {
        synonymsList.map(el => <p key={el.score}>{el.word}</p>)
      } */}
    </div>
  )
}