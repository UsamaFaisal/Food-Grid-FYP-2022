import {View, Text, Button} from 'react-native';
import {CardInput, StripeProvider, useStripe} from '@stripe/stripe-react-native';

const stripe = new StripeProvider('sk_test_51Mqh8jB58nmXMVgnvOGXPMri2VVkTXtTsh7sl54PaRyHKIAGcrnEXa4pJRNAtdm7xvk4VHugsRm2oTY4leDXbtkl00VIWBgE0i');

const PaymentGateway = () => {
  const [loading, setLoading] = useState(false);
  const {createToken} = useStripe();

  const sendTokenToServer = async (token) => {
    try {
      const response = await fetch('your-server-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: token.id}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send token to server');
      }
  
      // Do something with the response, such as show a success message to the user
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  };
  

  const handleSubmit = async () => {
    setLoading(true);
    const token = await createToken();
    await sendTokenToServer(token);
    setLoading(false);
  };

  return (
    <View>
      <CardInput
        cardStyle={{borderColor: '#333', borderRadius: 5, borderWidth: 1}}
        style={{height: 50, marginVertical: 10}}
        onCardChange={(cardDetails) => console.log(cardDetails)}
      />
      <Button title="Submit" onPress={handleSubmit} disabled={loading} />
    </View>
  );
};

export default PaymentGateway;
