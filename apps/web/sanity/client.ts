import { createClient } from "next-sanity";
import { sanityConfig } from "@zeraus/sanity-config";

export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  stega: {
    studioUrl: sanityConfig.studioUrl,
  },
});
