import logo from './logo.svg';
import './App.css';
import {FormatBold, FormatItalic, Link, AddCircle, FormatListBulleted, FormatListNumbered} from '@mui/icons-material'
import Select from 'react-select';
import React, { useState } from 'react'
import $ from 'jquery'
import { WithContext as ReactTags } from 'react-tag-input';

import Navbar from './screens/navbar.js';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function App() {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [result, setResult] = useState([]);

  function actionBold(){
    document.execCommand('bold')
  }

  function actionItalic(){
    document.execCommand('italic')
  }

  function actionLink(){
    document.execCommand('link')
  }

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  function makeQuery(){
    fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${query}&origin=*`)
      .then(response => response.text())
      .then((response) => {
             var data = JSON.parse(response)
             var key = Object.keys(data.query.pages)
             var text = data.query.pages[key].extract
             console.log(text)
             setResult(text)
      })
}

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div className="addBit">
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h2>Add Bit </h2>
            <AddCircle className="addButton" />
          </div>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <input className="bitTitle" type="text" onChange={(e) => setQuery(e.target.value)} />
            <button class="button-23" role="button" onClick={makeQuery}>Import Note</button>
          </div>
          <div className="toolbar">
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="bottom"
              autocomplete
            />
            <Select
              style={{width: "7em"}}
              isMulti={true}
              options={options}
            />
            <ul className="tools">
              <li><a className="action" onMouseDown={(event) => event.preventDefault()} onClick={actionBold}><FormatBold /></a></li>
              <li><a className="action" onMouseDown={(event) => event.preventDefault()} onClick={actionItalic}><FormatItalic /></a></li>
              <li><a className="action" onMouseDown={(event) => event.preventDefault()} onClick={actionLink}><Link /></a></li>
              <li><a className="action" onMouseDown={(event) => event.preventDefault()} onClick={actionLink}><FormatListBulleted /></a></li>
              <li><a className="action" onMouseDown={(event) => event.preventDefault()} onClick={actionLink}><FormatListNumbered /></a></li>
            </ul>
          </div>
          <div contentEditable="true" data-text="Enter description" className="contentsBit">{result}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
