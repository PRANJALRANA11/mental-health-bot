import "server-only";
import { fetchAccessToken } from "@humeai/voice";

export const getHumeAccessToken = async () => {
  const accessToken = await fetchAccessToken({
    apiKey: "HdB8LkK34ROcPfVGJrGzB88aK2LzV5LeQHGTOgZgBAe19djS",
    secretKey:
      "32l2BA9ipCq4DcJ7OXIkZdcWspj3XGzcGM2CWggp9k5B7GkwlhzsA6wISm7GWI7o",
  });

  if (accessToken === "undefined") {
    return null;
  }

  return accessToken ?? null;
};
