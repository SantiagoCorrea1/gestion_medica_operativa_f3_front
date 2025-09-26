import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Bienvenidos al Sistema de Gestión Médica
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Una solución integral para la administración de su clínica.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/dashboard">
            <Button size="lg">
              Ingresar al Sistema
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}