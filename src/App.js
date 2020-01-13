import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';


import StatusDropdown from './component/statusDropdown';
import { getRequests } from './services/Api';
import { setRecords, setFilteredRecords } from './action/statuesActions';
import TableRecords from './component/TableRecords';

class App extends Component {

  async componentDidMount() {
    const records = await getRequests();
    const updateArray = records.map((record) => {
      var updateIndex = record.updated_at.indexOf('-06');
      var updateUTC = new Date(record.updated_at.slice(0, updateIndex).trim()).toUTCString();
      var updateUTCDate = new Date(updateUTC);
      var createdIndex = record.created_at.indexOf('-06');
      var createUTC = new Date(record.created_at.slice(0, createdIndex).trim()).toUTCString();
      var createUTCDate = new Date(createUTC);
      return {
        ...record,
        updated_at: updateUTCDate.getTime(),
        created_at: createUTCDate.getTime(),
      }
    });
    const sortedArray = updateArray.sort((a, b) => {
      return b.updated_at - a.updated_at
    });

    this.props.setRecords(sortedArray);
    this.props.setFilteredRecords(sortedArray);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Requests
        </header>
        <StatusDropdown />
        <TableRecords />
      </div>
    );
  }

}


const mapDispatchToProps = (dispatch) => ({
  setRecords: records => dispatch(setRecords(records)),
  setFilteredRecords: records => dispatch(setFilteredRecords(records)),
});

export default connect(null, mapDispatchToProps)(App);
