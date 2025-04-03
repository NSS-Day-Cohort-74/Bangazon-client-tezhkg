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

  const saveProduct = () => {
    const { name, description, price, category, location, quantity  } = formEl.current
    const product = {
      name: name.value,
      description: description.value,
      price: price.value,
      category_id: category.value,
      location: location.value,
      quantity: quantity.value
    }
    addProduct(product).then((res) => {
      if (!res?.id){
        setShowModal(true);
      } else {
        router.push(`/products/${res.id}`)
      }

    })

  }
console.log(showModal)
  return (
    <>
     <Modal showModal={showModal} setShowModal={setShowModal} title="Price is out of range.">
      <div className="modal-card-body">Your price is over the allowed $17,500. Please modify and try again.</div>
      <footer></footer>
     </Modal>
    <ProductForm
      formEl={formEl}
      saveEvent={saveProduct}
      title="Add a new product"
      router={router}
    ></ProductForm>
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
