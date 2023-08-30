/// <reference types="react-scripts" />
declare module "react-helmet";
declare module "*.md" {
  const value: string; // markdown is just a string
  export default value;
}

declare module "*.mdx" {
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module "mdx.macro";

declare module "uuid";
