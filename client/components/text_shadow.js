import React from "react";
import { css } from "react-emotion";

const textShadow = (foreground, background) => {
  return css`
    text-shadow: -1px -1px 0 ${foreground}, 1px -1px 0 ${foreground},
      -1px 1px 0 ${foreground}, 1px 1px 0 ${foreground},
      1px 0px 0px ${background}, 0px 1px 0px ${background},
      2px 1px 0px ${background}, 1px 2px 0px ${background},
      3px 2px 0px ${background}, 2px 3px 0px ${background},
      4px 3px 0px ${background}, 3px 4px 0px ${background},
      5px 4px 0px ${background}, 3px 5px 0px ${foreground},
      6px 5px 0px ${foreground}, -1px 2px 0 black, 0 3px 0 ${foreground},
      1px 4px 0 ${foreground}, 2px 5px 0px ${foreground},
      2px -1px 0 ${foreground}, 3px 0 0 ${foreground}, 4px 1px 0 ${foreground},
      5px 2px 0px ${foreground}, 6px 3px 0 ${foreground},
      7px 4px 0 ${foreground};
  `;
};

export default textShadow;
