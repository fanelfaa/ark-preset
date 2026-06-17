import Intro from "./intro.mdx";
import Usage from "./usage.mdx";
import Api from "./api.mdx";
import type { Component } from "solid-js";

const HoverCardDoc: Component = () => {
  return (
    <>
      <Intro />
      <Usage />
      <Api />
    </>
  );
};

export default HoverCardDoc;
