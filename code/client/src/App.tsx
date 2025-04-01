/*
  Composant react :
      capitaliser le nom du composant
      fonction JS/TS qui renvoie du HTML
*/

import './assets/css/reset.css';
import './assets/css/style.css';
import { UserProvider } from './provider/UserProvider';
import { RouterProvider } from "react-router-dom";
import router from './service/router';



const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider >
  );
}
export default App