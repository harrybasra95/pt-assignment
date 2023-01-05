import React from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto';
import './App.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
     <div>
          <h1>Hello</h1>
     </div>
);
