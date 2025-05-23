import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import Navbar from '../../../components/navbar'
import { ProductCard } from '../../../components/product/card'
import Detail from '../../../components/store/detail'
import { useAppContext } from '../../../context/state'
import { deleteProduct } from '../../../data/products'
import { favoriteStore, getStoreById, unfavoriteStore } from '../../../data/stores'

export default function StoreDetail() {
  const { profile } = useAppContext()
  const router = useRouter()
  const { id } = router.query
  const [store, setStore] = useState({})
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (id) {
      refresh()
    }
    if (parseInt(id) === profile.store?.id) {
      setIsOwner(true)
    }
  }, [id, profile])

  

  const refresh = () => getStoreById(id).then(storeData => {
    if (storeData) {
      setStore(storeData)
    }
  })

  const removeProduct = (productId) => {
    deleteProduct(productId).then(refresh)
  }

  const favorite = () => {
    favoriteStore(id).then(refresh)
  }

  const unfavorite = () => {
    unfavoriteStore(id).then(refresh)
  }


  const SoldProducts = () => {
    const sold_products = store?.sold_products
    
    return (
      <>
    {
      sold_products?.length === 0 ? 
      <p className='p-3'>There are no sold products yet</p> :
      <div>
    <h1 className='title mt-5'>Sold Products:</h1>
    <div className='section card'>
      <div className='columns is-multiline'>
      {
      sold_products?.map(product => (
        <ProductCard
          product={product}
          key={product.id}
          isOwner={isOwner}
          removeProduct={removeProduct}
          noButtons={true}
          img_src={`http://localhost:8000${product.image_path}`}
        />
      ))}
      </div>
      </div>
      </div>
    }
    </>
    )
  }

  return (
    <>
      <Detail store={store} isOwner={isOwner} favorite={favorite} unfavorite={unfavorite} />
      <div className="container">
        {
          store.store_products?.length === 0 ?
            <p className='p-3'>There's no products yet</p>
            :
            <div>
              <h1 className='title'>Selling:</h1>
              <div className='section card'>
                <div className='columns is-multiline'>
              {
                store.store_products?.map(product => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    isOwner={isOwner}
                    removeProduct={removeProduct}
                    noButtons={false}
                    img_src={`http://localhost:8000${product.image_path}`}
                  />
                ))
              }
              </div>
              </div>
            </div>
        }
      </div>
      <div className='container'>
       <SoldProducts />
      </div>
    </>
  )
}

StoreDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
