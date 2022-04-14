import React, { Component } from "react";
import { withRouter } from "../../withRouter";

import Currencies from "./Currencies";
import Cart from "./Cart";

export class Actions extends Component {
  render() {
    return (
      <div className="action-container">
        <Currencies />
        <Cart />
      </div>
    );
  }
}

export default withRouter(Actions);
