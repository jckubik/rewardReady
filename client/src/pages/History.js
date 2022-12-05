import SubHeader from "../components/SubHeader";
import { useSelector, useDispatch } from "react-redux";
import { State } from "country-state-city";

const History = () => {
  const { history } = useSelector((state) => state.user);
  const logs = history.logs ? [...history.logs] : [];
  const default_image = require("../assets/defaultCoupon.jpeg");
  console.log(logs);

  return (
    <div className="w-full">
      <SubHeader active="history" />
      <div className="flex flex-col gap-2 m-8">
        {logs.length > 0 ? (
          logs.reverse().map((log, index) => (
            <div key={index} className="flex items-center gap-4">
              <a
                href={log.content.clickUrl ? log.content.clickUrl : "#"}
                className="pointer-cursor"
              >
                <img
                  className="object-cover w-32 h-16 flex-1"
                  alt={log.content.title}
                  src={log?.content.imgSrc ? log.content.imgSrc : default_image}
                />
              </a>
              <div className="max-w-xs flex-1">
                <a
                  href={log.content.clickUrl ? log.content.clickUrl : "#"}
                  className="pointer-cursor"
                >
                  <p className="truncate">{log.content.title}</p>
                </a>
              </div>
              <div className="text-center w-48">
                <a
                  href={log.content.clickUrl ? log.content.clickUrl : "#"}
                  className="pointer-cursor"
                >
                  <p className="truncate">{log.content.subtitle}</p>
                </a>
              </div>
              <div className="flex-1 max-w-max">
                <p>{new Date(log.date).toDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h3>You have no history data.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
