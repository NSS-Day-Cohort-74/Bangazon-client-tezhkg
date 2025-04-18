import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { addProduct } from '../../data/products'
import ProductForm from '../../components/product/form'
import Modal from '../../components/modal'

export default function NewProduct() {
  const formEl = useRef()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [errorData, setErrorData] = useState({})
  const [productImage, setProductImage] = useState(null)  // Add state for the image

  const saveProduct = () => {
    const { name, description, price, category, location, quantity } = formEl.current

    const product = {
      name: name.value,
      description: description.value,
      price: price.value,
      category_id: category.value,
      location: location.value,
      quantity: quantity.value
    }

    // Add the base64 image string directly
    if (productImage) {
      product.image_path = productImage
    }
    
    addProduct(product).then((res) => {
      if (!res?.id){
        setShowModal(true);
        setErrorData(res)
      } else {
        router.push(`/products/${res.id}`)
      }
    })
  }

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} title="There are issues with your submission.">
        <div className="modal-card-body">
          {Object.entries(errorData).map(([key, value]) => {
            return (
              <p key={key}>{key}: {value}</p>
            )
          })}
        </div>
        <footer></footer>
      </Modal>
      <ProductForm
        formEl={formEl}
        saveEvent={saveProduct}
        title="Add a new product"
        router={router}
        setProductImage={setProductImage}
        productImage={productImage}
      />
    </>
  )
}

NewProduct.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}