import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {tasks: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/todo')
            .then(response => response.json())
            .then(data => this.setState({tasks: data}));
    }
    async remove(id) {
        await fetch(`/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
            this.setState({tasks: updatedTasks});
        });
    }
    
    render() {
        const {tasks, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const taskList = tasks.map(task => {
            return <tr key={task.id}>
                <td style={{whiteSpace: 'nowrap'}}>{task.tname}</td>
                <td>{task.deadline}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/todo/" + task.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(task.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <Container fluid>
                <br></br>
                <div className="float-right">
                        <Button style={{float: 'right', }} color="success" tag={Link} to="/todo/new">Add Task</Button>
                </div>
                    <h3>Tasks</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Deadline</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default TaskList;