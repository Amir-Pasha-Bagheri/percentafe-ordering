const fetcher = async (url: string, options?: RequestInit) => {
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });
};

export default fetcher;
