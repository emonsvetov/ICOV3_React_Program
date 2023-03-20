import React from "react";
const paths = {
  SocialWall: "containers/Participant/Home/socialWall",
  SocialWallItem: "containers/Participant/Home/socialWall",
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const ThemedComponent = (props) => {
  const { component, template } = props;
  const Component = React.lazy(() =>
    import(`@/${paths[component]}/themed/${component}${capitalizeFirstLetter(template.name)}`).catch(
      () => ({ default: () => <div>Template [{component}] Not found</div> })
    )
  );
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};
export default ThemedComponent;
