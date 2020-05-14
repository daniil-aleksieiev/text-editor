import React, { useState, useEffect } from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";

export default function App() {
  const [selectedWord, setSelectedWord] = useState();
  const [synonymsList, setSynonymsList] = useState()

  const getSelected = () => {
    const selection = document.getSelection().toString();
    if (selection.length > 0) {
      setSelectedWord(selection.split(' ')[0])
    } else {
      setSynonymsList(false)
    }
  }

  useEffect(() => {
    const url = `https://api.datamuse.com/words?rel_syn=${selectedWord}`

    if (selectedWord) {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.length > 0 ? setSynonymsList(data) : setSynonymsList('')
        });
    }

  }, [selectedWord])

  return (
    <div className="App">
      <header>
        <span>Simple Text Editor</span>
      </header>
      <main>
        <ControlPanel getSelected={getSelected} />
        <FileZone synonymsList={synonymsList} selectedWord={selectedWord} />
      </main>
    </div>
  );
};
