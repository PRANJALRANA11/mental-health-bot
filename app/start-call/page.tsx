import React from "react";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }
  return (
    <div className={"grow flex flex-col"}>
      <Nav />
      <Chat accessToken={accessToken} />
    </div>
  );
}
