import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchContextProvider } from './SearchContextProvider';
import { SearchFilters } from './SearchFilters';
import { Map } from './Map';
import { PropertyList } from './PropertyList';

const App = () => {
  return (
    <SearchContextProvider>
      <Router>
        <div className="App h-screen w-full flex flex-col">
          <main className="flex flex-col h-full">
            <div className="shrink-0">
            <SearchFilters />
            </div>
            <div className="flex flex-1 min-h-0">
              <div className="flex flex-1 min-w-0 overflow-hidden">
                <Map />
              </div>
              <div className="w-[660px] lg:w-[660px] md:w-full overflow-y-auto">
                <PropertyList />
              </div>
            </div>
          </main>
        </div>
      </Router>
    </SearchContextProvider>
  );
};

export default App;
