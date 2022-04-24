import { useEffect, useState } from 'react';
import './index.css';

const seatColors = {
    empty: "white",
    selected: "#006600",
    reserved: "lightgray",
    locked: "lightgray"
}


const Seat = (props) => {
    const [seatStatus, setStatus] = useState(props.seat);
    const [ state, setState ] = useState(false)
    const [ color, setColors ] = useState()

    const seatStyle = {
        backgroundColor: seatColors[seatStatus]
    };
  
      

    const onSeatSelection = () => {
        props.onSeatClick();
        if (seatStatus === "empty") {
            setStatus("selected");
          
        } else if (seatStatus === "selected") {
            setStatus("empty");
            
        }
        setState(true)
         }

         useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(seatStatus))
          
        },[])
         useEffect(()=>{
             const colorStyle1=props.test?'setColor1':'seat1'
            const colorStyle = state?"setColor":"seat"  
            setColors(props.test? colorStyle1:colorStyle)
           
         },[state])

    return (
        <div className={color} style={seatStyle} onClick={onSeatSelection} />
    )
};

export default Seat;