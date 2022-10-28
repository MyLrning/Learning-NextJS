import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import ProductList from '@components/ProductList/ProductList'
import fetch from 'isomorphic-unfetch'

export const getServerSideProps = async () => {
  const response = await fetch('/api/avo')
  const {data: productList}: TAPIAvoResponse = await response.json();

  return {
    props: {
      productList,
    },
  }
}

const HomePage = () => {
  const [productList, setProductList] = useState<TProduct[]>([])
  

  useEffect(() => {
    fetch('/api/avo')
      .then((response) => response.json())
      .then(({ data }: TAPIAvoResponse) => {
        setProductList(data)
      })
  }, [])

  return (
    <Layout>
      <KawaiiHeader />
      <ProductList products={productList} />
    </Layout>
  )
}

export default HomePage
