import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

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
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center my-10">
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
              placeholder="Age"
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
          <p className="text-red-500">{error}</p>
          <button className="btn btn-primary mt-4" onClick={saveProfile}>
            Save Profile
          </button>
        </fieldset>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
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
