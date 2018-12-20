import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        isPending: state.requestRobots.isPending,
        robots:state.requestRobots.robots,
        error:state.requestRobots.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
};

//STATE, smart components
class App extends Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }
    
    // onSearchChange(event) {
    //     this.setState({searchfield: event.target.value })
    // } REPLACED BY REDUX
    
    render(){
        
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
          return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        
    if (isPending) {
        return <h1>Loading</h1>
    } else{    
    return (
    <div className ='tc fixed w-100 background' >
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
        <CardList robots={filteredRobots} />
        </Scroll>
    </div>
        
    );
    }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);