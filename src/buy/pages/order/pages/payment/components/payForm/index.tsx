import "react-square-payment-form/lib/default.css";
import React from "react";
import SquarePaymentForm, {
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton
} from "react-square-payment-form";

interface IProps {
  amount: number;
  addressInfo: any;
  onGetNonce: (nonce: string) => void;
}

export class PayForm extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      errorMessages: []
    };
  }

  cardNonceResponseReceived = (
    errors: any,
    nonce: any,
    cardData: any,
    buyerVerificationToken: any
  ) => {
    if (errors) {
      this.setState({
        errorMessages: errors.map((error: any) => error.message)
      });
      return;
    }

    this.setState({ errorMessages: [] });
    console.log(nonce);
    console.log(cardData);
    console.log(buyerVerificationToken);
    this.props.onGetNonce(nonce);
  };

  createVerificationDetails(props: IProps) {
    const { amount, addressInfo } = props;
    const {
      userEmail = "",
      country = "US",
      city = "",
      userPhone = "",
      street = "",
      zipCode = "",
      firstName = "",
      lastName = ""
    } = addressInfo;
    console.log('!!!!!!!!!!!!!!!!!!!!!')
    console.log({
      amount: String(100 * amount),
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: lastName,
        givenName:firstName,
        email: userEmail,
        country: country, //
        city: city, //
        addressLines: [street],
        postalCode: zipCode,
        phone: userPhone //
      }
    });
    return {
      amount: String(100 * amount),
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: lastName,
        givenName:firstName,
        email: userEmail,
        country: country, //
        city: city, //
        addressLines: [street],
        postalCode: zipCode,
        phone: userPhone //
      }
    };
  }

  render() {
    const SANDBOX_APPLICATION_ID = "sandbox-sq0idb-A4499I96f3ueP7FIk1dt8g";
    const SANDBOX_LOCATION_ID = "D1YB0ZE5BHTRK";
    return (
      <div>
        <h1>Payment Page</h1>

        <SquarePaymentForm
          sandbox={true}
          applicationId={SANDBOX_APPLICATION_ID}
          locationId={SANDBOX_LOCATION_ID}
          cardNonceResponseReceived={this.cardNonceResponseReceived}
          createVerificationDetails={() => {
            return this.createVerificationDetails(this.props);
          }}
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
          {this.state.errorMessages.map((errorMessage: any) => (
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          ))}
        </div>
      </div>
    );
  }
}
