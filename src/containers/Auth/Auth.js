import React, { Component } from 'react';
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import style from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                triggered: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                    //ad regex validation here
                },
                valid: false,
                triggered: false
            },
        }

    }


    validateValue(value, rules) {
        //add logic for validation, bot in Auth and in ContactData
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }

    handleInputChange = (event, id) => {
        let copyForm = {
            ...this.state.controls
        }
        let updatedValue = {
            ...copyForm[id]
        }
        updatedValue.value = event.target.value;
        updatedValue.valid = this.validateValue(updatedValue.value, updatedValue.validation)
        updatedValue.triggered = true;
        copyForm[id] = updatedValue;

        //postpone formValidation
        // let isFormValid = true;

        // for (let key in copyForm) {
        //     isFormValid = copyForm[key].valid && isFormValid
        // }

        this.setState({
            controls: copyForm,
            // isFormValid
        })
    }

    submitHandler = event => {
        event.preventDefault()
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        this.props.authenticateUser(email, password)
    }


    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({ key, data: this.state.controls[key] })
        }
        const generateForms = formElements.map(form => {
            return (
                <Input
                    key={form.key}
                    elementType={form.data.elementType}
                    elementConfig={form.data.elementConfig}
                    value={form.data.value}
                    invalid={!form.data.valid}
                    shouldValidate={form.data.validation}
                    triggered={form.data.triggered}
                    handleChange={(event) => this.handleInputChange(event, form.key)}
                />
            )
        })

        return (
            <div className={style.AuthData}>
                <form onSubmit={this.submitHandler}>
                    {generateForms}
                    <Button btnType='Success'>SUBMIT</Button>
                    {/* <Button
                        btnType={this.state.isFormValid ? 'Success' : 'Disabled'}
                    >Log in</Button> */}
                </form>
            </div>
        )

    }
}

const mapDispatchToProps = dispatch => ({
    authenticateUser: (email, password) => dispatch(actions.auth(email, password))
})

export default connect(null, mapDispatchToProps)(Auth)