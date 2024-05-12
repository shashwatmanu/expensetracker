import logo from './logo.svg';
import './App.css';
import Expenses from './Components/Expenses';
import { SnackbarProvider, useSnackbar } from 'notistack'

function App() {
  return (
    <>
    <SnackbarProvider autoHideDuration={5000}>
    <Expenses/>
    </SnackbarProvider>
    </>
  );
}

export default App;
