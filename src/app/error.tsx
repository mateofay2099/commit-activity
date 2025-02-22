"use client";
import { Error as ErrorComponent } from "@components/common/Error";

export default function Error() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "15%",
          width: "100%",
          padding: "2rem",
        }}
      >
        <ErrorComponent />
      </div>
    </div>
  );
}
