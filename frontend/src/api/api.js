// src/api/api.js

export const fetchMarkdownItems = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/markdown");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};
