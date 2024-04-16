import { JobProps } from "./job.utils";

export const getJobs = async () => {
  const response = await fetch("http://localhost:3333/job/all", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error("Erreur lors de la récupération des Jobs");
  return response.json();
};



export const createJob = async (data: JobProps) => {
  const response = await fetch("http://localhost:3333/job/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du job");
  }
  return response.json();
};

export const deleteJob = async () => {
  const response = await fetch("http://localhost:3333/job/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: null,
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la supression du job");
  }
  return response.json();
};

export const likeJob = async (id: number) => {
  const response = await fetch(`http://localhost:3333/job/${id}/like`, {
    method: "POST",
    headers: { "Content-Type": "application:json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Impossible de liker le job");
  }
  return response.json();
};

export const dislikeJob = async (id: number) => {
  const response = await fetch(`http://localhost:3333/job/${id}/dislike`, {
    method: "POST",
    headers: { "Content-Type": "application:json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Impossible de disliker le job");
  }
  return response.json();
};
