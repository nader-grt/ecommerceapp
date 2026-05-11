import {  httpclientService } from "../httpclientService/httpclientService";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const res = await fetch("http://localhost:4000/api/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
};

export const loginUser = async (data: LoginPayload): Promise<any> => {
  return await httpclientService("http://localhost:4000/api/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getProductHomePage = async (): Promise<any> => {
  return await httpclientService(
    "http://localhost:4000/api/products/home?random=true&limit=12",
    {
      method: "GET",
    }
  );
};
