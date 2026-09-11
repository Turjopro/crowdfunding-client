import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';

const packages = [
  { credits: 100, price: 10 },
  { credits: 300, price: 25 },
  { credits: 800, price: 60 },
  { credits: 1500, price: 110 },
];

const PurchaseCredit = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handlePay = async (pkg) => {
    setSelectedPackage(pkg);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !selectedPackage) return;

    setProcessing(true);
    setMessage('');

    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        credits: selectedPackage.credits,
      });

      const card = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: { email: user.email, name: user.displayName },
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        await axiosSecure.post('/payments', {
          email: user.email,
          credits: selectedPackage.credits,
          price: selectedPackage.price,
          transactionId: result.paymentIntent.id,
        });
        setMessage(`Successfully purchased ${selectedPackage.credits} credits!`);
        setSelectedPackage(null);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Payment failed. Try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Purchase Credit</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {packages.map((pkg) => (
          <button
            key={pkg.credits}
            onClick={() => handlePay(pkg)}
            className={`p-5 rounded-lg border text-left transition ${
              selectedPackage?.credits === pkg.credits
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <p className="text-2xl font-bold text-blue-600">{pkg.credits} credits</p>
            <p className="text-gray-500">${pkg.price}</p>
          </button>
        ))}
      </div>

      {selectedPackage && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <p className="mb-4 font-medium">
            Paying <span className="text-blue-600">${selectedPackage.price}</span> for{' '}
            <span className="text-blue-600">{selectedPackage.credits} credits</span>
          </p>

          <div className="border rounded p-3 mb-4">
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>

          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {processing ? 'Processing...' : `Pay $${selectedPackage.price}`}
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-sm text-blue-700">{message}</p>}
    </div>
  );
};

export default PurchaseCredit;