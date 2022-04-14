import {
  useLocation,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    let outletContext = useOutletContext();
    return (
      <Component
        {...props}
        router={{ location, navigate, params, outletContext }}
      />
    );
  }

  return ComponentWithRouterProp;
}
