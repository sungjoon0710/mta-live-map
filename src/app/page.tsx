"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-bold text-4xl" style={{ fontFamily: 'FreeSansBold' }}>
        NYC MTA Live Map
        <Button onClick={() => router.push("/123/1")}>1 Train</Button>
      </h1>
    </div>
  );
}
