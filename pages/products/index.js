import { useEffect, useState } from 'react'
import Filter from '../../components/filter'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { ProductCard } from '../../components/product/card'
import { getCategories, getProducts } from '../../data/products'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })
    getProducts().then(data => {
      if (data) {

        const locationData = [...new Set(data.map(product => product.location))]
        const locationObjects = locationData.map(location => ({
          id: location,
          name: location
        }))

        setProducts(data)
        setIsLoading(false)
        setLocations(locationObjects)
      }
    })
    .catch(err => {
      setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
    })
  }, [])

  const searchProducts = (event) => {
    getProducts(event).then(productsData => {
      if (productsData) {
        setProducts(productsData)
      }
    })
  }

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
        <Filter productCount={products.length} onSearch={searchProducts} locations={locations} setSearching={setSearching}/>
      
      {searching ? (
        <>
          <h1 className='title pt-4'>Products matching filters</h1>
          <div className="columns is-multiline">
            {products.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </>
      ):(
        <div>
        {categories.map(category => (
         <div key={category.id}>
          <h1 className='title pt-4' >{category.name}</h1>
          <div className='box'>
            <div className='columns is-multiline'>
              {category.products.map(product => (
              <ProductCard product={product}  key={product.id} className='column'/> ))}
            </div>
          </div>
        </div>              
        ))}
         </div>       
      )}
    </> 
  )
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
