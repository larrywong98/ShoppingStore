const requestData = async ({ url, method, data, headers }) => {
  // console.log(url, method, data, headers);
  // const defaultHeaders = {
  //   "Content-Type": "application/json",
  // };
  // console.log(data);
  const options = {
    headers: {
      // ...defaultHeaders,
      ...headers,
    },
    method: method,
    body: data,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const { error } = await response.json();
      return { status: error };
    }
    const result = await response.json();
    return result;
  } catch (err) {
    return [];
  }
};

export default requestData;
