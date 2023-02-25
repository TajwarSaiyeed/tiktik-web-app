import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "503xkacr",
  dataset: "production",
  apiVersion: "2023-02-24",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
