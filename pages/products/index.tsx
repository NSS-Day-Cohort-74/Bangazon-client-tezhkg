import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Filter from '../../components/filter.tsx'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { ProductCard } from '../../components/product/card'
import { getCategories, getProducts } from '../../data/products'

export default function Products() {
  const [searchParams, setSearchParams] = useState(null)
  const [searching, setSearching] = useState(false)

  // Query for categories
  interface Category{
    id: number;
    url: string;
    name:string;
    products: [];
  }


  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  // Query for products with search parameters
  const { 
    data: products = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['products', searchParams],
    queryFn: () => getProducts(searchParams),
    onSuccess: () => {
      if (searchParams) {
        setSearching(true)
      }
    }
  })

  // Extract unique locations from products for the filter
  const locations = products.length > 0 
    ? [...new Set(products.map(product => product.location))]
      .map(location => ({
        id: location,
        name: location
      }))
    : []

  const searchProducts = (event) => {
    setSearchParams(event)
  }

  if (categoriesLoading) return <p>Loading categories...</p>
  if (error) return <p>Unable to retrieve products. Status code {error.message} on response.</p>

  return (
    <>
      <Filter 
        productCount={products.length} 
        onSearch={searchProducts} 
        locations={locations} 
        setSearching={setSearching}
      />
      
      {searching ? (
        <>
          <h1 className='title pt-4'>Products matching filters</h1>
          <div className="columns is-multiline">
            {products.map(product => (
              <ProductCard 
                product={product} 
                key={product.id} 
                img_src={product.image_path}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          {categories.map(category => (
            <div key={category.id}>
              <h1 className='title pt-4'>{category.name}</h1>
              <div className='box'>
                <div className='columns is-multiline'>
                  {category.products?.map(product => (
                    <ProductCard 
                      product={product} 
                      key={product.id} 
                      img_src={`http://localhost:8000${product.image_path}`} 
                      className='column'
                    />
                  ))}
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