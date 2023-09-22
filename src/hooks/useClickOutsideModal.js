import { useEffect, useRef } from "react";

function useClickOutsideModal(handler, listenCapturing = true) {
  const ref = useRef();

  //click outside of modal will now allow the modal to close
  useEffect(
    function () {
      function handleClick(e) {
        //if the current ref exists and the current ref does not contain the element we passed in, which in this case is where the click happens. so basically if the ref does contain the modal window, it won't close, and if it doesn't, it will close
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}

export default useClickOutsideModal;
