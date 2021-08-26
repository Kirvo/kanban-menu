import { ChakraProvider } from '@chakra-ui/react';
import MealPlanner from './components/MealPlanner/MealPlanner';

import './App.css';

function App() {
  return (
    <ChakraProvider>
      <MealPlanner />
    </ChakraProvider>
  );
}

export default App;
