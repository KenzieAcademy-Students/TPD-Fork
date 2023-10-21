import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Projects({ setProjects, projects }) {
  const initialValues = {
    projectName: "",
    companyName: "",
    companyEmail: "",
    projectDetails: "",
    missionStatement: "",
    deadlines: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const axios = useAxiosPrivate();

  const handleSubmitProject = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Only submit if there are no errors
      setIsLoading(true);

      try {
        const response = await axios.post(`/project`, formData);

        setProjects([response.data, ...projects]);

        setFormData(initialValues);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = (formData) => {
    const errors = {};
    if (!formData.projectName) {
      errors.projectName = "Please enter a Project Name.";
    }

    if (!formData.missionStatement) {
      errors.missionStatement = "Please enter a mission statement.";
    }
    if (!formData.projectDetails) {
      errors.projectDetails = "Please enter the projects details.";
    }

    return errors;
  };
  console.log(errors);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-sm mx-auto align-middle">
      <form
        className="bg-sky-900 bg-opacity-40 rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmitProject}
      >
        <div className="mb-4">
          <label
            className="block text-sky-100 text-sm font-medium mb-2"
            htmlFor="projectName"
          >
            Project Name
          </label>
          <input
            className="bg-white rounded-md py-2 px-3 w-full text-black leading-tight focus:outline-none focus:shadow-outline-indigo"
            id="projectName"
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
          {errors.projectName && (
            <p className="text-red-500 text-xs italic">
              {errors.projectName}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sky-100 text-sm font-medium mb-2"
            htmlFor="companyName"
          >
            Company Name:
          </label>
          <input
            className="bg-white rounded-md py-2 px-3 w-full text-black leading-tight focus:outline-none focus:shadow-outline-indigo"
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
            className="block text-sky-100 text-sm font-medium mb-2"
            htmlFor="companyEmail"
          >
            Company Email
          </label>
          <input
            className="bg-white rounded-md py-2 px-3 w-full text-black leading-tight focus:outline-none focus:shadow-outline-indigo"
            id="companyEmail"
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
          />
          {errors.companyEmail && (
            <p className="text-red-500 text-xs italic">
              {errors.companyEmail}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="missionStatement"
            className="font-medium mb-2 block text-sm text-sky-100"
          >
            What is the mission statement?
          </label>
          <input
            name="missionStatement"
            className="bg-white rounded-md py-2 px-3 w-full text-black font-bold leading-tight focus:outline-none focus:shadow-outline-indigo"
            type="text"
            value={formData.missionStatement}
            onChange={handleChange}
          />
          {errors.missionStatement && (
            <p className="text-red-500 text-xs italic">
              {errors.missionStatement}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="deadlines"
            className="font-medium mb-2 block text-sm text-sky-100"
          >
            What are the deadlines for this project?
          </label>
          <input
            name="deadlines"
            className="bg-white rounded-md py-2 px-3 w-full text-black leading-tight focus:outline-none focus:shadow-outline-indigo"
            type="date"
            value={formData.deadlines}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="projectDetails"
            className="font-medium mb-2 block text-sm text-sky-100"
          >
            Describe your project
          </label>
          <textarea
            className="bg-white rounded-md py-2 px--full text-black leading-tight focus:outline-none focus:shadow-outline-indigo h-32"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            rows={4}
            cols={35}
          ></textarea>
          {errors.projectDetails && (
            <p className="text-red-500 text-xs italic">
              {errors.projectDetails}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-amber-500 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-indigo"
            type="submit"
          >
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
}
