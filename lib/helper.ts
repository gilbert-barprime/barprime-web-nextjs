import { redirect } from "next/navigation";

type UseFetchClientType = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: string | FormData;
  auth_token?: string;
  content_type?: string;
  base_url?: string;
};

export const customFetch = async (obj: UseFetchClientType) => {
  const api_url = obj.base_url ?? process.env.BASE_API_URL;
  let custom_header = {};
  if (obj.content_type === "auto") {
    custom_header = { authorization: obj.auth_token ? obj.auth_token : "" };
  } else {
    custom_header = {
      "Content-Type": obj.content_type ? obj.content_type : "application/json",
      authorization: obj.auth_token ? obj.auth_token : "",
    };
  }

  const res = await fetch(`${api_url}${obj.url}`, {
    method: obj.method,
    body: obj.data,
    headers: custom_header,
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/session-watcher");
  }

  if (!res.ok) {
    return null;
  }

  const res_json = await res.json();

  if (!res_json.status) {
    return null;
  }

  return res_json;
};
