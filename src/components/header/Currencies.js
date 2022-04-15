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

    this.changeCurrencyStyle(this);
  };

  changeCurrencyStyle = (component) => {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "currencies-container":*/
    x = document.getElementsByClassName("currencies-container");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML === this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = JSON.parse(s.options[i].value).symbol;
              component.handleCurrencyChange(JSON.parse(s.options[i].value));
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        if (!e.target.matches(".cart-icon")) {
          var dropdowns = document.getElementsByClassName("cart-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (
              openDropdown.classList.contains("show") &&
              !e.path.find(
                (p) =>
                  p.classList &&
                  p.classList.length > 0 &&
                  p.classList[0] === "cart-content"
              )
            ) {
              openDropdown.classList.remove("show");
              document
                .getElementsByTagName("body")[0]
                .classList.remove("overlay");
            }
          }
        }
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
    function closeAllSelect(elmnt) {
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt === y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    document.addEventListener("click", closeAllSelect);
  };

  handleCurrencyChange = (currency) => {
    if (currency.label !== this.state.currency.label) {
      this.setState({
        currency: currency,
      });
      this.props.setCurrency(currency);
    }
  };

  render() {
    return (
      <div className="currencies-container">
        <select
          value={JSON.stringify(this.state.currency)}
          onChange={this.handleCurrencyChange}
        >
          <option key={"default"} value={JSON.stringify(this.state.currency)}>
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
