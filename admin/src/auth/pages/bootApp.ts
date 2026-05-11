import authProvider from "../../core/providers/authProvider";

export async function bootstrapAuth() {
  try {
    const currentPath = window.location.pathname;
    if (currentPath === "/login" || currentPath === "/register") return;

    const res = await fetch("http://localhost:4000/api/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (res.status === 401) {
      window.location.href = "/login";
      return;
    }

    const data = await res.json();
   
    authProvider.updateAccessToken(data.accessToken);

  
    const userRes = await fetch("http://localhost:4000/api/me", {
      headers: { Authorization: `Bearer ${authProvider.getAccessToken()}` },
      credentials: "include",
    });

    if (userRes.ok) {
      const userData = await userRes.json();
      authProvider.updateAccessToken(data.accessToken, userData);
    } else {
      authProvider.clear();
      window.location.href = "/login";
    }
  } catch (err) {
    console.error("bootapp auth failed", err);
    authProvider.clear();
    window.location.href = "/login";
  }
}