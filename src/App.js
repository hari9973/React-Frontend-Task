import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SignIn from "./components/SignIn"
import DashBoard from "./components/DashBoard"
import { Provider } from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Switch>
          <Route path="/" component={SignIn} exact />
          <Route path="/dashboard" component={DashBoard}/>
        </Switch>
        </SnackbarProvider>
    </Provider>
  );
}

export default App;
