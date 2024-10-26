import React from 'react'

const PhotoCard = ({ url, onClick }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className=" flex p-2 border-2 border-stone-400 rounded-md mt-2 cursor-pointer">
          <img
            src={url}
            className="transition-transform duration-300 ease-in-out transform hover:scale-110 rounded h-28 object-cover w-full"
          />
        </div>
      </div>
      <div>
        <button type="button" 
            onClick={onClick}
            className="p-2 bg-orange-600 text-center w-full flex 
            items-center gap-1 justify-center text-slate-200
            rounded-md hover:bg-white transition duration-300 hover:border hover:border-orange-600
            hover:text-orange-600">
          Delete
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className='size-4'
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;