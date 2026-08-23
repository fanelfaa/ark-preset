import Intro from "./intro.mdx";
import Installation from "./installation.gen.mdx";
import Usage from "./usage.mdx";
import Api from "./api.mdx";
import type { Component } from "solid-js";

const PaginationDoc: Component = () => {
  return (
    <>
      <Intro />
      <Installation />
      <Usage />
      <Api />
    </>
  );
};

export default PaginationDoc;
