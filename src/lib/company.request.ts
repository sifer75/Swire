export const getCompanies = async () => {
  const response = await fetch("http://localhost:3333/company", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok)
    throw new Error("Erreur lors de la récupération des companies");
  return response.json();
};

export const createCompany = async (data: any) => {
  const response = await fetch("http://localhost:3333/company", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de la companie");
  }
  return response.json();
};

export const deleteCompany = async () => {
  const response = await fetch("http://localhost:3333/company", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: null,
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la supression de la companie");
  }
  return response.json();
};
