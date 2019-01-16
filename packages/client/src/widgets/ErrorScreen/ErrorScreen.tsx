// import Message from "@atoms/Message";
import React, { SFC } from "react";
import Message from "../atoms/Message";

interface IProps {
  componentStack: string;
  error: Error;
}

const ErrorScreen: SFC<IProps> = ({ error }) => (<Message> {error.message} </Message>);

export default ErrorScreen;
