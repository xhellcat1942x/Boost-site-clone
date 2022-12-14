import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { UserContext } from "./context";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  // console.log(user);
  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;
    if (user) {
      const ref = doc(getFirestore(), "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setFirstName(doc.data()?.firstName);
        setLastName(doc.data()?.lastName);
        setEmail(doc.data()?.email);
      });
    } else {
      setFirstName(null);
    }

    return unsubscribe;
  }, [user]);
  return { user, firstName, lastName, email };
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/** Parse a string containing a date and return a date string formatted as Month day, year */
export const parseDate = (date) => {
  let dateObj = new Date(date);
  let formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

export const useGlobalData = () => {};
