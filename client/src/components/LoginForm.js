import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Grid, Row } from 'react-bootstrap'


class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			pass: '',
		}
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	}

	submit = (event) => { 
		event.preventDefault(); this.props.onClick(this.state.user, this.state.pass)
	}

	render() {
		return (
			<Grid>
				<Row className="show-grid">
					<Col xs={12} md={6} mdOffset={3}>
						<h1 style={{ textAlign: 'center' }} > Ingresar </h1>
					</Col>
				</Row>

				<Row className="show-grid">
					<Col xs={12} md={6} mdOffset={3}>
						<Form horizontal>
							<FormGroup controlId="user">
								<Col componentClass={ControlLabel} sm={2}>
									Email
								</Col>
								<Col sm={10}>
									<FormControl type="email" placeholder="Email" onChange={this.handleChange('user')}/>
								</Col>
							</FormGroup>

							<FormGroup controlId="pass">
								<Col componentClass={ControlLabel} sm={2}>
									Password
								</Col>
								<Col sm={10}>
									<FormControl type="password" placeholder="Password" onChange={this.handleChange('pass')}/>
								</Col>
							</FormGroup>

							<FormGroup>
								<Col smOffset={2} sm={10}>
									<Button type="submit" onClick={ this.submit }>
										Ingresar
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default LoginForm;