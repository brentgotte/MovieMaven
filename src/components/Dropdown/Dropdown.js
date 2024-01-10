import React from 'react';

const Dropdown = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className=" bg-dark-500 w-4/6 ">
      <div className="flex flex-col ">
        {children}
        {/* <button onClick={onClose} className="modal-close-button">Close Dropdown</button> */}
      </div>
    </div>
  );
};

export default Dropdown;
