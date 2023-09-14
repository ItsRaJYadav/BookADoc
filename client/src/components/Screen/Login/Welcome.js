import React from "react";

const WelcomeMessage = ({ name, avatar, message}) => {
  return (
    <div className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg mt-10">
      <div className="flex items-start p-4">
        <div className="flex-shrink-0 pt-0.5">
          <img className="h-10 w-10 rounded-full" src={avatar} alt="" />
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-white">
            Hey, {name}
          </p>
          <p className="mt-1 text-sm text-white">
          {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
