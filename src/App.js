import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/index";
import { saveState } from "./store/localStorage";

import Header from "./layouts/Header";
import Category from "./pages/Category";

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    total: store.getState().total,
    amount: store.getState().amount,
    currency: store.getState().currency,
  });
});

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <CartContainer cart={cartItems} /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Category />} />
              <Route path=":categoryName" element={<Category />} />
              {/* <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route>
            <Route path="dashboard" element={<Dashboard />} /> */}
              {/* <Route path="*" element={<Category />} /> */}
            </Route>
          </Routes>
        </Router>
      </Provider>
    );
  }
}

export default App;
