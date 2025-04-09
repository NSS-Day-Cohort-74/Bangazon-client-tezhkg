import Link from 'next/link'
import { ProductCard } from '../product/card'

export function StoreCard({ store, width= "is-half" }) {
  return (
    <div className={`column ${width}`}>
      <div className="card">
        <header className="card-header has-background-primary-light">
          <p className="card-header-title is-centered">
            {store.name}
          </p>
        </header>
        <div className="card-content">
          <div className="content mb-4">
            <span className="has-text-weight-bold">Owner:</span> {store.name_of_owner} 
          </div>
          <div className="content mb-4 has-background-light p-3 is-italic">
           Description: {store.description}
          </div>
          <div className="content mb-4">
            <span className="tag is-info is-medium">
              Products: {store.size}
            </span>
          </div>
          
          <div className="content">
            <p className="title is-5 has-text-centered mb-4">All Products</p>
            <div className="columns is-multiline is-mobile">
              {store.store_products && store.store_products.map(product => (
                <div key={product.id} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                  <div className="has-background-white-ter p-2 mb-3 rounded">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <footer className="card-footer">
          <Link href={`stores/${store.id}`} className="card-footer-item button is-primary is-light is-fullwidth">
            View Store
          </Link>
        </footer>
      </div>
    </div>
  )
}