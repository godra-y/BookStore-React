export const fetchBooks = async ({ query = "all", page = 1, limit = 10, signal }) => {
  const offset = (page - 1) * limit;

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
    { signal }
  );

  if (!res.ok && res.status !== 422) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data.docs || [];
};

export const fetchBySubject = async (subject, { page = 1, limit = 10, signal } = {}) => {
  const offset = (page - 1) * limit;

  const res = await fetch(
    `https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json?limit=${limit}&offset=${offset}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return data.works || [];
};
  
