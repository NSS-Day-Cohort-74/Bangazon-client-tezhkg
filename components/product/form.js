import { useEffect, useState } from 'react'
import { getCategories } from '../../data/products'
import CardLayout from '../card-layout'
import { Textarea, Select, Input } from '../form-elements'

export default function ProductForm({ formEl, saveEvent, title, router, product = {}, setProductImage, productImage }) {
  const [categories, setCategories] = useState([])
  
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  const createProductImageString = (event) => {
    if (event.target.files && event.target.files[0]) {
      getBase64(event.target.files[0], (base64ImageString) => {
        setProductImage(base64ImageString);
      });
    }
  }

  useEffect(() => {
    getCategories().then(catData => setCategories(catData))
  }, [])

  return (
    <CardLayout title={title}>
      <form ref={formEl}>
        <Input
          id="name"
          label="Name"
          defaultValue={product.name}
        />
        <Textarea
          id="description"
          label="Description"
          defaultValue={product.description}
        />
        <Select
          id="category"
          options={categories}
          label="Category"
          title="Select a Category"
          defaultValue={product.category}
        />
        <Input
          id="price"
          label="Price"
          placeholder="Products must be more than $0.00 but can not exceed $17,500"
          defaultValue={product.price}
        />
        <Input
          id="location"
          label="Location"
          defaultValue={product.location}
        />
        <Input
          id="quantity"
          label="Quantity"
          type="number"
          defaultValue={product.quantity}
        />
   
        <div>
          <label htmlFor="image_path" className="label">Product Image: </label>
          <input type="file" id="image_path" onChange={createProductImageString} />
          {product.id && <input type="hidden" name="product_id" value={product.id} />}
          {productImage && (
            <div className="mt-2">
              <img src={productImage} alt="Product preview" style={{ maxWidth: '200px' }} />
            </div>
          )}
        </div>
      </form>
      <>
        <a className="card-footer-item has-text-centered button is-primary" onClick={saveEvent}>Save</a>
        <a className="card-footer-item has-text-centered button is-warning" onClick={() => router.back()}>Cancel</a>
      </>
    </CardLayout>
  )
}