import { useState, useEffect } from 'react';
import './App.css';
import  {storage} from '@wxt-dev/storage'

function App() {
  const [ignores, setIgnores] = useState('');

  useEffect(() => {
    storage.getItem('local:ignores').then((ignores) => {
      if (!ignores) {
        return;
      }
      return ignores
    });
  });

  const saveIgnores = () => {
    try {
      setIgnores(document.getElementById('ignores')!.textContent as string);
      storage.setItem('local:ignores', document.getElementById('ignores')!.textContent);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>WXT + React</h1>
      <div>
        <textarea id="ignores">
          {ignores}
        </textarea>
      </div>
      <div className="card">
        <button onClick={saveIgnores}>
          Save!
        </button>
      </div>
    </>
  );
}

export default App;
