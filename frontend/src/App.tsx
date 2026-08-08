import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Button } from "@/components/ui/button"

function App() {

  return (
  <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">
        Rspack + React + Tailwind
      </h1>
        <Button>
          TEST
        </Button>
    </div>
  );
}

export default App;
