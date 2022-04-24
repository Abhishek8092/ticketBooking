import React ,{useState}from "react";
import { connect } from "react-redux";
import { fetchAvailabilities } from "../SeatSelection/actions";
import "../Ticket/index.css";
// import { Icon } from 'antd';
import { EyeOutlined, BarcodeOutlined } from "@ant-design/icons";
import { Button } from "antd";


const index = (selectedSeats, selectedMovie) => {

  console.log(selectedMovie);
  return (
    <div className="mainContainer">
      <div className="container">
        <div className="left">
          <div className="up">PVR Cinemas</div>
          <div className="down">
            <div>
              <h3>Movie name</h3>
              <h4>Movie Name</h4>
              <h2>RS:-{selectedSeats.totalCost}</h2>
              <h4>Price</h4>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="up1">
            <EyeOutlined />
          </div>
          <div className="down1">
              <div>
            {/* <h3>{selectionReducer.selectedSeats}</h3> */}
            <h1 >
              <BarcodeOutlined />
            </h1>
            </div>
          </div>
        </div>
       {/* <div><Button>Print</Button></div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedSeats: state.selectionReducer.selectedSeats,
    totalCost: state.selectionReducer.totalCost,
    selectedMovie: state.selectionReducer.selectedMovie,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAvailabilities: () => dispatch(fetchAvailabilities()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
