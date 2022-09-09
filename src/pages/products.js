import React, { useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook';
import { Form, Card } from 'react-bootstrap';

export const Products = () => {
  const { isLoading, data } = useFetch('http://127.0.0.1:4005/api/v1/products');

  if (isLoading) {
    return <div>Loading Products...</div>;
  }

  const productData = JSON.stringify(data.data);
  const productName = JSON.parse(productData).data[0].name;
  console.log({ productData });
  const product = JSON.parse(productData).data[0];
  const products = { productData };

  // if (products.data) {

  //   //Trying to get each product to display its contents on a single card (for each product)
  //   // for (let p in products) {
  //   //   const temp = p;
  //   //   // console.log(temp.data);
  //   // }
  //   // for (let p = 0; p < products; p++) {
  //   //   console.log('Loop');
  //   //   const product = JSON.parse(products[p]);
  //   //   console.log(product);
  //   // }
  //   // products.data.map((product) => {
  //   //   return (
  //   //     <Card>
  //   //       Test
  //   //       {/* <Card.Title>product.name</Card.Title> */}
  //   //     </Card>
  //   //   );
  //   // });
  // }
  if (productData) {
    //Loop through each product.
    for (let prod in productData) {
      //Create a card that holds all the product details such as name, price, etc.
      // console.log(productData[prod]);
      console.log(prod);
    }
  }

  console.log(product);
  return (
    // productData
    <div>
      <div>{product.name}</div>
    </div>
  );
  // return isLoading ? (
  //   <div>Loading products...</div>
  // ) : (
  //   <div>{JSON.stringify(data)}</div>
  //   // <pre>{JSON.stringify(data)}</pre>
  // );
};
