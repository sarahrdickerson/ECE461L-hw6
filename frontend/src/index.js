import { Stack, Grid, Container,Box, TextField, ButtonGroup, Button } from '@mui/material';
import { padding } from '@mui/system';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import axios from './api/axios';

class HWSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hwSetNum: props.hwSetNum,
            hwSetCheckedOut: 0,
            hwSetCapacity: props.hwSetCapacity,
            val: 0,
            projectId: props.projectId,
        };
    }

    changeHandler = e => {
        this.setState({ val: e.target.value });
    };

    checkIn(qty) {
        if (qty <= 0) {
            alert("Cannot checkin negative quantity");
        } else if (qty > this.state.hwSetCheckedOut) {
            alert("Cannot checkin more than checked out");
        } else if (qty <= this.state.hwSetCheckedOut) {
            let nQty = parseInt(qty);
            let pid = parseInt(this.state.projectId);
            fetch(`/api/checkin_hardware/${pid}/${nQty}?hwSetNum=${this.state.hwSetNum}`,
                {
                    method: "POST",
                }
            ).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data)
                if(data.success){
                    this.setState({hwSetCheckedOut: parseInt(this.state.hwSetCheckedOut) - parseInt(qty)});
                    alert(qty + " hardware checked in.")
                } else {
                    alert("Unable to check in hardware here.")
                }
            }).catch((error) => {
                console.log(error)
                alert("Unable to check in hardware.")
            });
            return;
        } else {
            alert("Invalid quantity");
        }
        return;
    };

    checkOut(qty) {
        if (qty <= 0) {
            alert("Cannot checkout negative quantity");
            return;
        } else if (qty > this.state.hwSetCapacity - this.state.hwSetCheckedOut) {
            alert("Cannot checkout more than available");
            return;
        } else if (qty <= this.state.hwSetCapacity - this.state.hwSetCheckedOut) {
            // this.setState({hwSetCheckedOut: parseInt(this.state.hwSetCheckedOut) + parseInt(qty)});
            let nQty = parseInt(qty);
            let pid = parseInt(this.state.projectId);
            fetch(`/api/checkout_hardware/${pid}/${nQty}?hwSetNum=${this.state.hwSetNum}`,
                {
                    method: "POST",
                }
            ).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data)
                if(data.success){
                    this.setState({hwSetCheckedOut: parseInt(this.state.hwSetCheckedOut) + parseInt(qty)});
                    alert(qty + " hardware checked out.")
                } else {
                    alert("Unable to check out hardware here.")
                }
            }).catch((error) => {
                console.log(error)
                alert("Unable to check out hardware.")
            });
            return;
        } else {
            alert("Invalid quantity");
            return;
        }
    };

    render() {
        return (
            <div>
                <Stack direction={'row'} spacing={2}>
                    <p>HWSet {this.state.hwSetNum}: {parseInt(this.state.hwSetCapacity)-parseInt(this.state.hwSetCheckedOut)}/{this.state.hwSetCapacity}</p>
                    <form onSubmit={e => e.preventDefault()}>
                        <TextField id="outlined-basic" label="Enter Qty" variant="outlined" onChange={this.changeHandler} size={'small'}/>
                        <ButtonGroup variant="outlined" size="small" aria-label="outlined small button group">
                            <Button type="submit" style={{marginLeft: 10}} onClick={() => this.checkIn(this.state.val)}>Check In</Button>
                            <Button type="submit" onClick={() => this.checkOut(this.state.val)}>Check Out</Button>
                        </ButtonGroup>
                    </form>
                </Stack>
            </div>
        );
    }
    
}
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: props.projectName,
            projectId: props.projectId,
            numHwSets: 4, // TODO: connect to display
            hwSets: [
                <HWSet hwSetNum={1} hwSetCapacity={100} projectId={props.projectId} authorizedUsers={["sarah, carlos"]}/>,
                <HWSet hwSetNum={2} hwSetCapacity={50} projectId={props.projectId}/>,
                <HWSet hwSetNum={3} hwSetCapacity={25} projectId={props.projectId}/>,
                <HWSet hwSetNum={4} hwSetCapacity={10} projectId={props.projectId}/>,
            ],
            joined: false,
            authorizedUsers: props.authorizedUsers,
        };
    }

    joinLeave() {
        this.setState({joined: !this.state.joined});
    }

    render() {
        let interactButton;
        let hexColor;
        if (this.state.joined) {
            interactButton = <Button variant="contained" color="secondary" onClick={() => this.joinLeave()}>Leave Project</Button>;
            hexColor = '#F9F2FB';

        } else {
            interactButton = <Button variant="contained" color="primary"  onClick={() => this.joinLeave()}>Join Project</Button>;
            hexColor = '#f2f6fc';
        }
        return (
            <div>
                <Box sx={{ background: hexColor, padding: 1.5 }}>
                    <Grid container spacing={0} justifyContent={"center"}>
                        <Grid item xs={12}>
                            <h2>{this.state.projectName}</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <p>Authorized Users: {this.state.authorizedUsers}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <p>HW Sets:</p>
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.hwSets.map((hwSet, index) => (
                                <div key={index}> {hwSet} </div>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            {interactButton}
                        </Grid>
                    </Grid>
                </Box>
            </div>
            
        );
    }
}

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numProjects: 4,
        };
    }
    
    addProject() {
        this.setState({numProjects: this.state.numProjects + 1});
        this.projects.push(<Project />);
    }

    render() {
        return (
            <div>
                <h1>Projects</h1>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Project projectName={"Project 1"} projectId={1} authorizedUsers={"srd2729, cba9282, db392, mpa391"}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Project projectName={"Project 2"} projectId={2} authorizedUsers={"bds2342, dis2342, be323, mpo9382, dt432"}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Project projectName={"Project 3"} projectId={3} authorizedUsers={"dba123, ds342, mo436, pl583"}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Project projectName={"Project 4"} projectId={4} authorizedUsers={"srd2729"}/>
                    </Grid>
                </Grid>
            </div>
            
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Projects />);