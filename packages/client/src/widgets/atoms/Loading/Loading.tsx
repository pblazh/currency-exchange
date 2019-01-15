import React, { ReactNode } from "react";

import "./Loading.scss";

export default ({ children }: { children: ReactNode }) => (
  <div className="Loading">{children}</div>
);
