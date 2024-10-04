"use client";

import "react-toastify/dist/ReactToastify.css";
import "../../app/globals.css";
import { ToastContainer } from "react-toastify";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: "bg-white text-green border-green",
    error: "bg-white text-red border-red",
    info: "bg-white text-grey-500 border-grey-500",
    warning: "bg-white text-orange border-orange",
  };

  const contextIcon = {
    success: <CheckCircleIcon className="text-green" />,
    error: <ExclamationCircleIcon className="text-red" />,
    info: <InformationCircleIcon className="text-grey-500" />,
    warning: <ExclamationTriangleIcon className="text-orange" />,
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-1 min-h-10 border rounded-lg bg-white rounded-md justify-between overflow-hidden cursor-pointer"
        }
        icon={(context) => contextIcon[context?.type]}
        bodyClassName={() => "text-sm flex font-white font-med block p-4 "}
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
    </>
  );
}
