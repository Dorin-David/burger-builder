import {isEmpty, isEmail, isAlphaNumeric, isPostalCode} from 'validator';
import lookUpCountry from 'country-code-lookup';

export function handleErrorMessage(error){
    const customErrorMessages = {
        'INVALID_EMAIL': 'Sorry, your email is invalid',
        'EMAIL_EXISTS': 'Sorry, your email is already taken',
        'EMAIL_NOT_FOUND': 'Sorry, we didn\'t find your email',
        'INVALID_PASSWORD': 'Invalid password, please try again',
        'TOO_MANY_ATTEMPTS_TRY_LATER': 'We have blocked all requests from this device due to unusual activity. Try again later.'
    } 
    return (customErrorMessages[error.message] || error.message)
}

//helper function for validating form inputs
export function validateFormValue(value, rules) {
    let isValid = true;
    if (rules.required) {
        isValid = !isEmpty(value) && isValid
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if(rules.isAlphaNumeric){
        isValid = isAlphaNumeric(value) && isValid
    }
    if(rules.isEmail){
        isValid = isEmail(value) && isValid
    }
    if(rules.isPostalCode){
        isValid = isPostalCode(value, 'any') && isValid
    }
    if(rules.isCountry){
        const countries = lookUpCountry.countries.map(country => country.country)
        isValid = countries.includes(value) && isValid
    }
    return isValid
}