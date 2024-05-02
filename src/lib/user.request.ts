// export const getUsers = async () => {
//   const response = await fetch("http://localhost:3333/user", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });
//   if (!response.ok) throw new Error("Erreur lors de la récupération des users");
//   return response.json();
// };

export type User = {
  name: string;
  email: string;
  age: string;
  image: string;
};

export const createUser = async (data: { email: string; password: string }) => {
  const response = await fetch("http://localhost:3333/user/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du user");
  }
  return response.json();
};

export const updateUser = async (data: {
  name: string;
  age: string;
  visible: boolean;
}) => {
  const response = await fetch("http://localhost:3333/user/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du user");
  }
  return response.json();
};

export const updateFields = async (data: { fields: string[] }) => {
  const fields = data.fields[0];
  const response = await fetch("http://localhost:3333/user/updateFields", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ fields }),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du fields");
  }
  return response.json();
};

export const updateTarget = async (data: { target: string[] }) => {
  const target = data.target[0];
  const response = await fetch("http://localhost:3333/user/updateTarget", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ target }),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du target");
  }
  return response.json();
};

export const updateDisponibility = async (data: {
  disponibility: string[];
}) => {
  const disponibility = data.disponibility[0];
  const response = await fetch(
    "http://localhost:3333/user/updateDisponibility",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ disponibility }),
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la création de la disponibilité");
  }
  return response.json();
};

export const updateLocation = async (data: { location: string[] }) => {
  const location = data.location[0];
  const response = await fetch("http://localhost:3333/user/updateLocation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ location }),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de la localisation");
  }
  return response.json();
};

export const login = async (data: { email: string; password: string }) => {
  const response = await fetch("http://localhost:3333/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ ...data }),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création d'utilisateur");
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch("http://localhost:3333/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: null,
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la déconnection de l'utilisateur");
  }
  return response.json();
};

export const forgetPassword = async (data: {
  password1: string;
  password2: string;
  email: string;
}) => {
  const response = await fetch("http://localhost:3333/forget/password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  if (!response.ok)
    throw new Error("Erreur lors de la déconnection de l'utilisateur");
  return response.json();
};

export const getUser = async (): Promise<User> => {
  const response = await fetch("http://localhost:3333/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok)
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  return response.json();
};

// export const deleteUser = async (id: string) => {
//   const response = await fetch("http://localhost:3333/user", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: null,
//   });
//   if (!response.ok) {
//     throw new Error("Erreur lors de la supression du user");
//   }
//   return response.json();
// };
