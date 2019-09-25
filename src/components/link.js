import { useRouter } from './router';
import { resolveToLocation, normalizeToLocation } from "../lib/location";

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function LinkAnchor({ innerRef, navigate, onClick, children, ...rest }) {
  const { target } = rest;

  return (
    <a
      {...rest}
      ref={innerRef} // TODO: Use forwardRef instead
      onClick={event => {
        try {
          if (onClick) onClick(event);
        } catch (ex) {
          event.preventDefault();
          throw ex;
        }

        if (
          !event.defaultPrevented && // onClick prevented default
          event.button === 0 && // ignore everything but left clicks
          (!target || target === "_self") && // let browser handle "target=_blank" etc.
          !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
          event.preventDefault();
          navigate();
        }
      }}
    >{(children)}</a>
  );
}

/**
 * The public API for rendering a history-aware <a>.
 */
export function Link({ component = LinkAnchor, replace, to, children, ...rest }) {
    
    const [router] = useRouter();
    const { history } = router;
    const currentLocation = history.location;

    const location = normalizeToLocation(
        resolveToLocation(to, currentLocation.pathname),
        currentLocation.pathname
    );

    const href = location ? history.createHref(location) : '';
    const navigate = () => {
      const location = resolveToLocation(to, currentLocation);
      const method = replace ? history.replace : history.push;
      method(location);
    };

    return (
      <LinkAnchor
        {...rest}
        href={href}
        navigate={navigate}
      >
      {(children)}
      </LinkAnchor>
    )
}
