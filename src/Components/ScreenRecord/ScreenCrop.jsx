import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Slider, Switch, Button } from 'antd';
import { Input } from 'antd';
import Cropper from 'react-easy-crop'
import  './style.css'

export default function ScreenCrop(video) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectH, setAspectH] = useState(4);
  const [aspectW, setAspectW] = useState(3);
    const [initialCroppedAreaPixels, setInitialCroppedAreaPixels] = useState(
    undefined
    )
  const [downloadLink, setDownloadLink] = useState();

    useEffect(() => {
    const croppedAreaPixels = JSON.parse(
      window.localStorage.getItem('croppedAreaPixels')
    )
    setInitialCroppedAreaPixels(croppedAreaPixels)
    }, [])
  
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        window.localStorage.setItem(
      'croppedAreaPixels',
      JSON.stringify(croppedAreaPixels)
    )
  }, [])

  return (
    <div>
      <div className="crop-container">
        <Cropper
          video={video}
          crop={crop}
          zoom={zoom}
          aspect={aspectH / aspectW}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      {/* <div className="controls">
        <Slider
          defaultValue={zoom}
          step={0.001}
          min={1}
          max={2}
          onChange={(value) => setZoom(value)}
        />
        <h2 style={{color: 'red'}}>
          Heigh Percent
        <Input placeholder="Heigh Percent" type="number" min={1} value={aspectH} onChange={value => setAspectH(value)}/>
        </h2>
        <h2 style={{color: 'red'}}>
          Width Percent
        <Input placeholder="Width Percent" type="number" min={1} value={aspectW} onChange={value => setAspectW(value)}/>
        </h2>
        <div style={{color: 'red', zIndex:999}}>
          Download
        </div>
      </div> */}
    </div>
  )
}
