import React, { Component, Fragment } from 'react';
import { deleteRecord, updateStatus } from '../action/statuesActions';
import { connect } from 'react-redux';

class IndividualCard extends Component {
    state = {
        displayStatus: false
    };


    handleStatus = (e) => {
        e.stopPropagation();
        this.setState((prevState) => ({
            displayStatus: false,
        }));
        this.props.updateStatus(this.props.record, e.target.innerText);

    }

    handleDelete = () => {
        this.props.deleteRecord(this.props.record);
    }

    handleClick = (status) => {
        if (status.toLowerCase() === 'pending') {
            this.setState((prevState) => ({
                displayStatus: !prevState.displayStatus,
            }));
        }
    }
    handleZero(diff, date){
        if(diff === 1 && (Number(date.getMonth())+1).toString().length > 1){
            return  date.getMonth() + 1
        }else if(diff === 1 && (Number(date.getMonth())+1).toString().length === 1){
            return  '0'+(date.getMonth() + 1);
        }else if(diff ===0 && date.getDate().toString().length > 1){
            return  date.getDate();
        }else if(diff === 0 && date.getDate().toString().length === 1){
            return  '0'+date.getDate(); 
        }else{
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        }
        
    }
    render() {
        const {
            record: {
                title,
                status,
                created_at,
                updated_at
            },
        } = this.props;
        const {
            displayStatus
        } = this.state;
        const updateDate = new Date(updated_at);
        const updated = `${updateDate.getFullYear()}-${this.handleZero(1, updateDate)}-${this.handleZero(0, updateDate)}`;
        const createdDate = new Date(created_at);
        const created = `${createdDate.getFullYear()}-${this.handleZero(1, createdDate)}-${this.handleZero(0, createdDate)}`;
        const cursor = status.toLowerCase() === "pending" ? { cursor: "pointer", textAlign: "left", width: "20%"} : null
        return (
            <Fragment>
                <td style={{ textAlign: "left", padding: '10px' }}>
                    {title}
                </td>
                <td style={cursor} onClick={() => { this.handleClick(status) }}>
                    <div style={{ display: "flex" }}>
                        <div>
                            {status}
                        </div>
                        {displayStatus &&
                            <div className="App-Status-bar">
                                <div onClick={this.handleStatus}>
                                    Approved
                </div>
                                <div onClick={this.handleStatus}>
                                    Denied
                </div>
                            </div>
                        }
                    </div>
                </td>
                <td style={{ textAlign: "left", width: "20%" }}>
                    {created}
                </td>
                <td style={{ textAlign: "left" }}>
                    {updated}
                </td>
                <td style={{ textAlign: "left", textDecoration: 'underline' }}>
                    <div onClick={this.handleDelete}>Delete</div>
                </td>

            </Fragment>
        );
    }

}


const mapDispatchToProps = (dispatch) => ({
    deleteRecord: record => dispatch(deleteRecord(record)),
    updateStatus: (record, updatestatus) => dispatch(updateStatus(record, updatestatus)),
});


export default connect(null, mapDispatchToProps)(IndividualCard);

