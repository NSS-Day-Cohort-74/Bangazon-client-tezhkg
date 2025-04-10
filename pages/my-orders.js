import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Table from '../components/table'
import { getOrders } from '../data/orders'
import { getPaymentTypes } from '../data/payment-types'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [paymentTypes, setPaymentTypes] = useState([])
  const headers = ['Order Date', 'Total', 'Payment Method']

  useEffect(() => {
    getOrders().then(ordersData => {
      if (ordersData) {
        setOrders(ordersData)
      }
    })
    getPaymentTypes().then(paymentData => {
      setPaymentTypes(paymentData)
    })
  }, [])

  const ordersWithPaymentDetails = orders.map(order => {
    const paymentDetails = paymentTypes.find(payment => payment.url == order.payment_type)
    return {...order, payment_type_details: paymentDetails}
  })

  return (
    <>
      <CardLayout title="Your Orders">
        <Table headers={headers}>
          {
            ordersWithPaymentDetails.map((order) => (
              <tr key={order.id}>
                <td>{order.completed_on}</td>
                <td>${order.total}</td>
                <td>{order.payment_type_details ? `${order.payment_type_details.merchant_name} - ${order.payment_type_details?.account_number}` : 'No Payment Method'}</td>
              </tr>
            ))
          }
        </Table>
        <></>
      </CardLayout>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
