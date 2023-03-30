import { Stack, Grid, Container,Box, TextField, ButtonGroup, Button } from '@mui/material';
import { padding } from '@mui/system';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class HWSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hwSetNum: props.hwSetNum,
            hwSetCheckedOut: 0,
            hwSetCapacity: props.hwSetCapacity,
            val: 0,
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
            this.setState({hwSetCheckedOut: parseInt(this.state.hwSetCheckedOut) - parseInt(qty)});
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
            this.setState({hwSetCheckedOut: parseInt(this.state.hwSetCheckedOut) + parseInt(qty)});
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
            numHwSets: 4, // TODO: connect to display
            hwSets: [
                <HWSet hwSetNum={1} hwSetCapacity={100} authorizedUsers={["sarah, carlos"]}/>,
                <HWSet hwSetNum={2} hwSetCapacity={50}/>,
                <HWSet hwSetNum={3} hwSetCapacity={25}/>,
                <HWSet hwSetNum={4} hwSetCapacity={10}/>,
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
                            {this.state.hwSets}
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
                        <Project projectName={"Project 1"} authorizedUsers={"srd2729, cba9282, db392, mpa391"}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Project projectName={"Project 2"} authorizedUsers={"bds2342, dis2342, be323, mpo9382, dt432"}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Project projectName={"Project 3"} authorizedUsers={"dba123, ds342, mo436, pl583"}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Project projectName={"Project 4"} authorizedUsers={"srd2729"}/>
                    </Grid>
                </Grid>
            </div>
            
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Projects />);