import { defineConfig } from 'sanity' ;
import { deskTool } from 'sanity/desk';
import schemas from './sanity/schemas'

const config = defineConfig({
    projectId: "h246n0z5",
    dataset: "production",
    title: "Petas personal website",
    apiVersion: "2024-06-26",
    basePath: "/admin",
    plugins: [deskTool()],
    schema: {types: schemas}
})


export default config