import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/Home';
import MovieDetail from '../components/MovieDetail';
import SeatSelection from '../components/SeatSelection';
import Ticket from '../components/Ticket'

export const Routes = () => (
    <Router>
        <Route exact path='/' component={Home}/>
        
        <Route exact path='/SeatSelection' component={SeatSelection}/>

        <Route exact path='/Ticket' component={Ticket}/>
        

           
        
    </Router>
)