import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function EditProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isValidId = /^[0-9a-fA-F]{24}$/.test(projectId); //check to guard against invalid ObjectId's
    if (!isValidId) {
      console.log("not valid project ID");
      return;
    }

    const getProjectData = async () => {
      const { data } = await axios.get(`/project/${projectId}`);
      const projectData = data.data.project;
      setFormData(projectData);
      console.log(projectData);

      setIsLoading(false);
    };
    getProjectData();
  }, [projectId, axios]);

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.patch(`/project/${projectId}`, formData);
      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-sm mx-auto align-middle sm:w-4/5 sm:mx-auto">
      <form
        className="bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-5"
        onSubmit={handleSubmitProject}
      >
        <div className="mb-4">
          <label
            className="block text-amber-500 text-sm font-middle mb-2"
            htmlFor="projectName"
          >
            Edit Project Name
          </label>
          <input
            className="w-full text-sky-900 border-gray-300 rounded-lg shadow-sm focus:border-pink-800 focus:ring-sky-900"
            id="projectName"
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-amber-500 text-sm font-middle mb-2"
            htmlFor="companyName"
          >
            Company Name:
          </label>
          <input
            className="w-full text-sky-900 border-gray-300 rounded-lg shadow-sm focus:border-pink-800 focus:ring-sky-900"
            id="companyName"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="optional"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-amber-500 text-sm font-middle mb-2"
            htmlFor="password"
          >
            Company Email
          </label>
          <input
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sky-900 focus:ring-sky-900"
            id="companyEmail"
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="company-size"
            className="font-middle mb-2 block text-sm  text-amber-500"
          >
            What is the mission statement?
          </label>
          <input
            name="missionStatement"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sky-900 focus:ring-sky-900"
            type="text"
            value={formData.missionStatement}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-amber-500 text-sm font-middle mb-2"
            htmlFor="password"
          >
            What is the deadline?
          </label>
          <input
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            id="deadlines"
            type="date"
            name="deadlines"
            value={formData.deadlines}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-amber-500 text-sm font-middle mb-2"
            htmlFor="password"
          >
            Outline the Project details
          </label>
          <textarea
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            id="projectDetails"
            type="text"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-sky-900 hover:bg-slate-800 text-pink-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
            type="submit"
          >
            Submit Edit
          </button>
          <button
            type="button"
            className="bg-pink-800 rounded-full px-4 py-2 mx-2 text-white"
          >
            <Link to="/dashboard" replace>
              Cancel
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
