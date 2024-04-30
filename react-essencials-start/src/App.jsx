import Header from './components/Header/Header'
import CoreConcepts from './components/CoreConcepts';
import { useState } from 'react';
import Examples from './components/Examples';
function App() {
  const [selectedTopic, setSelectedTopic] = useState('')
  
  const handleSelect = (event) => {
    setSelectedTopic(event.target.name)
  }
  
  return (
    <div>
      <Header />
      <main>
        <CoreConcepts />
        <Examples onSelect={handleSelect} selectedTopic={selectedTopic}/>
      </main>
    </div>
  );
}

export default App;
