import React from 'react';
import GroupDetails from './components/GroupDetails';

function App() {
  return (
    <div className="App">
      {/* Vercel'deki demonun çalışması için ana ekran componentini gösteriyoruz */}
      <GroupDetails groupId="test-grup-1" groupName="Ankara Tatili" />
    </div>
  );
}

export default App;
