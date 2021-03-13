import { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    handleOrder = event => {
        event.preventDefault()
        this.setState({ loading: true })
        let formData = {}
        for (let formKey in this.state.orderForm) {
            formData[formKey] = this.state.orderForm[formKey].value
        }
        const currentOrder = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData
        }
        axios.post('/orders.json', currentOrder)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(rej => {
                this.setState({ loading: false })
            })
    }

    handleInputChange = (event, id) => {
        let copyForm = {
            ...this.state.orderForm
        }
        let updatedValue = {
            ...copyForm[id]
        }
        updatedValue.value = event.target.value;
        copyForm[id] = updatedValue;
        this.setState({
            orderForm: copyForm
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
                    handleChange={(event) => this.handleInputChange(event, form.key)}
                />
            )
        })

        let form = (<form>
            {generateForms}
            <Button btnType="Success" click={this.handleOrder}>ORDER</Button>
        </form>)
        if (this.state.loading) {
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

export default ContactData