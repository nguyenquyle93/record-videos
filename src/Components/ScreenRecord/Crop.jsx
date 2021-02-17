import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { Slider, Switch } from 'antd';
import Cropper from 'react-easy-crop'
import { Button } from 'antd';
import { get, set, entries, del } from 'idb-keyval';
// import VideoCrop from 'video-crop';

// var ffmpeg = require('fluent-ffmpeg');
// var command = ffmpeg();

 export default function Crop() {
   const [selected, setSelected] = useState();
   const handleLoad = () => {
     get('2021-02-09 13:52:53').then((value) => setSelected(value));
   }

   const testFile = '/2021-02-09 13_52_53.webm';
   const outFile = '/out.webm';
   const opts = {
    input: testFile,
    output: outFile,
    x: [500, 600],
    y: [250, 500],
    height: [100, 300],
    width: [100, 300],
    fps: 60 // optional 
   };
   
   const handleEdit = () => {
      console.log('1111111')
   }
  return (
    <>
      <button onClick={handleLoad}> Load </button>
      <button onClick={handleEdit}> Edit </button>
    <video
      src={selected?URL.createObjectURL(selected):""}
      width={520}
      height={480}
      controls
      />
      </>
  )
}
