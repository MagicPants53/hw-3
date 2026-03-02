import { Outlet } from 'react-router';

import Header from '@/App/components/Header';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
