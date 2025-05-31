import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const saveProfile = async () => {
    // clear error
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      navigate("/");
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      // setError("Failed to save profile");
      setError(err.response.data.message);
      navigate("/profile");
    }
  };
  return (
    <div className="flex justify-center my-10 pb-20">
      <div className="flex justify-center mx-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border px-4">
          <legend className="fieldset-legend">Edit Profile</legend>
          <div>
            <label className="label mt-2">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="label mt-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="input"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="label mt-2">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              className="input"
              placeholder="Photo URL"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="label mt-2">Age</label>
            <input
              type="text"
              value={age}
              className="input"
              placeholder="age: must be greater than 18"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="label mt-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label className="label mt-2">About</label>
            <textarea
              className="textarea"
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="label">Skills (max 10)</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="input flex-1"
                value={skillInput}
                placeholder="Enter a skill and press Add"
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <button
                type="button"
                className="btn"
                onClick={() => {
                  if (
                    skillInput &&
                    !skills.includes(skillInput) &&
                    skills.length < 10
                  ) {
                    setSkills([...skills, skillInput]);
                    setSkillInput("");
                  }
                }}
              >
                Add
              </button>
            </div>

            {/* Display added skills */}
            <div className="flex flex-wrap mt-2 gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() =>
                      setSkills(skills.filter((_, i) => i !== idx))
                    }
                    className="text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <p className="text-red-500">{error}</p>
          <button className="btn btn-primary mt-4" onClick={saveProfile}>
            Save Profile
          </button>
        </fieldset>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about, skills }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
