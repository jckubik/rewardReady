const SelectCard = ({ visible, setVisible }) => {
  return visible ? (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter"
      onClick={() => setVisible(false)}
    >
      <div
        className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold">Add Credit Card</h2>
        <select className="h-9 rounded-xl body w-72">
          <option selected>Select credit card</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
    </div>
  ) : null;
};

export default SelectCard;
