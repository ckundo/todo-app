import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import './App.css';

interface AppProps {
  items?: string[];  
}

function App(props: AppProps) {
  const [items, setItems] = useState(props.items as string[]);

  const draftRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function handleItemSubmit(e: FormEvent) {
    e.preventDefault();
    const { current } = draftRef;
    const input = current! as HTMLInputElement;

    setItems([...items, input.value]);
    input.value = "";
  }

  return (
    <div className="app--container">
      <main className="app--list-container">
        <header>
          <h1>To Dos</h1>
        </header>
        <ul className="app--list-view">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <form className="app--list-add" onSubmit={handleItemSubmit}>
          <input
            type="text"
            ref={draftRef}
            placeholder="Example item"
            name="draft"
            aria-label="New item"
          />

          <input value="Add item" type="submit" />
        </form>
      </main>
    </div>
  );
}

export default App;
