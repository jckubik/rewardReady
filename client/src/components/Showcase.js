import ShowcaseHelper from "./ShowcaseHelper";
const Showcase = (props) => {
  let backgroundColor = "bg-" + props.backgroundColor;
  return (
    <ShowcaseHelper
      type={props.type}
      backgroundColor={backgroundColor}
      title={props.title}
    />
  );
};

export default Showcase;
