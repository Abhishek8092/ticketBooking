import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom'

import './index.css';

import Header from '../Header';
import Seat from '../Seat';
import { fetchAvailabilities, setSelectedSeats, bookSelectedSeats } from './actions';

// const getLocalItems=()=>{
//     let list=localStorage.getItem('seat');
//     console.log(list);

//     if(list){
//         return JSON.parse(localStorage.getItem('list'));
//     }else{
//         return[];
//     }
// }

function SeatSelection({ allSeats, loading, apiError, fetchAvailabilities, setSelectedSeats, totalCost, bookSelectedSeats }) {
    //  const seat= localStorage.getItem("seat");
    //  const seatData=JSON.parse(seat);
    //  const a = seatData.length>=1?seatData[0].status:"ok"

    const [chair, setChair] = useState([
        {
        seatName:"A1",
        prise:200,
        key:''
    },
    {
        seatName:"A2",
        prise:200,
        key:''
    },
    {
        seatName:"A3",
        prise:200,
        key:''
    },
    {
        seatName:"A4",
        prise:200,
        key:''
    }

    

]
)

    //  console.log(a);
    const [test,setTest]=useState();
    console.log("test",test);
    
     const [sel,setSelect]=useState([]);

    useEffect(() => {
        fetchAvailabilities();
        // const seat= localStorage.getItem("seat");
        // const seatData=JSON.parse(seat);
        // const a = seatData.length>=1?seatData[0].status:"ok"
        // console.log(a);
        

    }, []);
    const history=useHistory();


    const onSeatClick = (seat,key) => {
        setSelectedSeats(seat.seat_number);
        const data = chair.filter((seat,id)=>{seat.key=key})
        console.log('data', data);
        setChair({chair:data})
        // setSelect([...sel,seat,key]);
        console.log("key",key)
         
   //     localStorage.setItem("booked",JSON.stringify(key));
    }
    console.log("key",chair)
    const onBookClick = () => {
    //     setTest("ram")
    // localStorage.setItem("seat",JSON.stringify())
        bookSelectedSeats();
        alert("Movie booked successfully");
        history.push('/Ticket');
     
    }

    const buttonColor = {
        backgroundColor: totalCost > 0 ? "#006600" : "lightgray"
    }

    return (
        <div>
            <Header />
            {loading ? <div className="seatSelection-msg">Loading...</div> :
                apiError ? <div className="seatSelection-msg">An error occurred. Please try after some time.</div> :
                    <div className="seatSelection-container">
                        <div className="seatSelection-screen">Screen this way!</div>
                        <div className="seatSelection-seatsParent">
                            { chair.map((seat,key) => {
                            return (
                            <Seat key={seat.seatName} seat={seat.prise}  onSeatClick={() => onSeatClick(seat,key)} />)
                        })
                        }
                        </div>
                        <div className="seatSelection-sampleSeats">
                            <div className="seatSelection-sampleSeatWrapper">
                                <Seat status="empty" /> Available
                            </div>
                            <div className="seatSelection-sampleSeatWrapper">
                                <Seat status="reserved" /> Unavailable
                            </div>
                            <div className="seatSelection-sampleSeatWrapper">
                                <Seat status="selected" /> Selected
                            </div>
                        </div>
                        <div className="seatSelection-cost">
                            Total Price: {totalCost}
                        </div>
                        <button style={buttonColor} onClick={onBookClick} disabled={totalCost === 0}>Book Movie</button>
                    </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        allSeats: state.selectionReducer.allSeats,
        selectedSeats: state.selectionReducer.selectedSeats,
        loading: state.selectionReducer.loading,
        apiError: state.selectionReducer.error,
        totalCost: state.selectionReducer.totalCost,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAvailabilities: () => dispatch(fetchAvailabilities()),
        setSelectedSeats: (data) => dispatch(setSelectedSeats(data)),
        bookSelectedSeats: () => dispatch(bookSelectedSeats())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SeatSelection))
