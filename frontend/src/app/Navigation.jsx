import React from 'react';

import { pageEntries } from "./pages.js";

export function Navigation({ activePage, onChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <strong>Controle</strong>
        <span>Equipamentos</span>
      </div>

      <nav>
        {pageEntries.map(([key, page]) => (
          <button
            key={key}
            className={activePage === key ? "nav-item active" : "nav-item"}
            onClick={() => onChange(key)}
            type="button"
          >
            {page.navLabel}
          </button>
        ))}
      </nav>
    </aside>
  );
}
