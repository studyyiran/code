import "react-square-payment-form/lib/default.css";
import './index.less';
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
  onGetNonce: (nonce: string, cardData: any, buyerVerificationToken: any) => void;
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
    this.props.onGetNonce(nonce, cardData, buyerVerificationToken);
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
    // console.log({
    //   amount: String(100 * amount),
    //   currencyCode: "USD",
    //   intent: "CHARGE",
    //   billingContact: {
    //     familyName: lastName,
    //     givenName:firstName,
    //     email: userEmail,
    //     country: country, //
    //     city: city, //
    //     addressLines: [street],
    //     postalCode: zipCode,
    //     phone: userPhone //
    //   }
    // });
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
    // const SANDBOX_APPLICATION_ID = "sandbox-sq0idb-lbWWeXLIzIqk9fmpO-mkqw";
    const SANDBOX_APPLICATION_ID = "sq0idp-CQMGFAMbQelpCDtFk6XuWQ";
    // const SANDBOX_LOCATION_ID = "D1YB0ZE5BHTRK";
    const SANDBOX_LOCATION_ID = "C10TQZ8Y1TH4T";
    return (
      <div className="pay-form-container">
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
            <div className="sq-form-third-container">
              <div >
                <CreditCardExpirationDateInput />
              </div>

              <div >
                <CreditCardPostalCodeInput />
              </div>

              <div >
                <CreditCardCVVInput />
              </div>
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
