import React, { Component } from "react";
import { withRouter } from "../../withRouter";

import { connect } from "react-redux";
import { INCREASE, GET_TOTALS } from "../../store/actions";
import Attributes from "./Attributes";

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      selectedAttributes: {},
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

  setSelectedAttributes = (id, item) => {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [id]: item,
      },
    }));
  };

  addToCart = () => {
    console.log("🚀 ~ addToCart");

    let item = {
      ...this.props.details,
      selectedAttributes: this.state.selectedAttributes,
      amount: 1,
    };
    console.log("🚀 ~ item", item);
    this.props.increase(item);
    this.props.getTotal();
  };

  componentDidMount = async () => {
    this.setAmount();
    console.log(
      "this.state.selectedAttributes :>> ",
      this.state.selectedAttributes
    );
  };

  async componentDidUpdate(prevProps) {
    if (this.props.currency.label !== prevProps.currency.label) {
      this.setAmount();
      console.log(
        "this.state.selectedAttributes :>> ",
        this.state.selectedAttributes
      );
    }
  }

  render() {
    return (
      <div className="product-details">
        {this.props.details && (
          <>
            <div className="brand">{this.props.details.brand}</div>
            <div className="name">{this.props.details.name}</div>
            <Attributes
              attributes={this.props.details.attributes}
              selectedAttributes={this.state.selectedAttributes}
              setSelectedAttributes={(id, item) =>
                this.setSelectedAttributes(id, item)
              }
            />
            <div className="price">PRICE</div>
            <div className="amount">
              {this.props.currency.symbol +
                " " +
                parseFloat(this.state.amount).toFixed(2)}
            </div>
            <button
              disabled={`${!this.props.details.inStock ? "disabled" : ""}`}
              type="submit"
              className="cart-btn"
              onClick={() => this.addToCart()}
            >
              ADD TO CART
            </button>
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
    increase: (item) => {
      dispatch({
        type: INCREASE,
        payload: item,
      });
    },
    getTotal: () => {
      dispatch({
        type: GET_TOTALS,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetails));
