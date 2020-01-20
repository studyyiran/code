import 'react-square-payment-form/lib/default.css'
import React from 'react';
import SquarePaymentForm, {
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton
} from 'react-square-payment-form'

interface IProps {
  amount: number,
}

export class PayForm extends React.Component<IProps, any> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      errorMessages: [],
    }
  }

  cardNonceResponseReceived = (errors: any, nonce: any, cardData: any, buyerVerificationToken: any) => {
    if (errors) {
      this.setState({ errorMessages: errors.map((error: any) => error.message) })
      return
    }

    this.setState({ errorMessages: [] })
    alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
  }

  createVerificationDetails() {
    const {amount} = this.props
    return {
      amount: String(100 * amount),
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: "",
        givenName: "John",
        email: "jsmith@example.com",
        country: "GB",
        city: "London",
        addressLines: ["1235 Emperor's Gate"],
        postalCode: "SW7 4JA",
        phone: "020 7946 0532"
      }
    }
  }

  render() {
    const SANDBOX_APPLICATION_ID = "sandbox-sq0idb-A4499I96f3ueP7FIk1dt8g"
    const SANDBOX_LOCATION_ID = "D1YB0ZE5BHTRK"
    return (
      <div>
        <h1>Payment Page</h1>

        <SquarePaymentForm
          sandbox={true}
          applicationId={SANDBOX_APPLICATION_ID}
          locationId={SANDBOX_LOCATION_ID}
          cardNonceResponseReceived={this.cardNonceResponseReceived}
          createVerificationDetails={this.createVerificationDetails}
        >
          <fieldset className="sq-fieldset">
            <CreditCardNumberInput />
            <div className="sq-form-third">
              <CreditCardExpirationDateInput />
            </div>

            <div className="sq-form-third">
              <CreditCardPostalCodeInput />
            </div>

            <div className="sq-form-third">
              <CreditCardCVVInput />
            </div>
          </fieldset>

          <CreditCardSubmitButton>
            Pay ${this.props.amount}
          </CreditCardSubmitButton>
        </SquarePaymentForm>

        <div className="sq-error-message">
          {this.state.errorMessages.map((errorMessage: any) =>
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          )}
        </div>
      </div>
    )
  }
}