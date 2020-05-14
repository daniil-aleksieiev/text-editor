import React from 'react';
import './FileZone.css';

export default function FileZone({ synonymsList, selectedWord }) {
  return (
    <div id="file-zone">

      <div id="file"
        contentEditable="true"
        designmode="on"
        spellCheck="true"
      />

      {
        synonymsList && (
          <div className="synonyms">
            <p>Synonyms for <strong>"{selectedWord}"</strong>:</p>
            <ul>
              {
                synonymsList.map((el, idx) => (
                  <li key={idx}>{el.word.replace(/[.-]/g, ' ')}</li>
                ))
              }
            </ul>
          </div>
        )
      }

    </div>
  )
};
