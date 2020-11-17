import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useRecoilValue } from "recoil";
import { isLoading } from "../../Store/Loading";

import "./Loading.scss";

const Loading: React.FC = () => {
  const loading = useRecoilValue(isLoading);

  return <div className="Loading">{loading && <LinearProgress />}</div>;
};

export default Loading;
