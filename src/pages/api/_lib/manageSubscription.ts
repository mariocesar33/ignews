import { query as q } from 'faunadb';

import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

// o que essa função vai fazer? é salvar as informações no banco de dados
export async function saveSubscription(
  subscriptionId: string, 
  customerId: string,
  createAction = false
) {
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
  );
  
  //vou buscar todos os dados dá subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // salvar apenas os dados que eu quero
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  if (createAction) {
    // Salvar todos dados da subscription no FaunaDB
    await fauna.query(
      // se tivesse mais forma de assinar esse produto teria de fazer um "q.If()"
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
  } else {
    // atualizando um subscription fazendo Replace
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId,
            )
          )
        ),
        { data: subscriptionData } // novo dados
      )
    )
  }
}