import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { StoreCard } from '../../components/store/card'
import { getStores } from '../../data/stores'

export default function Stores() {
  const [stores, setStores] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStores()
      .then(data => {
        if (data) {
          setStores(data)
          setIsLoading(false)
        }
      })
      .catch(error => {
        console.error("Failed to fetch stores:", error)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <section className="section">
        <h1 className="title is-1 has-text-centered mb-6 mt-3">Stores</h1>
        
        {isLoading ? (
          <div className="has-text-centered">
            <span className="icon is-large">
              <i className="fas fa-spinner fa-pulse"></i>
            </span>
            <p>Loading stores...</p>
          </div>
        ) : stores.length === 0 ? (
          <div className="notification is-warning has-text-centered">
            No stores found.
          </div>
        ) : (
          <div className="columns is-multiline is-variable is-4">
            {stores.map(store => (
              <StoreCard store={store} key={store.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

Stores.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}