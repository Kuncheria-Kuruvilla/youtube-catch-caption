import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function getCaptions(url, callBack) {
  callBack("Fetching captions please wait ... ");
  axios.get(url).then(({ data }) => {
    console.log(data);
    callBack(extract(data));
  })
  .catch(err => {
    callBack(`Oops something went wrong  ¯\\_(ツ)_/¯`);
  });
}

function extract(response) {
  var result_text = "";
  response.events ?
  response.events.forEach(event => {
    event.segs? event.segs.forEach(seg => {
      result_text += seg.utf8;
    }): result_text += "";
  }): result_text = "Sorry we were unable to process your request" ;
  return result_text;
}

function App() {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  return (
    <div className="App flex-container">
      <input
        className="padding-30"
        type="text"
        value={url}
        placeholder="Paste link here"
        onChange={event => {setUrl(event.target.value); setCaption("")}}
      ></input>
      <button
        className="button button-black"
        onClick={() => {
          getCaptions(url, setCaption);
        }}
      >
        Get captions
      </button>
      <textarea
        className="padding-30"
        value={caption}
        rows="25"
        cols="100"
      ></textarea>
    </div>
  );
}

export default App;
