import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../withRouter";

import { connect } from "react-redux";
import { SET_CURRENCY } from "../../store/actions";

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
  }

  setAmount = () => {
    let amount = 0;
    if (this.props.details.prices && this.props.details.prices.length > 0) {
      let selectedAmount = this.props.details.prices.find(
        (price) => price.currency.label === this.props.currency.label
      );

      amount = selectedAmount
        ? selectedAmount.amount
        : this.props.details.prices[0].amount;

      this.setState({
        amount,
      });
    }
  };

  componentDidMount = async () => {
    this.setAmount();
  };

  async componentDidUpdate(prevProps) {
    if (this.props.currency.label !== prevProps.currency.label) {
      this.setAmount();
    }
  }

  render() {
    return (
      <div className="product-details">
        {this.props.details && (
          <>
            <div className="brand">{this.props.details.brand}</div>
            <div className="name">{this.props.details.name}</div>
            <div className="price">PRICE</div>
            <div className="amount">
              {this.props.currency.symbol +
                " " +
                parseFloat(this.state.amount).toFixed(2)}
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: this.props.details.description,
              }}
            ></div>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { currency } = store;
  return { currency };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrency: (currency) => {
      dispatch({
        type: SET_CURRENCY,
        payload: currency,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetails));
