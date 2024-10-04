"use client";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "./OpenModalButton";
import { Ellipsis } from "lucide-react";

function ModalActions({ id, buttonLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (buttonRef.current === e.target.closest("button")) return;

      if (modalRef.current && !modalRef.current.contains(e.target))
        setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <>
      <button ref={buttonRef} onClick={() => setIsOpen((cur) => !cur)}>
        <Ellipsis className="size-4 text-grey-500 hover:text-grey-300" />
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="absolute right-6 top-12 flex flex-col items-start overflow-hidden rounded-lg bg-white shadow-md"
        >
          <OpenModalButton
            className="w-full p-3 text-start text-sm text-grey-900 hover:bg-grey-100"
            type="edit"
            id={id}
          >
            Edit {buttonLabel}
          </OpenModalButton>
          <span className="block h-[0.75px] w-[75%] self-center bg-grey-100"></span>
          <OpenModalButton
            type="delete"
            id={id}
            className="w-full p-3 text-start text-sm text-red hover:bg-grey-100"
          >
            Delete {buttonLabel}
          </OpenModalButton>
        </div>
      )}
    </>
  );
}

export default ModalActions;
