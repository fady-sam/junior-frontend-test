import React, { Component } from "react";
import { withRouter } from "../../withRouter";

import cart from "../../images/cart.png";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleCart() {
    document.getElementsByClassName("cart-content")[0].classList.toggle("show");
    document.getElementsByTagName("body")[0].classList.toggle("overlay");
  }

  render() {
    return (
      <div className="cart-container">
        <img
          src={cart}
          alt="cart"
          className="cart-icon"
          onClick={() => this.toggleCart()}
        />
        <div className="cart-content">
          <div>fady</div>
          <div>fady</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Cart);
