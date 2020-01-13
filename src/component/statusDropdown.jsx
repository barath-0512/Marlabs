import React, { Component } from 'react';

import { setStatus, setFilteredRecords } from '../action/statuesActions';
import { connect } from 'react-redux';

class StatusDropdown extends Component {
  handleStatusChange = (e) =>{
    const {
        setStatus,
        setFilteredRecords,
        records,
    } = this.props;
    const statusValue = e.target.value;
    if(statusValue === 'all'){
        setFilteredRecords(records);
    } else {
        const filteredRecords = records.filter(record => record.status.toLowerCase() === statusValue.toLowerCase());
        setFilteredRecords(filteredRecords);
    }
    setStatus(statusValue);
  }

  render(){
      const {
        status
      } = this.props;
    return (
        <section className="App-filter-section">
            <div>
            Filter by status:
            </div>
            <select className="App-filter-dropdown" onChange={this.handleStatusChange} value={status}>
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="denied">Denied</option>
            </select>
        </section>
    );
  }

}

const mapStateToProps = (state) => ({
    status : state.status,
    records: state.records,
});

const mapDispatchToProps = (dispatch) => ({
    setStatus: status => dispatch(setStatus(status)),
    setFilteredRecords: records => dispatch(setFilteredRecords(records))
});


export default connect(mapStateToProps, mapDispatchToProps)(StatusDropdown);
