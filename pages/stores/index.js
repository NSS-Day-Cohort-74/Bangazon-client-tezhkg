import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { StoreCard } from '../../components/store/card'
import { getStores } from '../../data/stores'
import { useQuery } from '@tanstack/react-query'

export default function Stores() {

  const { data: stores = [], isLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: getStores
  })

  return (
    <div className="container">
      <section className="section">
        <h1 className="title is-2 has-text-centered mb-6 mt-6">Stores</h1>
        
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