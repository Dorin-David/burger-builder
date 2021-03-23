import { Component } from "react";
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                triggered: false

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                triggered: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false,
                triggered: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                triggered: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                triggered: false
            },
            deliveryType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true
            },
        },
        isFormValid: false,
    }

    handleOrder = event => {
        event.preventDefault()
        let formData = {}
        for (let formKey in this.state.orderForm) {
            formData[formKey] = this.state.orderForm[formKey].value
        }
        const currentOrder = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            orderData: formData
        }

        this.props.orderBurger(currentOrder)
    }

    validateValue(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length === rules.minLength && isValid
        }
        return isValid
    }


    handleInputChange = (event, id) => {
        let copyForm = {
            ...this.state.orderForm
        }
        let updatedValue = {
            ...copyForm[id]
        }
        updatedValue.value = event.target.value;
        updatedValue.valid = this.validateValue(updatedValue.value, updatedValue.validation)
        updatedValue.triggered = true;
        copyForm[id] = updatedValue;

        let isFormValid = true;

        for (let key in copyForm) {
            isFormValid = copyForm[key].valid && isFormValid
        }

        this.setState({
            orderForm: copyForm,
            isFormValid
        })
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({ key, data: this.state.orderForm[key] })
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

        let form = (<form>
            {generateForms}
            <Button btnType={this.state.isFormValid ? 'Success' : 'Disabled'}
                click={this.handleOrder}
                disabled={!this.state.isFormValid}>ORDER</Button>
        </form>)
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact data</h4>
                {form}
            </div>
        )
    }
}


const mapStateToProp = state => ({
    ingredients: state.burgerRdx.ingredients,
    totalPrice: state.burgerRdx.totalPrice,
    loading: state.orderRdx.loading
})

const dispatchToProps = dispatch => ({
    orderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
})

export default connect(mapStateToProp, dispatchToProps)(withErrorHandler(ContactData, axios))