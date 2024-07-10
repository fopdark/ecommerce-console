declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "pages";
declare module "*/translation/i18n";
declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
}
