export function useBehavior(context) {
  const {type, getDetail} = context;
  return function (subject, target) {
    const event = new CustomEvent(type, {bubbles: true, detail: getDetail.call(context, subject, target)});
    target.dispatchEvent(event);
  };
}