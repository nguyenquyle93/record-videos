import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { openDB } from 'idb/with-async-ittr.js';
import IndexDB from './IndexDB';
import { get, set, entries, del  } from 'idb-keyval';
import { format } from 'date-fns';



export default function Player({ srcBlob, audio, status }) {
  const [videoList, setVideoList] = useState([]);
  const [data, setData] = useState();
  const [selected, setSelected] = useState([]);

  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  if (status === 'stopped' && data !== srcBlob ) {
    setData(srcBlob)
    const date = format(new Date(), "yyyy-MM-dd' 'HH:mm:ss")
    set(date, srcBlob);
    get(date).then((value) => setSelected([date,value]));
    entries().then((entries) => setVideoList(entries));
  }
  
  const handleDelete = (value) => {
    del(value);
    entries().then((entries) =>
    {
      setVideoList(entries)
      setSelected(entries[entries.length-1])
    }
    );
  }

  const handleSelect = (value) => {
    setSelected(value);
  }

  console.log('111', selected)
  return (
    <div>
      <Row>
        <Col md={8} style={{textAlign: 'right'}}>
    <video
      src={selected?.[1]?URL.createObjectURL(selected[1]):""}
      width={520}
      height={480}
      controls
      />
      <div>
      <a href={selected?.[1]?URL.createObjectURL(selected[1]):""} target="_blank" download={`${selected[0]}.webm`}> Download </a>
        </div>
        </Col>
        <Col >
          <div style={{padding: 10
          }}>
          {videoList.map((item,index) => 
          {
            return <div
              key = {index}
              style={{
                color: selected?.[0] === item[0] ? 'blue' : ''
              }}
              onClick={() => handleSelect(item)}>
              {item[0]} - {Math.round(item[1].size / 1000000)}MB
              <span style={{color: 'red'}} onClick={() => handleDelete(item[0])}> DELETE</span>
            </div>
          }
            )}
            </div>
        </Col>
      </Row>
    </div>
  );
}

