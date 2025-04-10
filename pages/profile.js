import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { ProductCard } from '../components/product/card'
import { StoreCard } from '../components/store/card'
import { useAppContext } from '../context/state'
import { getUserProfile } from '../data/auth'
import { likedProducts } from '../data/products'

export default function Profile() {
  const { profile, setProfile } = useAppContext()
  const [productsLikedList, setLikedProductsList] = useState([])

  useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData)
      }
    })
    likedProducts().then((data) => {
      if (data) {
        setLikedProductsList(data)
      }
    })
  }, [])


  return (
    <>
      <CardLayout title="Favorite Stores" width="is-full">
        <div className="columns is-multiline">
          {
            profile.favorites?.map(favorite => (
              <StoreCard store={favorite} key={favorite.id} width="is-one-third" />
            ))
          }
        </div>
        <></>
      </CardLayout>
      <CardLayout title="Products you've recommended" width="is-full">
        <div className="columns is-multiline">
          {
            profile.recommends?.map(recommendation => (
              <ProductCard product={recommendation.product} key={recommendation.product.id} width="is-one-third" />
            ))
          }
        </div>
        <></>
      </CardLayout>
      <CardLayout title="Products recommended to you" width="is-full">
        <div className="columns is-multiline">
          {
            profile.recommendation?.map(recommendation => (
              <ProductCard product={recommendation.product} key={recommendation.product.id} width="is-one-third" />
            ))
          }
        </div>
        <></>
      </CardLayout>

      <CardLayout title="Products you've liked" width="is-full">
        <div className="columns is-multiline">
          {
            productsLikedList?.map(product => (
              <ProductCard product={product} key={product.id} width="is-one-third" />
            ))
          }
        </div>
        <></>
      </CardLayout>
    </>
  )
}
 
Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
