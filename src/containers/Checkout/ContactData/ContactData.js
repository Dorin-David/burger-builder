import { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: 'Costello 312',
            postalCode: 45012
        },
        loading: false
    }

    handleOrder = event => {
        event.preventDefault()
        console.log(this.props.ingredients)
        this.setState({ loading: true })

        const currentOrder = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: this.state.name,
                address: {
                    street: 'Costello 312',
                    zipCode: '43051',
                },
                email: 'myEmail@mail.com',
                payment: 'cash'
            },
            deliveryType: 'standart',
        }
        // we've got the base url set in our axios instance
        axios.post('/orders.json', currentOrder)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(rej => {
                this.setState({ loading: false })
            })
    }

    render() {

        let form = (<form>
            <input type="text" name="name" placeholder="Your name" />
            <input type="email" name="email" placeholder="Your email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="postalCode" placeholder="Postal Code" />
            <Button btnType="Success" click={this.handleOrder}>ORDER</Button>
        </form>)
        if (this.state.loading) {
            form =  <Spinner />;
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