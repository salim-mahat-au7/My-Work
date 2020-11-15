import React, { Component } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";

import { fetchData } from "./api";

class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchdata = await fetchData();
    this.setState({ data: fetchdata });
  }

  handleCountryChange = async (country) => {
    console.log(country);
    const fetchdata = await fetchData(country);
    this.setState({ data: fetchdata, country: country });
  };

  render() {
    let { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src="https://i.ibb.co/7QpKsCX/image.png" alt="" />
        <h2> Covid Dashboard </h2>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />

     
      </div>
    );
  }
}

export default App;
