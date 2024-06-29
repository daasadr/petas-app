import { createClient, groq } from "next-sanity";

export async function getProjects() {
    const client = createClient ({
    projectId: "h246n0z5",
    dataset: "production",
    apiVersion: "2024-06-26",
    });
client.fetch(
    groq`*[]{
    }`
)
}