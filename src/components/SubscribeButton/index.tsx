import { useSession, signIn } from 'next-auth/client';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';


interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if(!session){
      signIn('github');
      return;
    }
    // se está logado vou fazer a criação  da checkout session

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;

      // preciso redirecionar o usuario
      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button 
      type="button" 
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}