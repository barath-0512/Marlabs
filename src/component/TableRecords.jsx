import React, { Component } from 'react';

import { connect } from 'react-redux';
import IndividualCard from './IndividualCard';
import { setRecords, setFilteredRecords } from '../action/statuesActions';

class TableRecords extends Component {


    render() {
        const {
            filteredRecords
        } = this.props;
        let sortedArray = [];
        if(filteredRecords && filteredRecords.length > 0){
            const updateArray = filteredRecords.map((record) => {
                var updateUTC = new Date(record.updated_at).toUTCString();
                var updateUTCDate = new Date(updateUTC);
                return {
                  ...record,
                  updated_at: updateUTCDate.getTime(),
                }
              });
              sortedArray = updateArray.sort((a, b) => {
                return b.updated_at - a.updated_at
              });
        }
        
        if (filteredRecords.length === 0) {
            return <p>No records found</p>
        }

        return (
            <table className='App-table'>
                <tr className="App-table-header">
                    <th>Title</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Deleted</th>
                </tr>

                {sortedArray.map(record => {
                    let color = null;
                    if (record.status.toLowerCase() === 'denied') {
                        color = '#fbd5d0'
                    } else if (record.status.toLowerCase() === 'approved') {
                        color = '#ddf0db';
                    } else {
                        color = 'white'
                    }
                    return (
                        <tr key={record.id} style={{ backgroundColor: `${color}` }} className="App-table-data">
                            <IndividualCard record={record} />
                        </tr>
                    )
                }
                )}

            </table>
        );
    }

}

const mapStateToProps = (state) => ({
    filteredRecords: state.filteredRecords,
    status: state.status,
});
const mapDispatchToProps = (dispatch) => ({
    setRecords: records => dispatch(setRecords(records)),
    setFilteredRecords: records => dispatch(setFilteredRecords(records)),
  });



export default connect(mapStateToProps, mapDispatchToProps)(TableRecords);
