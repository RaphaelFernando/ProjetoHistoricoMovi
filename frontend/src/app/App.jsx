import React from 'react';

import { useState } from "react";

import { Navigation } from "./Navigation.jsx";
import { pages } from "./pages.js";

export default function App() {
  const [activePage, setActivePage] = useState("cadastro");
  const Page = pages[activePage].component;

  return (
    <div className="app-shell">
      <Navigation activePage={activePage} onChange={setActivePage} />
      <main className="main-content">
        <header className="page-header">
          <p>Historico de Movimentacao</p>
          <h1>{pages[activePage].title}</h1>
        </header>
        <Page />
      </main>
    </div>
  );
}
