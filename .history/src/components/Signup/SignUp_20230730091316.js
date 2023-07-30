import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setErr("success");
            setLoading(false);
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr("image-upload");
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        setErr("email-exists");
      } else {
        setErr("error");
      }
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Username" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password (Minimum 6 Characters)" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <div className="profile-picture">
              <img className="profile-picture-img" src="https://cdn0.iconfinder.com/data/icons/user-interface-1-32/32/upload-photo-2-256.png" alt="" />
              <h4>Upload your profile picture</h4>
            </div>
          </label>
          <button className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        {loading && <p>Uploading your profile the image, please wait...</p>}
        {err === "email-exists" && <p>Email address is already in use. Please use a different email.</p>}
        {err === "image-upload" && <p>Error uploading the profile picture. Please try again later.</p>}
        {err === "success" && <p>Sign up successful! Redirecting to the homepage...</p>}
        {err === "error" && <p>Oops! Something went wrong during the sign-up process. Please try again.</p>}
        <p>
          You already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
