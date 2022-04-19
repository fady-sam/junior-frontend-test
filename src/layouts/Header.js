import React, { Component } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { withRouter } from "../withRouter";
import logo from "../images/a-logo.png";
import { axiosInstance as axios } from "../axios";

import { connect } from "react-redux";
import { ADD_ITEM } from "../store/actions";

import Navigation from "../components/header/Navigation";
import Actions from "../components/header/Actions";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: {},
    };
  }

  getAllCategories = async () => {
    try {
      const response = await axios.post("", {
        query: `
            query{
              categories{
                name
              }
            }
          `,
      });
      // this.props.addItem();
      if (response.data.data.categories) {
        return this.setActiveCategory(response.data.data.categories);
      }
      return [];
    } catch (error) {
      return error;
    }
  };

  setActiveCategory = (categories) => {
    let selectedCategory = {};
    if (this.props.router.params && this.props.router.params.categoryName) {
      let currentCategory = categories.findIndex(
        (cat) => cat.name === this.props.router.params.categoryName
      );
      selectedCategory = categories[currentCategory];
      if (currentCategory && currentCategory !== -1) {
        categories[currentCategory].active = 1;
      } else {
        this.props.router.navigate("");
        selectedCategory = categories.find((cat) => cat.name === "all");
        selectedCategory.active = 1;
      }
    } else {
      selectedCategory = categories.find((cat) => cat.name === "all");
      selectedCategory.active = 1;
    }
    this.setState({
      selectedCategory,
    });

    return categories;
  };

  setSelectedCategory = async (categoryName) => {
    let activeCategory = this.state.categories.find((cat) => cat.active);

    if (activeCategory && activeCategory.name !== categoryName) {
      if (categoryName === "all") {
        this.props.router.navigate("");
      } else {
        this.props.router.navigate(categoryName);
      }
      this.state.categories.map((cat) => {
        if (cat.name === categoryName) {
          cat.active = 1;
          this.setState({
            selectedCategory: cat,
          });
        } else {
          cat.active = 0;
        }
      });
    }
  };

  componentDidMount = async () => {
    let categories = await this.getAllCategories();
    // this.props.addItem();
    this.setState({
      categories,
    });
    ////////////////////////////////////////////
    console.log("this.props :>> ", this.props);
  };

  render() {
    return (
      <>
        <header className="header">
          <Navigation
            categories={this.state.categories}
            setSelectedCategory={this.setSelectedCategory}
          />
          <div className="logo-container">
            <NavLink to="/" onClick={() => this.setSelectedCategory("all")}>
              <img src={logo} alt="logo" className="logo" />
            </NavLink>
          </div>
          <Actions />
        </header>
        {/* <nav>
        <Link to="invoices">Invoices</Link> |{" "}
        <Link to="dashboard">Dashboard</Link>
      </nav> */}
        <div className="content">
          <div className="content-overlay"></div>
          <Outlet context={{ selectedCategory: this.state.selectedCategory }} />
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  const { cart, total, amount, currency } = store;
  return { cart, total, amount, currency };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log("🚀 ~ mapDispatchToProps ~ ownProps", ownProps);
  return {
    addItem: () =>
      dispatch({
        type: ADD_ITEM,
        payload: {
          id: 2,
          title: "Google pixel Max",
          price: 399.99,
          img: "shorturl.at/ajkq9",
          amount: 1,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
