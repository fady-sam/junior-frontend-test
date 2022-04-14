import React, { Component } from "react";
import { withRouter } from "../../withRouter";
import { axiosInstance as axios } from "../../axios";

import { connect } from "react-redux";
import { SET_CURRENCY } from "../../store/actions";

export class Currencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currency: null,
    };
  }

  getAllCurrencies = async () => {
    try {
      const response = await axios.post("", {
        query: `
            query{
              currencies{
                label
                symbol
              }
            }
          `,
      });
      if (response.data.data.currencies) {
        return response.data.data.currencies;
      }
      return [];
    } catch (error) {
      return error;
    }
  };

  componentDidMount = async () => {
    let currencies = await this.getAllCurrencies();
    console.log("🚀 ~ componentDidMount= ~ currencies", currencies);

    this.setState({
      currencies,
    });

    if (!this.props.currency && currencies && currencies.length > 0) {
      this.setState({
        currency: currencies[0],
      });
      this.props.setCurrency(currencies[0]);
    } else if (this.props.currency) {
      this.setState({
        currency: this.props.currency,
      });
    }
  };

  handleCurrencyChange = (event) => {
    if (JSON.parse(event.target.value).label !== this.state.currency.label) {
      this.setState({
        currency: JSON.parse(event.target.value),
      });
      this.props.setCurrency(JSON.parse(event.target.value));
    }
  };

  render() {
    return (
      <div className="currencies-container">
        <select
          id="currencySelect"
          value={JSON.stringify(this.state.currency)}
          onChange={this.handleCurrencyChange}
        >
          <option
            key={"default"}
            value={JSON.stringify(this.state.currency)}
            hidden
          >
            {this.state.currency ? this.state.currency.symbol : ""}
          </option>
          {this.state.currencies.map((currency) => (
            <option key={currency.label} value={JSON.stringify(currency)}>
              {currency.symbol} {currency.label}
            </option>
          ))}
        </select>
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
)(withRouter(Currencies));
