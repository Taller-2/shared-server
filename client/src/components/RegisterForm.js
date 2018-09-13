import React from 'react'
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Grid, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

RegisterForm.propTypes = {
	onClick: PropTypes.func
}

export default class RegisterForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			mail: '',
			pass: '',
		}
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}

	submit = (event) => { 
		event.preventDefault(); this.props.onClick(this.state.name, this.state.pass, this.state.pass)
	}

	render() {
		return (
			<Grid>
				<Row className="show-grid">
					<Col xs={12} md={6} mdOffset={3}>
						<h1 style={{ textAlign: 'center' }} > Registrarse </h1>
					</Col>
				</Row>

				<Row className="show-grid">
					<Col xs={12} md={6} mdOffset={3}>
						<Form horizontal>
							<FormGroup controlId="name">
								<Col componentClass={ControlLabel} sm={2}>
									Nombre
								</Col>
								<Col sm={10}>
									<FormControl type="text" placeholder="Nombre" onChange={this.handleChange('name')}/>
								</Col>
							</FormGroup>

							<FormGroup controlId="email">
								<Col componentClass={ControlLabel} sm={2}>
									Email
								</Col>
								<Col sm={10}>
									<FormControl type="email" placeholder="Email" onChange={this.handleChange('email')}/>
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
