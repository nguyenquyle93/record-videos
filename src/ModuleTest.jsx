import React, {useState} from 'react';

function ModuleTest() {
  const [count, setCount] = useState(1);

  return (
    <div style={{height:200, width:200, borderStyle:'solid', borderColor: 'green', borderRadius: 10, background:'white', margin:20}}>
      <button style={{margin:45}} onClick={() => setCount(count + 1)}>
        Click Me
      </button>
      <p>{count}</p>
    </div>
  );
}

export default ModuleTest;
