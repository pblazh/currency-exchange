import React, { ReactNode } from "react";

import "./Message.scss";

export default ({ children }: { children: ReactNode }) => (
  <div className="Message">{children}</div>
);
