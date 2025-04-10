import Link from 'next/link'
import Image from 'next/image'

export function ProductCard({ product, removeProduct, isOwner = false, width="is-one-fifth", noButtons }) {
  const image_src = 'http://localhost:8000' + product.image_path
  return (
    <div className={`column ${width}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={image_src} alt="Placeholder image"></img>
          </figure>
        </div>
        <header className="card-header">
          <p className="card-header-title">
            {
              noButtons ? 
              <>{product.name} - ${product.price}</>
              :

            <Link href={`/products/${product.id}`}>{product.name} - ${product.price}</Link>
            }
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            {product.description}
          </div>
        </div>
        {
          isOwner && !noButtons ?
            <footer className="card-footer">
              <Link href={`/products/${product.id}/edit`} className="card-footer-item">Edit</Link>
              <a onClick={() => removeProduct(product.id)} className="card-footer-item">Delete</a>
            </footer>
            :
            <></>
        }

      </div>
    </div>
  )
}
