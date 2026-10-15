import { useState, useEffect } from "react";

function ViewPro() 
{
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => 
  {
    async function getProjects() 
    {
      try 
      {
        const response = await fetch("http://localhost:9000/projects");
        const data = await response.json();

        if (response.ok) 
        {
          setProjects(data);
        }
        else {
          setMessage(data.message);
        }
      }
      catch (error) 
    {
        console.error(error);
        setMessage("An error occurred while getting projects.");
      }
    }

    getProjects();
  }, []);

  return (
    <div>
      <h2>View Projects</h2>

      <p>{message}</p>

      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.name}</h3>
          <p>Description: {project.description}</p>
          <p>Status: {project.status}</p>
          <p>Project Lead: {project.project_lead_name}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewPro;