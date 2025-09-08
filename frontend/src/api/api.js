// src/api/api.js

export const fetchMarkdownItems = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/markdown");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const CreateMarkdownItem = async (newItem) => {
  const response = await fetch("http://127.0.0.1:8000/api/markdown/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) {
    throw new Error("Failed to add data");
  }
  return await response.json();
};

// 更新
export const updateMarkdownItem = async (id, updatedData) => {
  const response = await fetch(`http://127.0.0.1:8000/api/markdown/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  // console.log(response);

  if (!response.ok) {
    throw new Error("Failed to update data");
  }

  return await response.json();
};
