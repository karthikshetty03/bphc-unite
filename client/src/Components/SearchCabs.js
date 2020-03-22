import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { set } from "mongoose";
import VerticalNav from "./VerticalNav";
import HorizontalNav from "./HorizontalNav";
import CabCard from "./CabCard";
import Select from "react-select";
import "../Stylesheets/main4.css";
class MyRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      date: Date.now,
      fromValue: "check",
      toValue: "check",
      options: []
    };

    this.filterResult = this.filterResult.bind(this);
    this.fromSelect = this.fromSelect.bind(this);
    this.toSelect = this.toSelect.bind(this);
  }

  filterResult() {
    axios
      .get("/api/fetchrequests")
      .then(response => {
        const data = response.data;
        const req = data.map((item, index) => {
          if (
            item.to == this.state.toValue &&
            item.from == this.state.fromValue
          ) {
            return (
              <CabCard
                key={index}
                requesterName={item.name}
                from={item.from}
                to={item.to}
                dateofrequest={item.date}
              ></CabCard>
            );
          }
        });
        this.setState({ requests: req });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    axios
      .get("/api/fetchrequests")
      .then(response => {
        const data = response.data;
        const req = data.map((item, index) => {
          return (
            <CabCard
              key={index}
              requesterName={item.name}
              from={item.from}
              to={item.to}
              dateofrequest={item.date}
            ></CabCard>
          );
        });
        this.setState({ requests: req });
      })
      .catch(err => console.log(err));

    axios
      .get("/api/events/get")
      .then(response => {
        const data = response.data;
        console.log(data);
        const optionList = data.map((event, index) => {
          return { value: event.eventName, label: event.eventName };
        });
        this.setState({ options: optionList });
      })
      .catch(err => {
        console.log(err);
      });
  }

  fromSelect(event) {
    this.setState({ fromValue: event.label });
  }

  toSelect(event) {
    this.setState({ toValue: event.label });
  }
  render() {
    const customStyles = {
      container: provided => ({
        ...provided,
        display: "inline-block",
        width: "250px",
        minHeight: "1px",
        textAlign: "left",
        border: "none"
      }),
      control: provided => ({
        ...provided,
        border: "2px solid #757575",
        borderRadius: "10px",
        minHeight: "1px",
        height: "40px"
      }),
      input: provided => ({
        ...provided,
        minHeight: "1px",
        height: "40px",
        marginLeft: "160px",
        background: "#fff"
      }),
      placeholder: provided => ({
        ...provided,
        marginTop: "0px"
      }),
      dropdownIndicator: provided => ({
        ...provided,
        minHeight: "1px",
        paddingTop: "0",
        paddingBottom: "0",
        color: "#757575"
      }),
      indicatorSeparator: provided => ({
        ...provided,
        minHeight: "1px",
        height: "24px"
      }),
      clearIndicator: provided => ({
        ...provided,
        minHeight: "1px"
      }),
      valueContainer: provided => ({
        ...provided,
        minHeight: "1px",
        height: "20px",
        paddingTop: "0",
        paddingBottom: "0"
      }),
      singleValue: provided => ({
        ...provided,
        minHeight: "1px",
        paddingBottom: "2px"
      })
    };
    return (
      <div>
        <div className="box" id="nav1">
          <VerticalNav />
        </div>
        <div className="columns">
          <div className="column is-one-fifth sideNav">
            <HorizontalNav />
          </div>
          <div className="control" id="c1">
            <label id="l4">From: </label>
            <div className="field" id="f3">
              <Select
                onChange={this.fromSelect}
                options={this.state.options}
                styles={customStyles}
                isSearchable={false}
              ></Select>
            </div>
            <label id="l5">To: </label>
            <div className="field" id="f4">
              <Select
                onChange={this.toSelect}
                options={this.state.options}
                styles={customStyles}
                isSearchable={false}
              ></Select>
            </div>
            <div class="control">
              <button class="button is-link" onClick={this.filterResult} id="but12">
                Submit
              </button>
            </div>
            <div className="cnt1" id="cnt1">
              {this.state.requests}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(MyRequests);