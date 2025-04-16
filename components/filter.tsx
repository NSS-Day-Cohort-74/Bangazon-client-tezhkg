import { useEffect, useRef, useState } from 'react'
import { getCategories } from '../data/products'
import { Input, Select } from './form-elements'

// Define interfaces for our data structures
interface Location {
  id: string | number;
  name: string;
}

interface Category {
  id: string | number;
  name: string;
}

interface OrderByOption {
  id: string;
  name: string;
}

interface DirectionOption {
  name: string;
  label: string;
}

interface RefElements {
  location: React.RefObject<HTMLSelectElement>;
  category: React.RefObject<HTMLSelectElement>;
  name: React.RefObject<HTMLInputElement>;
  min_price: React.RefObject<HTMLInputElement>;
  order_by: React.RefObject<HTMLSelectElement>;
  direction: React.RefObject<HTMLInputElement>;
  number_sold: React.RefObject<HTMLInputElement>;
}

interface FilterProps {
  productCount: number;
  onSearch: (query: string) => void;
  locations: Location[];
  setSearching: (isSearching: boolean) => void;
}

export default function Filter({ productCount, onSearch, locations, setSearching }: FilterProps): JSX.Element {
  const refEls: RefElements = {
    location: useRef<HTMLSelectElement>(null),
    category: useRef<HTMLSelectElement>(null),
    name: useRef<HTMLInputElement>(null),
    min_price: useRef<HTMLInputElement>(null),
    order_by: useRef<HTMLSelectElement>(null),
    direction: useRef<HTMLInputElement>(null),
    number_sold: useRef<HTMLInputElement>(null),
  }

  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])
  const [direction, setDirection] = useState<string>('asc')
  
  const clear = (): void => {
    for (let ref in refEls) {
      if (ref === 'direction' && refEls[ref].current) {
        refEls[ref].current.checked = false
        setDirection('asc')
      } else if (["min_price", "name", "number_sold"].includes(ref) && refEls[ref].current) {
        refEls[ref].current.value = ""
      }
      else if (refEls[ref].current) {
        refEls[ref].current.value = "0"
      }
    }
    onSearch('')
    setQuery('')
  }

  const orderByOptions: OrderByOption[] = [
    {
      id: 'price',
      name: 'Price'
    },
    {
      id: 'name',
      name: 'Name'
    }
  ]

  const directionOptions: DirectionOption[] = [
    {
      name: 'direction',
      label: 'asc'
    },
    {
      name: 'direction',
      label: 'desc'
    },
  ]

  useEffect(() => {
    if (query) {
      onSearch(query)
      setSearching(true)
    } 
    
    if (!query){
      setSearching(false)
    }
  }, [query, onSearch, setSearching])

  console.log(query)

  useEffect(() => {
    getCategories().then((array: Category[]) => {
      setCategories(array)
    })
  }, [])

  const buildQuery = (key: string, value: string | undefined): string => {
    if (value && value !== "0") {
      return `${key}=${value}&`
    }
    return ""
  }

  const filter = (): void => {
    let newQuery = ""
    for (let refEl in refEls) {
      if (refEls[refEl].current) {
        newQuery += buildQuery(refEl, refEls[refEl].current.value)
      }
    }
    setQuery(newQuery)
  }

  return (
    <div className='level'>
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <strong>{productCount}</strong> products
          </p>
        </div>
        <div className="level-item">
          <Input
            placeholder="Find a Product"
            id="name"
            refEl={refEls.name}
            addlClass="has-addons"
            extra={
              <p className="control">
                <button className="button is-primary" onClick={filter}>
                  Search
                </button>
              </p>
            }
          />
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <div className={`dropdown is-right ${showFilters ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>Filter Products</span>
                <span className="icon is-small">
                <i className="fas fa-filter"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <Select
                    refEl={refEls.location}
                    options={locations}
                    title="Filter by Location"
                    addlClass="is-fullwidth"
                  />
                </div>
                <hr className="dropdown-divider"></hr>
                <div className="dropdown-item">
                  <Select
                    refEl={refEls.category}
                    options={categories}
                    title="Filter by Category"
                    addlClass="is-fullwidth"
                  />
                </div>
                <hr className="dropdown-divider"></hr>
                <div className="dropdown-item">
                  <Input
                    type="number"
                    placeholder="Minimum Price"
                    addlClass="is-horizontal"
                    refEl={refEls.min_price}
                  />

                </div>
                <hr className="dropdown-divider"></hr>
                <div className="dropdown-item">
                  <Input
                    type="number"
                    placeholder="Number Sold"
                    addlClass="is-horizontal"
                    refEl={refEls.number_sold}
                  />
                </div>
                <hr className="dropdown-divider"></hr>
                <div className="dropdown-item">
                  <Select
                    refEl={refEls.order_by}
                    options={orderByOptions}
                    title="Order by"
                    addlClass="is-fullwidth"
                  />
                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          value={direction}
                          ref={refEls.direction}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setDirection('desc')
                            } else {
                              setDirection('asc')
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <hr className="dropdown-divider"></hr>
                <div className="dropdown-item">
                  <div className="field is-grouped">
                    <p className="control">
                      <button className="button is-primary" onClick={filter}>
                        Filter
                      </button>
                    </p>
                    <p className="control">
                      <button className="button is-danger" onClick={clear}>
                        Clear
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}