"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function OneTrainPage() {
  const router = useRouter();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--red)' }}>
      <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>1 train</h1>
      <Button onClick={() => router.push("/")}>Home</Button>
    </div>
  );
}
