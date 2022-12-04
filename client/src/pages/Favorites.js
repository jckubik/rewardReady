import { useSelector, useDispatch } from "react-redux";

const Favorites = () => {
  const { favorites } = useSelector(state => state.user);

  return (
    <div className="w-full">
    <SubHeader active="favorites" />
    <div className="flex flex-col gap-2 m-8">
      <div>
        {
          favorites.map(store => (
            <div
              key={store.id}
              className={`m-1 aspect-square bg-white rounded-lg grid place-items-center cursor-pointer hover:ring-2 overflow-hidden ${
                  store.selected && "ring-2 ring-green-500"
              }`}
              onClick={() => toggleStore(store.id)}
            >
              <img src={store.img} />
        </div>
          ))
        }
      </div>
    </div>
  </div>
  );
};

export default Favorites;