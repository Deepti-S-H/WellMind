import React from "react";

export default function Button({
  style={
    "background": " #ff8776",
    "color": "White",
    "cursor": "pointer",
    "border": "1px solid #ff8776"
},
  id,
  text,
  className,
  onClick
}) {
  return (
    <button
      className={className}
      id={id}
      onClick={(e) => onClick(id)}
      style={style}
    >
      {text}
    </button>
  );
}
