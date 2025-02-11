import React from "react";
import "./ModuleHeader.css";

export default function ModuleHeader() {
  return (
    <>
      <div className="py-5" style={{ backgroundColor: "#181d38" }}>
        <h1 style={{ color: "#ffc107 " }}>Welcome to Mind Enhancement </h1>
        <p style={{ color: "#fff" }} className="mb-0 mt-4  moduleHeaderDesc">
          46 wordsclear Humanize AI Mental health is about our emotional,
          psychological, and social well-being. It affects how we think, feel,
          and act. It also helps determine how we handle stress, relate to
          others, and make choices. Mental health is important at every stage of
          life, from childhood and adolescence through adulthood.
        </p>
      </div>
    </>
  );
}
