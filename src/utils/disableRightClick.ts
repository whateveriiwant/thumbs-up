export const disableRightClick = (): void => {
  document.oncontextmenu = function () {
    return false;
  };
};

export default disableRightClick;
