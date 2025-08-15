import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

function forceScrollTop(behavior = "auto") {
  const winScroll = () => {
    try { window.scrollTo({ top: 0, left: 0, behavior }); }
    catch { window.scrollTo(0, 0); }
  };
  const elemScroll = (el) => {
    if (!el) return;
    try { el.scrollTo({ top: 0, left: 0, behavior }); }
    catch { el.scrollTop = 0; el.scrollLeft = 0; }
  };

  winScroll();
  elemScroll(document.scrollingElement);
  elemScroll(document.documentElement);
  elemScroll(document.body);
  elemScroll(document.querySelector("main"));
  elemScroll(document.querySelector(".page"));
  elemScroll(document.querySelector("#root"));
}

export default function ScrollToTop({ behavior = "smooth" }) {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    // beat layout + any autofocus/late effects
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => {
        setTimeout(() => forceScrollTop(behavior), 0);
      });
      ScrollToTop._ids?.push(id2);
    });
    (ScrollToTop._ids ||= []).push(id1);

    return () => {
      (ScrollToTop._ids || []).forEach(cancelAnimationFrame);
      ScrollToTop._ids = [];
    };
  }, [pathname, search, hash, behavior]);

  // also run once on first mount, helps with the first page load
  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => forceScrollTop(behavior));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
