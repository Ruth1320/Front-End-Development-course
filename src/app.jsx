/* App.jsx - Main application component */
import { useState, useEffect } from 'react';
import Nav from './nav.jsx';
import AddCostPanel from './cost_panel.jsx';
import Report from './report.jsx';
import Pie_chart from './pie_chart.jsx';
import Bar_chart from './bar_chart.jsx';
import Settings from './settings.jsx';
import { C } from './styles.js';
import { RATES_URL_KEY, DEFAULT_RATES_URL } from './constants.js';
import { loadRates } from './db.js';

export default function App() {
  // Track which tab is currently active
  const [tab, setTab] = useState('Add Cost');

  /*
  On app load, fetch exchange rates from the user's saved URL.
  If no URL was saved, fall back to the default server URL.
  */
  useEffect(() => {
    const savedUrl = localStorage.getItem(RATES_URL_KEY);
    // Use saved URL if available, otherwise use default
    const urlToLoad = savedUrl || DEFAULT_RATES_URL;
    loadRates(urlToLoad);
  }, []);

  /*
  Returns the correct panel component based on the active tab.
  Each case maps a tab name to its corresponding component.
  */
  const renderPanel = () => {
    switch (tab) {
      case 'Add Cost': return <AddCostPanel />;
      case 'Report': return <Report />;
      case 'Pie Chart': return <Pie_chart />;
      case 'Bar Chart': return <Bar_chart />;
      case 'Settings': return <Settings />;
      default: return null;
    }
  };



  /*
 Render the main application layout, including the header section,
 navigation menu, and the currently selected panel, while applying
 the overall styling and structure of the Cost Manager interface.
 */

  return (
      <div style={{ minHeight: '100vh', background: C.bg }}>
        <div style={{ background: C.dark, padding: '24px 32px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, background: 'rgba(255,255,255,0.12)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              💰
            </div>
            <div>
              <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 21, fontWeight: 700, color: C.lightest, margin: 0 }}>
                Cost Manager
              </h1>
              <p style={{ color: C.accentLight, fontSize: 12, margin: 0, marginTop: 2 }}>
                Personal Expense Tracker
              </p>
            </div>
          </div>
        </div>
        <Nav active={tab} onChange={setTab} />
        <div style={{ paddingTop: 8 }}>
          {renderPanel()}
        </div>
      </div>
  );
}