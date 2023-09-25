const requestData = async ({ url, method, data, headers }) => {
  // console.log(url, method, data, headers);
  // const defaultHeaders = {
  //   "Content-Type": "application/json",
  // };
  const options = {
    headers: {
      // ...defaultHeaders,
      ...headers,
    },
    method: method,
    body: data,
  };
  // console.log("start request");
  const response = await fetch(url, options);
  // console.log("***********************");
  // console.log(response);
  if (!response.ok) {
    const { error } = await response.json();
    return { status: error };
    // throw new Error(error.message);
  }
  const result = await response.json();
  // console.log(result);
  return result;
};

export default requestData;
