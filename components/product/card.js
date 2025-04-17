import Link from 'next/link'
import Image from 'next/image'

export function ProductCard({ product, removeProduct, isOwner = false, img_src, width="is-one-fifth", noButtons }) {
  return (
    <div className={`column ${width}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={img_src}></img>
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
          <div className="content" style={{minHeight: "75px"}}>
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
