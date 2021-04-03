import { query as q } from 'faunadb';

import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

// o que essa função vai fazer? é salvar as informações no banco de dados
export async function saveSubscription(subscriptionId: string, customerId: string) {
  // vou buscar o ID do usuário no banco do FaunaDB com {customerId}
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )
  
  //vou buscar todos os dados dá subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // salvar apenas os dados que eu quero
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  // Salvar todos dados da subscription no FaunaDB
  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
}