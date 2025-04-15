import { useEffect, useState } from 'react'
import Filter from '../../components/filter'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { ProductCard } from '../../components/product/card'
import { getCategories, getProducts } from '../../data/products'
import { useQuery } from '@tanstack/react-query'

// Interfaces
interface Product {
  id: string | number;
  name: string;
  price: number;
  number_sold: number;
  description: string;
  quantity: number;
  created_date: Date;
  location: string;
  image_path: string;
  average_rating: number;
}

interface Category {
  id: string | number;
  url: string;
  name: string;
  products: Product[]
}

interface Location {
  id: string
  name: string
}

export default function Products() {
  // data structures
  const [locations, setLocations] = useState<Location[]>([])
  const [searchTerm, setSearchTerm] = useState(null)

  // toggles
  const [searching, setSearching] = useState<boolean>(false)

  const {
    data: categories = [],
    isLoading: categoriesLoading
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<Product[]>({
    queryKey: ['products', searchTerm ? searchTerm : 'all'],
    queryFn: () => getProducts(searchTerm),
    enabled: true
  })

  
  useEffect(() => {
    if (products && products.length > 0) {
      const locationData = [...new Set(products.map(product => product.location))]
      const locationObjects = locationData.map(location => ({
        id: location,
        name: location
      })) 
      setLocations(locationObjects)
    }
  }, [products])
  
  useEffect(() => {
    if (!searching) {
      console.log("Resetting search term because searching=false");
      setSearchTerm(null)
    }
  }, [searching])
  
  const searchProducts = (event: any) => {
    console.log("Search event:", event)
    setSearching(true)
    setSearchTerm(event)
  }

  const isLoading = productsLoading || categoriesLoading  
  if (isLoading) return <p>...loading</p>

  return (
    <>
        <Filter productCount={products.length} onSearch={searchProducts} locations={locations} setSearching={setSearching}/>
      
      {searching ? (
        <>
          <h1 className='title pt-4'>Products matching filters</h1>
          <div className="columns is-multiline">
            {products.map(product => (
              <ProductCard product={product} key={product.id} img_src={product.image_path} removeProduct={undefined} noButtons={undefined}/>
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
              <ProductCard product={product}  key={product.id} img_src={`http://localhost:8000${product.image_path}`} className='column'/> ))}
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
