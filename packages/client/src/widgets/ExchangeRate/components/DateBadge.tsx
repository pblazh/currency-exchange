import React from "react";

export default ({date}:{date: Date}) => (
    <div>At {date.toLocaleDateString()}</div>
);
