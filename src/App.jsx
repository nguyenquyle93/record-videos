import React, {useState} from 'react';
import './App.css';
import ChatBot from 'react-simple-chatbot';

function App() {
  const array = []
  for (let i = 1; i < 10; i++){
      array.push({
      id: i,
      message: 'What is your name?',
      trigger: i+1,
    });
    array.push({
      id: i+1,
      user: true,
      trigger: i+2,
    })
  }
  array.push(
      {
      id: 11,
      message: 'Hi {previousValue}, nice to meet you!',
      end: true,
    }
  )

  const [id, setId] = useState('1');
  const [trigger, setTrigger] = useState('2');
  const [message, setMessage] = useState('What is your name?');
  const [steps, setSteps] = useState(array);


  return (
    <div className="App">
      <ChatBot
        headerTitle="Speech Synthesis"
        speechSynthesis={{ enable: true, lang: 'en' }}
        steps={steps}
        onPerfEntry={console.log('11111')}
      />
    </div>
  );
}

export default App;
