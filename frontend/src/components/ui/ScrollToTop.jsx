import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on every navigation — without this, moving from a
 * long listing page into a product lands you halfway down the new page.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(
    function () {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    },
    [pathname]
  );

  return null;
}

export default ScrollToTop;
