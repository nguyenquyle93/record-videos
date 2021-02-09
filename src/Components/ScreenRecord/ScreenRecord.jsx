import React, {useState} from 'react';
import useMediaRecorder from '@wmik/use-media-recorder';
import ScreenCrop from './ScreenCrop';
import VideoEdit from './VideoEdit';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Clock from './Clock';
import Player from './Player';


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


export default function ScreenRecord2() {
  const [recordScreen, setRecordScreen] = useState(true);
  let {
    error,
    status,
    liveStream,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
  } = useMediaRecorder({
    recordScreen: recordScreen,
    blobOptions: {
      type: 'video',
      mimeType: 'video/webm;codecs=vp9',
      disableLogs: true,
      // bitsPerSecond: 128000,
      // frameRate: 30,
      // frameInterval: 90,
      // sampleRate: 96000,
      // desiredSampRate: 16000,
      // bufferSize: 16384,
      // bitrate: 128000,
      // video: 'HTMLVideoElement',
    },
    mediaStreamConstraints: { audio: true, video: true }
  });

  return (
    <article style={{textAlign: 'center'}}>
      <h1>Screen recorder</h1>
      <span style={{fontSize:24, margin: 10}}>
       Status :
      </span>
      <span style={{color: 'red', fontSize:24, margin: 10}}>
        {error ? `${status} ${error.message}` : status === 'recording' ?
          <span>
            {status}
            <Spin indicator={antIcon} />
            <Clock />
          </span>
          : status}
      </span>
      <section>
        <button
          type="button"
          onClick={() => startRecording(1000)}
          disabled={status === 'recording'}
          style={{
            color: status === 'recording' ?
              'gray' : 'red', 
            borderColor: status === 'recording' ?
              '' : 'red', 
          }}
        >
          Start recording
        </button>
        <button
          style={{
            paddingLeft: 10,
            color: status !== 'recording' ?
              'gray' : 'red',
            borderColor: status !== 'recording' ?
              '' : 'red',
          }}
          type="button"
          onClick={stopRecording}
          disabled={status !== 'recording'}
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
      <LiveStreamPreview stream={liveStream} />
      {
        status === 'stopped' && <Player srcBlob={mediaBlob} status={status} />
      }
    </article>
  );
}