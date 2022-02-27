import React, { FormEvent, useEffect, useRef, useState } from 'react';
import './App.css';

import axe, { ContextObject } from 'axe-core';
import { Result } from 'axe-core';
interface AppProps {
  items?: string[];  
}

function App(props: AppProps) {
  const [items, setItems] = useState(props.items as string[]);

  const draftRef = useRef(null);

  const idRef = useRef(null);

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

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      let timeout: NodeJS.Timeout;

      const runAxe = async () => {
        try {
          const { current: element } = idRef;

          const { violations } = await axe.run(element! as ContextObject);

          if (violations.length > 0) {
            console.log(`🚨 Axe Errors for element`, idRef.current, violations);
          }
        } catch (error: any) {
          console.log((error as Error).message);
        }
      };

      runAxe();
    }
  });

  return (
    <div ref={idRef} className="app--container">
      <main className="app--list-container">
        <header>
          <h1>To Dos</h1>
          <h3>Test app</h3>
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
