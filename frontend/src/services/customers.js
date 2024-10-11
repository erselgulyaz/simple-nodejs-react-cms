export const getAllCustomers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers`,
    {
      cache: "no-cache",
    }
  );
  return res.json();
};

export const getSingleCustomer = async (param) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers/${param}`,
    {
      cache: "no-cache",
    }
  );
  return res.json();
};

export const updateCustomer = async (id, params) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers/${id}`,
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

export const setNewCustomer = async (params) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers`,
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

export const deleteCustomer = async (param) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers/${param}`,
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