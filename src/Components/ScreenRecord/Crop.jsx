import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { Slider, Switch } from 'antd';
import Cropper from 'react-easy-crop'
import { Button } from 'antd';
import { get, set, entries, del  } from 'idb-keyval';

 export default function Crop() {
   const [selected, setSelected] = useState();
   const handleLoad = () => {
     get('2021-02-09 13:52:53').then((value) => setSelected(value));
   }
   const handleEdit = () => {
     get('2021-02-09 13:52:53').then((value) => setSelected(value));
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
