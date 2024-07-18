import Image from "next/image";

export default function Loading() {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: 'center' }}>
      <Image src="/loadingSpinner.svg" alt="Loading" width={100} height={100} />
    </div>
  );
}
