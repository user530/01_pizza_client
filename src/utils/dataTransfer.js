export async function getProductTypes() {
  const prodTypesURL = "http://localhost:5000/api/v1/product_types";

  const response = await fetch(prodTypesURL);
  const data = await response.json();

  try {
    if (data.success) {
      const prodTypes = data.data.map(({ _id: id, typeName }) => ({
        id,
        typeName,
      }));
      return prodTypes;
    }

    return [];
  } catch (error) {
    throw new Error(
      "В процессе загрузки типов продуктов произошла ошибка, пожалуйста, повторите запрос позже."
    );
  }
}

export async function getAllProducts() {
  const productsURL = "http://localhost:5000/api/v1/products";

  const response = await fetch(productsURL);
  const data = await response.json();

  try {
    if (data.success) {
      const products = data.data;
      const newProducts = products.map(
        ({
          _id: id,
          name,
          productType,
          weight,
          options,
          ingredients,
          price,
          specialPrice,
          tags,
          img,
        }) => {
          return {
            id,
            name,
            productType,
            weight,
            options,
            ingredients,
            price,
            specialPrice,
            tags,
            img,
          };
        }
      );

      return newProducts;
    }

    return [];
  } catch (error) {
    throw Error(
      "В процессе загрузки продуктов произошла ошибка, пожалуйста, повторите запрос позже."
    );
  }
}

export async function sendContactForm(data, signal) {
  const URL = "http://localhost:5000/api/v1/contact";

  try {
    const response = await fetch(URL, {
      signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const respData = await response.json();

    if (respData.success) return respData;

    return { success: false };
  } catch (error) {
    throw Error(
      "В данный момент сервер не смог обработать ваше обращение, пожалуйста, повторите вашу попытку позже."
    );
  }
}