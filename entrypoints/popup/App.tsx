import { useState, useEffect } from 'react';
import './App.css';
import { storage } from '@wxt-dev/storage'

function App() {
  const [ignores, setIgnores] = useState('');

  useEffect(() => {
    const loadIgnores = async () => {
      try {
        const savedIgnores = await storage.getItem('local:ignores');
        if (savedIgnores) {
          const parsed = JSON.parse(savedIgnores);
          if (Array.isArray(parsed)) {
            setIgnores(parsed.join('\n'));
          }
        } else {
          // Initialize with empty array if nothing exists
          await storage.setItem('local:ignores', JSON.stringify([]));
        }
      } catch (e) {
        console.error('Failed to load ignores:', e);
        // Initialize with empty array if there was an error
        await storage.setItem('local:ignores', JSON.stringify([]));
      }
    };
    loadIgnores();
  }, []);

  const saveIgnores = async () => {
    try {
      const textarea = document.getElementById('ignores') as HTMLTextAreaElement;
      const ignoresList = textarea.value.split('\n').filter(line => line.trim());
      await storage.setItem('local:ignores', JSON.stringify(ignoresList));
      setIgnores(textarea.value);
      console.log('Saved ignores:', ignoresList);
    } catch (e) {
      console.error('Failed to save ignores:', e);
    }
  };

  return (
    <>
      <h1>Serenity Now</h1>
      <h3>Let's get you some serenity back.</h3>
      {/* TODO dynamic site names and hosts, across all destinations */}
      {/* Eg. content.ts, wxtconfig.ts (which might be a source of truth) */}
      {/* Etc.  Right now only reddit is supported. */}
      <p>
        This extension will remove posts from Reddit that contain terms you specify.
        Enter one term per line in the box below, and click "Save Changes" to apply.
      </p>
      <p>Enter terms to ignore, one per line:</p>
      <div>
        <textarea 
          id="ignores"
          value={ignores}
          onChange={(e) => setIgnores(e.target.value)}
          rows={10}
          cols={40}
          placeholder="Enter terms to ignore, one per line"
        />
      </div>
      <div className="card">
        <button onClick={saveIgnores}>
          Save Changes
        </button>
      </div>
    </>
  );
}

export default App;
