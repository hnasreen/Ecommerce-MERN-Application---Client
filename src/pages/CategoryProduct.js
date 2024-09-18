import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../Helper/productCategory.js'
import axios from 'axios'
import VerticalCard from '../components/VerticalCard.js'


const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {


    const res = await axios.post("https://ecommerce-mern-application-server.onrender.com/api/filter-product", { category: filterCategoryList }, {
      header: { "content-type": "application/json" },
      withCredentials: true
    })

    setData(res?.data?.data || [])
  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate("/product-category?" + urlFormat.join(""))
  }, [selectCategory])


  const handleOnChangeSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if (value === 'asc') {
      setData(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }

    if (value === 'dsc') {
      setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() => {

  }, [sortBy])

  return (
    <div className="container p-4 mx-auto">
      {/***desktop version */}
      <div className="d-none d-lg-grid" style={{ gridTemplateColumns: "200px 1fr" }}>

        {/***left side */}
        <div className="bg-white p-2" style={{ minHeight: "calc(100vh - 120px)", overflowY: "scroll" }}>

          {/**sort by */}
          <div>
            <h3 className="fs-6 text-uppercase fw-medium text-muted border-bottom pb-1 border-secondary" 
            style={{
              backgroundColor: "#f0f0f0", // Light grey background
              padding: "8px", // Optional padding to make the background more noticeable
            }}>
              Sort by
            </h3>

            <form className="text-sm d-flex flex-column gap-2 py-2">
              <div className="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                <label>Price - Low to High</label>
              </div>

              <div className="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div>
            <h3 className="fs-6 text-uppercase fw-medium text-muted border-bottom pb-1 border-secondary"
            style={{
              backgroundColor: "#f0f0f0", // Light grey background
              padding: "8px", // Optional padding to make the background more noticeable
            }}>
              Category
            </h3>

            <form className="text-sm d-flex flex-column gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="d-flex align-items-center gap-3" key={index}>
                    <input
                      type="checkbox"
                      name="category"
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>

        </div>

        {/***right side ( product ) */}
        <div className="px-4">
          <p className="fw-medium text-muted fs-5 my-2">
            Search Results : {data.length}
          </p>

          <div style={{ minHeight: "calc(100vh - 120px)", overflowY: "scroll", maxHeight: "calc(100vh - 120px)" }}>
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default CategoryProduct