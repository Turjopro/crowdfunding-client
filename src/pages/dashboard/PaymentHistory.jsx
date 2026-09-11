import useRole from '../../hooks/useRole';
import CreatorPaymentHistory from './CreatorPaymentHistory';
import SupporterPaymentHistory from './SupporterPaymentHistory';

const PaymentHistory = () => {
  const [role, roleLoading] = useRole();

  if (roleLoading) return <p className="text-center py-10">Loading...</p>;

  if (role === 'creator') return <CreatorPaymentHistory />;
  if (role === 'supporter') return <SupporterPaymentHistory />;

  return <p className="text-center py-10">No payment history available.</p>;
};

export default PaymentHistory;