import FadeLoader from "react-spinners/FadeLoader";
import { useRoutes } from "react-router-dom";
import Router from "./router";
import isValidToken from "./utils/isValidToken";
import { useQuery } from "react-query";
function App() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getToken"],
    queryFn: isValidToken,
  });

  if (isLoading) {
    const routing = useRoutes(Router([]));

    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader
          color={"#0c008a"}
          loading={isLoading}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (error) {
    return <h1>there is a terrible error </h1>;
  }

  var [tokenValid, _] = data;
  const routing = useRoutes(Router(tokenValid));

  return <>{routing}</>;
}

export default App;
