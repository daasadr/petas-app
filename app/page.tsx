
export default function Home() {
  const projects = await getProjects()
  return <div> {projects.map((project)=>(
    <div key={project._id}>{project.name}</div>
  ))}
  </div>
  

}

export function getStaticPaths(){

}

export function getStaticProps() {

}