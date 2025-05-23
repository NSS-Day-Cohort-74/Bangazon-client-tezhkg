import { fetchWithoutResponse, fetchWithResponse } from './fetcher'

export function getCart() {
  return fetchWithResponse('profile/cart', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getOrders() {
  return fetchWithResponse('orders', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function completeCurrentOrder(orderId, paymentTypeId) {
  return fetchWithResponse(`orders/${orderId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"payment_type": paymentTypeId})
  })
}

export function deleteCurrentOrder(orderId) {
  return fetchWithoutResponse(`orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}
