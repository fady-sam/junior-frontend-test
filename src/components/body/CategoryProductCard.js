import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../withRouter";

import { connect } from "react-redux";

import ImageSlideShow from "./ImageSlideShow";

export class CategoryProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
  }

  setAmount = () => {
    let amount = 0;
    if (this.props.product.prices && this.props.product.prices.length > 0) {
      let selectedAmount = this.props.product.prices.find(
        (price) => price.currency.label === this.props.currency.label
      );

      amount = selectedAmount
        ? selectedAmount.amount
        : this.props.product.prices[0].amount;

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
      <div className="category-product-card">
        <ImageSlideShow
          gallery={this.props.product.gallery}
          productIndex={this.props.productIndex}
          showThumbnail={false}
          outStock={!this.props.product.inStock}
          category={this.props.product.category}
          productID={this.props.product.id}
        />
        <Link
          to={`/${this.props.product.category}/${this.props.product.id}`}
          style={{ textDecoration: "none" }}
        >
          <div
            className={`name ${!this.props.product.inStock ? "out-stock" : ""}`}
          >
            {this.props.product.name}
          </div>
          <div
            className={`amount ${
              !this.props.product.inStock ? "out-stock" : ""
            }`}
          >
            {this.props.currency.symbol +
              " " +
              parseFloat(this.state.amount).toFixed(2)}
          </div>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { currency } = store;
  return { currency };
}

export default connect(mapStateToProps)(withRouter(CategoryProductCard));
