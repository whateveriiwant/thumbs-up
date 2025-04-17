declare module "*.svg" {
  import * as React from "react";
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.svg?react" {
  import * as React from "react";
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  const content: string;
  export default content;
}
