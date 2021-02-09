import React, {useState} from 'react';
import useMediaRecorder from '@wmik/use-media-recorder';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Clock from '../ScreenRecord/Clock';
import Player from '../ScreenRecord/Player';
import RecordRTC, { MediaStreamRecorder } from 'recordrtc';



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function LiveStreamPreview({ stream }) {
  let videoPreviewRef = React.useRef();

  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return <video ref={videoPreviewRef} width={520} height={480} autoPlay />;
}


export default function Record() {
  const [recordScreen, setRecordScreen] = useState(true);
  let mediaStream = navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  var config = {
    mimeType: 'video/webm', // vp8, vp9, h264, mkv, opus/vorbis
    audioBitsPerSecond : 256 * 8 * 1024,
    videoBitsPerSecond : 256 * 8 * 1024,
    bitsPerSecond: 256 * 8 * 1024,  // if this is provided, skip above two
    checkForInactiveTracks: true,
    timeSlice: 1000, // concatenate intervals based blobs
    ondataavailable: function() {} // get intervals based blobs
}
    var recorder = new MediaStreamRecorder(mediaStream, config);
  
  const stopRecording =  () => {
recorder.stop(function(blob) {
    // or
  var blob = recorder.blob;
  console.log(blob)
});
  }
  return (
    <article style={{textAlign: 'center'}}>
      <h1>Screen recorder</h1>
      <span style={{fontSize:24, margin: 10}}>
       Status :
      </span>
      {/* <span style={{color: 'red', fontSize:24, margin: 10}}>
        {error ? `${status} ${error.message}` : status === 'recording' ?
          <span>
            {status}
            <Spin indicator={antIcon} />
            <Clock />
          </span>
          : status}
      </span> */}
      <section>
        <button
          type="button"
          onClick={() => recorder.record()}
          // disabled={status === 'recording'}
          // style={{
          //   color: status === 'recording' ?
          //     'gray' : 'red', 
          //   borderColor: status === 'recording' ?
          //     '' : 'red', 
          // }}
        >
          Start recording
        </button>
        <button
          // style={{
          //   paddingLeft: 10,
          //   color: status !== 'recording' ?
          //     'gray' : 'red',
          //   borderColor: status !== 'recording' ?
          //     '' : 'red',
          // }}
          type="button"
          onClick={stopRecording}
          // disabled={status !== 'recording'}
        >
          Stop recording
        </button>
        <p>
        Select video source
        <label style={{paddingLeft:10}}>
          <input
            type="radio"
            checked={recordScreen}
            onChange={() => setRecordScreen((prevState) => !prevState)}
          />{' '}
          Screen
        </label>
        <label style={{paddingLeft:10}}>
          <input
            type="radio"
            checked={!recordScreen}
            onChange={() => setRecordScreen((prevState) => !prevState)}
          />{' '}
          Camera
        </label>
      </p>
      </section>
      {/* <LiveStreamPreview stream={liveStream} /> */}
      {/* {
        status === 'stopped' && <Player srcBlob={mediaBlob} status={status} />
      } */}
    </article>
  );
}