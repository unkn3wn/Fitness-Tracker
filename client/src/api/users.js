export default async function registerUser(username, password) {
  try {
    const response = await fetch("/routes/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    console.log("we are in after the fetch");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password) {
  const response = await fetch("/routes/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const result = await response.json();
  return result;
}

export async function me() {
  const response = await fetch("/routes/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function logoutUser(username, password) {
  const response = await fetch("/routes/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
