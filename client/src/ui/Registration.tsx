import { useState } from "react";
("./Login");
import Label from "./Label";
import { MdPhotoLibrary } from "react-icons/md";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import upload from "../lib/upload";
import { doc, setDoc } from "firebase/firestore";
import Login from "./Login";

const Registration = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e: any) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleRegistration = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { firstName, lastName, email, password }: any =
      Object.fromEntries(formData);
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      let imageUrl = null;
      if (avatar && avatar?.file) {
        imageUrl = await upload(avatar?.file);
      }
      await setDoc(doc(db, "users", res.user.uid), {
        firstName,
        lastName,
        email,
        avatar: imageUrl,
        id: res.user.uid,
      });
      setLogin(true);
    } catch (error: any) {
      let errorMessage;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email.";
          break;
        case "auth/missing-password":
          errorMessage = "Please enter a password.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use. Try another email.";
          break;
        // Add more cases as needed
        default:
          errorMessage = "An error occurred. Please try again.";
      }
      console.log("Error", error);
      setErrMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {login ? (
        <Login setLogin={setLogin} />
      ) : (
        <div className="bg-gray-950 rounded-lg">
          <form
            onSubmit={handleRegistration}
            className="max-w-5xl mx-auto pt-10 px-10 lg:px-0 text-white"
          >
            <div className="border-b border-b-white/10 pb-5">
              <h2 className="text-lg font-semibold uppercase leading-7">
                Registration Form
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                You need to provide required information to get register with
                us.
              </p>
            </div>
            <div className="border-b border-b-white/10 pb-5">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Label title="First name" htmlFor="firstName" />
                  <input
                    type="text"
                    name="firstName"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                  />
                </div>
                <div className="sm:col-span-3">
                  <Label title="Last name" htmlFor="lastName" />
                  <input
                    type="text"
                    name="lastName"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                  />
                </div>
                <div className="sm:col-span-4">
                  <Label title="Email address" htmlFor="email" />
                  <input
                    type="email"
                    name="email"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                  />
                </div>
                <div className="sm:col-span-4">
                  <Label title="Password" htmlFor="password" />
                  <input
                    type="password"
                    name="password"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                  />
                </div>
                <div className="col-span-full">
                  <div className="mt-2 flex items-center gap-x-3">
                    <div className="flex-1">
                      <Label title="Cover photo" />
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-4">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-14 h-14 border border-gray-600 rounded-full p-1">
                            {avatar?.url ? (
                              <img
                                src={avatar?.url}
                                alt="userImage"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <MdPhotoLibrary className="mx-auto h-full w-full text-gray-500" />
                            )}
                          </div>
                          <div className="mt-4 flex items-center mb-1 text-sm leading-6 text-gray-400">
                            <label htmlFor="file-upload">
                              <span className="relative cursor-pointer rounded-md px-2 py-1 bg-gray-900 font-semibold text-gray-200 hover:bg-gray-800">
                                Upload a file
                              </span>
                              <input
                                type="file"
                                name="file-upload"
                                id="file-upload"
                                className="sr-only"
                                onChange={handleAvatar}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-400">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {errMsg && (
              <p className="bg-white/90 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold">
                {errMsg}
              </p>
            )}
            <button
              disabled={loading}
              type="submit"
              className={`mt-5 w-full py-2 uppercase text-base font-bold tracking-wide text-gray-300 rounded-md hover:text-white hover:bg-indigo-600 duration-200 ${
                loading ? "bg-gray-500 hover:bg-gray-500" : "bg-indigo-700"
              }`}
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </form>
          <p className="text-sm leading-6 text-gray-400 text-center -mt-2 py-10">
            Already have an Account{" "}
            <button
              onClick={() => setLogin(true)}
              className="text-gray-200 font-semibold underline underline-offset-2 decoration-[1px] hover:text-white duration-200"
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Registration;
