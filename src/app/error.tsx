"use client";
import { Error as ErrorComponent } from "@components/Common/Error";

export default function Error() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", top: "15%", width: "100%" }}>
        <ErrorComponent />
      </div>
    </div>
  );
}
