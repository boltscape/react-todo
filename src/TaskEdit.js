import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class TaskEdit extends Component {

    emptyItem = {
        tname: '',
        deadline: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const task = await (await fetch(`/todo/${this.props.match.params.id}`)).json();
            this.setState({item: task});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/todo' + (item.id ? '/' : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/todo');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Task' : 'Add Task'}</h2>;
    
        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="tname">Task</Label>
                        <Input type="text" name="tname" id="tname" value={item.tname || ''}
                               onChange={this.handleChange} autoComplete="Name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="deadline">Deadline</Label>
                        <Input type="text" name="deadline" id="deadline" value={item.deadline || ''}
                               onChange={this.handleChange} autoComplete="Deadline"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/todo">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(TaskEdit);