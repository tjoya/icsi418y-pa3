
import { useState, useEffect } from "react";

function ProjectMembership() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => 
{
    async function getProjects() 
    {
      try 
      {
        const response = await fetch("http://localhost:9000/projects");
        const data = await response.json();

        if (response.ok) {
          setProjects(data);
        }
      }
      catch (error) 
      {
        console.error("An error occurred while getting projects:", error);
      }
    }

    getProjects();
  }, []);

  useEffect(() => 
  {
    async function getMembers() 
    {
      if (!selectedProject) 
      {
        setMembers([]);
        return;
      }

      try 
      {
        const response = await fetch(
          `http://localhost:9000/projects/${selectedProject}/members`
        );

        const data = await response.json();

        if (response.ok) 
        {
          setMembers(data);
        }
        else 
        {
          console.error(data.message);
          setMembers([]);
        }
      }
      catch (error) 
      {
        console.error("An error occurred while getting members:", error);
        setMembers([]);
      }
    }

    getMembers();
  }, [selectedProject]);

  useEffect(() => 
{
    async function getUsers() 
    {
      try 
      {
        const response = await fetch("http://localhost:9000/users");
        const data = await response.json();

        if (response.ok) 
        {
          setUsers(data);
        }
      }
      catch (error) 
      {
        console.error("An error occurred while getting users:", error);
      }
    }

    getUsers();
  }, []);

  async function handleAddMember() 
  {
    if (!selectedProject || !selectedUser) 
    {
      setMessage("Select a project and a user.");
      return;
    }

    try 
    {
      const response = await fetch(
        `http://localhost:9000/projects/${selectedProject}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: selectedUser
          })
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) 
      {
        setSelectedUser("");

        const membersResponse = await fetch(
          `http://localhost:9000/projects/${selectedProject}/members`
        );

        if (membersResponse.ok) 
        {
          const updatedMembers = await membersResponse.json();
          setMembers(updatedMembers);
        }
      }
    }
    catch (error) 
    {
      console.error(error);
      setMessage("Error connecting to server.");
    }
  }

  async function handleRemoveMember(userId) 
  {
    try 
    {
      const response = await fetch(
        `http://localhost:9000/projects/${selectedProject}/members/${userId}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) 
    {
        const membersResponse = await fetch(
          `http://localhost:9000/projects/${selectedProject}/members`
        );

        if (membersResponse.ok) 
        {
          const updatedMembers = await membersResponse.json();
          setMembers(updatedMembers);
        }
      }
    }
    catch (error) 
    {
      console.error(error);
      setMessage("Error connecting to server.");
    }
  }

  return (
    <div>
      <h2>Manage Project Memberships</h2>

      <select
        value={selectedProject}
        onChange={(e) => {
          setSelectedProject(e.target.value);
          setSelectedUser("");
          setMessage("");
        }}
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>

      {selectedProject && (
        <div>
          <h3>Add Project Member</h3>

          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select User</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.f_name} {user.l_name}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleAddMember}>
            Add Member
          </button>

          <p>{message}</p>
        </div>
      )}

      {selectedProject && (
        <div>
          <h3>Project Members</h3>

          {members.map((member) => (
            <div key={member._id}>
              <p>
                {member.name} ({member.username})
                {member.isLead && " - Project Lead"}
              </p>

              {!member.isLead && (
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member._id)}
                >
                  Remove Member
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectMembership;