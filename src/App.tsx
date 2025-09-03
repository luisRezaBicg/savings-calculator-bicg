import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, LineChart, Wrench, UsersRound, Calculator, ArrowRight, Mail, Phone, Building2, User } from "lucide-react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Utilidades
const eur = (n: number) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(isFinite(n) ? n : 0);
const num = (n: number) => new Intl.NumberFormat("es-ES").format(isFinite(n) ? n : 0);

export default function App() {
  // Entradas principales (calculadora minimalista)
  const [m2, setM2] = useState<number>(1500);
  const [pax, setPax] = useState<number>(200);

  // Supuestos por defecto (no editables en la UI)
  const SUP = {
    costeM2: 300, // €/m²/año
    porcAhorroEspacio: 25, // %
    horasPorEmpleado: 40, // h/año
    valorProductividadPorEmpleado: 1000, // €/año
    m2PorPersona: 8, // m²/px
    porcCapacidad: 25, // % adicional
    incidMes: 0, // por simplicidad inicial
    costeIncid: 0,
  } as const;

  const calcRef = useRef<HTMLDivElement | null>(null);
  const contactoRef = useRef<HTMLDivElement | null>(null);

  // Cálculos
  const r = useMemo(() => {
    const ahorroEspacio = m2 * SUP.costeM2 * (SUP.porcAhorroEspacio / 100);
    const horasGanadas = pax * SUP.horasPorEmpleado;
    const valorProductividad = pax * SUP.valorProductividadPorEmpleado;
    const capacidadActual = Math.floor(m2 / Math.max(1, SUP.m2PorPersona));
    const capacidadExtra = Math.round(capacidadActual * (SUP.porcCapacidad / 100));
    const incidEvitadasAnuales = SUP.incidMes * 0.5 * 12; // -50%
    const ahorroIncidencias = SUP.incidMes * SUP.costeIncid * 0.5 * 12;
    const ahorroTotal = ahorroEspacio + valorProductividad + ahorroIncidencias;

    const chart = [
      { name: "Ahorro espacio", value: Math.max(0, Math.round(ahorroEspacio)) },
      { name: "Productividad", value: Math.max(0, Math.round(valorProductividad)) },
      { name: "Incidencias", value: Math.max(0, Math.round(ahorroIncidencias)) },
    ];

    return { ahorroEspacio, horasGanadas, valorProductividad, capacidadActual, capacidadExtra, incidEvitadasAnuales, ahorroIncidencias, ahorroTotal, chart };
  }, [m2, pax]);

  // Handlers
  const toNumber = (v: string) => Number((v || "").replace(/[^0-9.,]/g, "").replace(/,/g, ".")) || 0;
  const scrollToCalc = () => calcRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToContacto = () => contactoRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-slate-900" />
            <span className="font-extrabold tracking-tight text-slate-900">bicg</span>
            <Badge variant="secondary" className="ml-2">Campaña</Badge>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" onClick={scrollToCalc}>Calculadora</Button>
            <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={scrollToContacto}>Habla con un experto</Button>
          </div>
        </div>
      </header>

      {/* Hero moderno */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 10% -20%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(1000px 500px at 90% 0%, rgba(11,18,32,0.25), transparent 60%)",
          }}
        />
        <div
          className="relative"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,18,32,0.92) 0%, rgba(11,18,32,0.75) 35%, rgba(255,255,255,1) 100%), url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Ahorro de costes operativos
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                Las oficinas del presente,<span className="text-blue-400"> preparadas para el futuro</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
                Estima el ahorro con un enfoque de oficina basada en la actividad. Calculadora simple y resultados claros.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800" onClick={scrollToCalc}>
                  <Calculator className="mr-2 h-5 w-5" /> Calcula tu ahorro
                </Button>
                <Button size="lg" variant="secondary" onClick={scrollToContacto}>
                  Habla con un experto <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios destacados */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: PiggyBank, title: "Ahorro de costes", desc: "Más del 25% del coste operativo ligado al espacio, la tecnología y su uso." },
            { icon: LineChart, title: "Productividad", desc: "Hasta 40 horas por persona al año gracias a conectividad y digitalización." },
            { icon: UsersRound, title: "Capacidad de crecimiento", desc: "20 a 30% adicional en la misma oficina sin nueva inversión inmobiliaria." },
            { icon: Wrench, title: "Incidencias técnicas", desc: "Reducción del 50% en incidencias de infraestructura." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="group overflow-hidden rounded-2xl border-slate-200 shadow-sm transition hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Icon className="h-5 w-5" /> {title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
              <div className="h-1 w-full bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 opacity-0 transition group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </section>

      {/* Calculadora */}
      <section ref={calcRef} className="border-t bg-slate-50/70 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Inputs */}
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Calcula tu ahorro potencial</CardTitle>
                <CardDescription>Introduce solo dos datos. Los supuestos están precargados según benchmarks.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="m2">Metros cuadrados</Label>
                    <Input id="m2" inputMode="numeric" value={m2} onChange={(e) => setM2(toNumber((e.target as HTMLInputElement).value))} placeholder="Ej. 1500" />
                  </div>
                  <div>
                    <Label htmlFor="pax">Número de personas</Label>
                    <Input id="pax" inputMode="numeric" value={pax} onChange={(e) => setPax(toNumber((e.target as HTMLInputElement).value))} placeholder="Ej. 200" />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">{eur(SUP.costeM2)} por m²</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{SUP.porcAhorroEspacio}% ahorro de espacio</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{SUP.horasPorEmpleado} h por empleado</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{eur(SUP.valorProductividadPorEmpleado)} valor anual por empleado</span>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={scrollToContacto}>Habla con un experto</Button>
                </div>
              </CardContent>
            </Card>

            {/* Resultados */}
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="rounded-3xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-600">Ahorro anual estimado</CardTitle>
                    <div className="text-3xl font-bold">{eur(r.ahorroTotal)}</div>
                    <CardDescription>Espacio + productividad + incidencias</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="rounded-3xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-600">Horas ganadas al año</CardTitle>
                    <div className="text-3xl font-bold">{num(r.horasGanadas)}</div>
                    <CardDescription>Total equipo</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="rounded-3xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-600">Capacidad adicional</CardTitle>
                    <div className="text-3xl font-bold">{num(r.capacidadExtra)} plazas</div>
                    <CardDescription>Mejora del {SUP.porcCapacidad}% sin nueva inversión</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle>Distribución del ahorro</CardTitle>
                  <CardDescription>Desglose por tipo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={r.chart}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v: number) => eur(v)} />
                        <Legend />
                        <Bar dataKey="value" name="Ahorro" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Nota */}
          <div className="mt-6 rounded-2xl border bg-white p-5 text-sm leading-relaxed text-slate-700">
            <p className="font-medium uppercase tracking-wide text-slate-600">Aspectos a tener en cuenta</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Los beneficios dependen de liberar y optimizar espacio.</li>
              <li>Analiza dinámicas de trabajo para enfocar las acciones de mayor impacto.</li>
              <li>La gestión del cambio y la formación son clave para maximizar beneficios.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section ref={contactoRef} className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">¿Quieres conocer en detalle cómo conseguir este ahorro?</h2>
              <p className="mt-2 text-slate-600">Déjanos tus datos y te contactamos para explicarte cómo.</p>

              <div className="mt-6 rounded-3xl border p-6 shadow-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Gracias. Hemos registrado tu interés y te contactaremos en breve.");
                  }}
                  className="grid gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label><span className="inline-flex items-center gap-2"><User className="h-4 w-4" /> Nombre</span></Label>
                      <Input required placeholder="Tu nombre" />
                    </div>
                    <div>
                      <Label>Cargo</Label>
                      <Input placeholder="Ej. HR Director" />
                    </div>
                    <div>
                      <Label><span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" /> Empresa</span></Label>
                      <Input placeholder="Nombre de la empresa" />
                    </div>
                    <div>
                      <Label><span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span></Label>
                      <Input type="email" required placeholder="nombre@empresa.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label><span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Teléfono</span></Label>
                      <Input placeholder="Opcional" />
                    </div>
                  </div>
                  <div>
                    <Label>Comentarios</Label>
                    <Textarea placeholder="Cuéntanos brevemente tu situación" />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-slate-500">Al enviar aceptas nuestra política de privacidad.</div>
                    <Button type="submit" size="lg" className="bg-slate-900 text-white hover:bg-slate-800">Enviar</Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Resumen lateral */}
            <div className="lg:pl-8">
              <Card className="sticky top-20 rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle>Resumen de tu estimación</CardTitle>
                  <CardDescription>Basado en los datos introducidos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-600">Ahorro total</div>
                    <div className="text-xl font-bold">{eur(r.ahorroTotal)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border p-3">
                      <div className="text-slate-500">Metros cuadrados</div>
                      <div className="font-semibold">{num(m2)} m²</div>
                    </div>
                    <div className="rounded-xl border p-3">
                      <div className="text-slate-500">Personas</div>
                      <div className="font-semibold">{num(pax)}</div>
                    </div>
                    <div className="rounded-xl border p-3">
                      <div className="text-slate-500">Ahorro por espacio</div>
                      <div className="font-semibold">{eur(r.ahorroEspacio)}</div>
                    </div>
                    <div className="rounded-xl border p-3">
                      <div className="text-slate-500">Productividad</div>
                      <div className="font-semibold">{eur(r.valorProductividad)}</div>
                    </div>
                    <div className="rounded-xl border p-3">
                      <div className="text-slate-500">Capacidad extra</div>
                      <div className="font-semibold">{num(r.capacidadExtra)} plazas</div>
                    </div>
                    <div className="rounded-xl border p-3">
                      <div className="text-slate-500">Horas ganadas</div>
                      <div className="font-semibold">{num(r.horasGanadas)} h</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">Valores estimados. No constituyen oferta comercial.</div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm md:flex-row">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="h-5 w-5 rounded bg-slate-900" />
            <span className="font-semibold text-slate-900">bicg</span>
            <span className="text-slate-500">One Employee Experience</span>
          </div>
          <div className="text-slate-500">© {new Date().getFullYear()} BICG. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
