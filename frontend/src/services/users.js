export const getAllUsers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/users`,
    {
      cache: "no-cache",
    }
  );
  return res.json();
};

export const getSingleUser = async (param) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/users/${param}`,
    {
      cache: "no-cache",
    }
  );
  return res.json();
};

export const updateUser = async (id, params) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/users/${id}`,
    {
      method: "PUT",
      cache: "no-cache",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
};

export const setNewUser = async (params) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/users`,
    {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
};

export const deleteUser = async (param) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/users/${param}`,
    {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
};