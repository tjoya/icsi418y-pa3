import { useState, useEffect } from "react";

function CreatePro() 
{
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Planning");
  const [projectLead, setProjectLead] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => 
    {
    async function getUsers() 
    {
      try 
      {
        const response = await fetch("http://localhost:9000/users");
        const data = await response.json();

        setUsers(data);
      }
      catch (error) 
      {
        console.error("Error getting requested users:", error);
      }
    }

    getUsers();
    }, []);


async function handleSubmit(e) 
{
  e.preventDefault();

  try 
  {
    const response = await fetch("http://localhost:9000/projects", {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        description: description,
        status: status,
        project_lead_id: projectLead
      })
    });

    const data = await response.json();

    setMessage(data.message);

    if (response.ok) 
    {
      setName("");
      setDescription("");
      setStatus("Planning");
      setProjectLead("");
    }
  }
  catch (error) 
  {
    console.error(error);
    setMessage("Error connecting to the server.");
  }
}

  return (
    <div>
      <h2>Create Project</h2>

<form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Planning">Planning</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={projectLead}
          onChange={(e) => setProjectLead(e.target.value)}
          >
          <option 
            value="">Select Project Lead</option
          >

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.f_name} {user.l_name}
            </option>
            ))}
        </select>

        <button type="submit">Create Project</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default CreatePro;