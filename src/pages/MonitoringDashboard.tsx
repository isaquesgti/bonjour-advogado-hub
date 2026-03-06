import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Plus, Eye, EyeOff, Bell, BellRing, FileText, Scale, Calendar,
  User, Gavel, Clock, Trash2, CheckCircle2
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Tables } from "@/integrations/supabase/types";

type MonitoredProcess = Tables<"monitored_processes">;
type Publication = Tables<"publications">;
type Notification = Tables<"notifications">;

export default function MonitoringDashboard() {
  const { user, profile } = useAuth();
  const [processes, setProcesses] = useState<MonitoredProcess[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [newProcess, setNewProcess] = useState({ process_number: "", court: "", description: "" });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  async function fetchData() {
    setLoading(true);
    const [procRes, pubRes, notifRes] = await Promise.all([
      supabase.from("monitored_processes").select("*").order("created_at", { ascending: false }),
      supabase.from("publications").select("*").order("publication_date", { ascending: false }).limit(20),
      supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(20),
    ]);
    if (procRes.data) setProcesses(procRes.data);
    if (pubRes.data) setPublications(pubRes.data);
    if (notifRes.data) setNotifications(notifRes.data);
    setLoading(false);
  }

  async function addProcess() {
    if (!user || !newProcess.process_number.trim()) return;
    const { error } = await supabase.from("monitored_processes").insert({
      user_id: user.id,
      process_number: newProcess.process_number.trim(),
      court: newProcess.court.trim() || null,
      description: newProcess.description.trim() || null,
    });
    if (error) {
      toast.error("Erro ao adicionar processo");
    } else {
      toast.success("Processo adicionado ao monitoramento!");
      setNewProcess({ process_number: "", court: "", description: "" });
      setAddOpen(false);
      fetchData();
    }
  }

  async function toggleProcess(id: string, isActive: boolean) {
    await supabase.from("monitored_processes").update({ is_active: !isActive }).eq("id", id);
    fetchData();
  }

  async function deleteProcess(id: string) {
    await supabase.from("monitored_processes").delete().eq("id", id);
    toast.success("Processo removido");
    fetchData();
  }

  async function markNotificationRead(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <Scale className="mx-auto h-12 w-12 text-accent mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Acesso Restrito</h2>
              <p className="text-muted-foreground mb-4">Faça login para acessar o painel de monitoramento.</p>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-gold-dark">
                <a href="/login">Fazer Login</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Olá, {profile?.full_name || "Advogado"}
            </h1>
            <p className="text-muted-foreground mt-1">
              OAB: {profile?.oab_number || "—"} · Monitorando {processes.filter((p) => p.is_active).length} processos
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              { icon: FileText, label: "Processos", value: processes.length.toString() },
              { icon: Scale, label: "Publicações", value: publications.length.toString() },
              { icon: BellRing, label: "Não Lidas", value: unreadCount.toString() },
              { icon: CheckCircle2, label: "Ativos", value: processes.filter((p) => p.is_active).length.toString() },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <stat.icon className="h-4 w-4 text-accent" />
                  <span className="text-xs font-medium">{stat.label}</span>
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="processes" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="processes" className="data-[state=active]:bg-card data-[state=active]:text-accent">
                <FileText className="mr-2 h-4 w-4" /> Processos
              </TabsTrigger>
              <TabsTrigger value="publications" className="data-[state=active]:bg-card data-[state=active]:text-accent">
                <Scale className="mr-2 h-4 w-4" /> Publicações
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-card data-[state=active]:text-accent relative">
                <Bell className="mr-2 h-4 w-4" /> Notificações
                {unreadCount > 0 && (
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Processes Tab */}
            <TabsContent value="processes">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold text-foreground">Processos Monitorados</h2>
                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-gold-dark">
                      <Plus className="mr-2 h-4 w-4" /> Adicionar Processo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-display">Adicionar Processo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label>Número do Processo *</Label>
                        <Input
                          placeholder="0000000-00.0000.0.00.0000"
                          value={newProcess.process_number}
                          onChange={(e) => setNewProcess({ ...newProcess, process_number: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tribunal</Label>
                        <Input
                          placeholder="Ex: TJSP, STJ, TRF-3"
                          value={newProcess.court}
                          onChange={(e) => setNewProcess({ ...newProcess, court: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Input
                          placeholder="Breve descrição do caso"
                          value={newProcess.description}
                          onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })}
                        />
                      </div>
                      <Button onClick={addProcess} className="w-full bg-accent text-accent-foreground hover:bg-gold-dark">
                        Adicionar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {processes.length === 0 && !loading ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground">Nenhum processo monitorado ainda.</p>
                    <p className="text-sm text-muted-foreground mt-1">Clique em "Adicionar Processo" para começar.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {processes.map((proc, i) => (
                    <motion.div
                      key={proc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className={`transition-all ${!proc.is_active ? "opacity-60" : ""}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base font-semibold">{proc.process_number}</CardTitle>
                              {proc.court && (
                                <CardDescription className="mt-1">{proc.court}</CardDescription>
                              )}
                            </div>
                            <Badge variant={proc.is_active ? "default" : "secondary"} className={proc.is_active ? "bg-accent/15 text-accent border-accent/20" : ""}>
                              {proc.is_active ? "Ativo" : "Pausado"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {proc.description && (
                            <p className="text-sm text-muted-foreground mb-3">{proc.description}</p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <Clock className="h-3 w-3" />
                            Adicionado em {format(new Date(proc.created_at), "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleProcess(proc.id, proc.is_active)}
                            >
                              {proc.is_active ? <EyeOff className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
                              {proc.is_active ? "Pausar" : "Ativar"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => deleteProcess(proc.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" /> Remover
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Publications Tab */}
            <TabsContent value="publications">
              {publications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Scale className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground">Nenhuma publicação encontrada ainda.</p>
                    <p className="text-sm text-muted-foreground mt-1">As publicações aparecerão aqui quando forem detectadas.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {publications.map((pub, i) => (
                    <motion.div
                      key={pub.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                              <CardTitle className="text-base">{pub.process_number}</CardTitle>
                              <CardDescription className="mt-1">{pub.court}</CardDescription>
                            </div>
                            <Badge variant="secondary">
                              <Calendar className="mr-1 h-3 w-3" />
                              {format(new Date(pub.publication_date), "dd/MM/yyyy")}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                            {pub.class && (
                              <div>
                                <span className="text-muted-foreground">Classe:</span>{" "}
                                <span className="text-foreground font-medium">{pub.class}</span>
                              </div>
                            )}
                            {pub.judge && (
                              <div>
                                <span className="text-muted-foreground">Juiz/Relator:</span>{" "}
                                <span className="text-foreground font-medium">{pub.judge}</span>
                              </div>
                            )}
                            {pub.parties && (
                              <div className="col-span-2">
                                <span className="text-muted-foreground">Partes:</span>{" "}
                                <span className="text-foreground">{pub.parties}</span>
                              </div>
                            )}
                          </div>
                          <details className="group">
                            <summary className="cursor-pointer text-sm text-accent hover:underline">
                              Ver texto completo
                            </summary>
                            <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap border-t border-border pt-2">
                              {pub.full_text}
                            </p>
                          </details>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground">Nenhuma notificação.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif, i) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all ${!notif.is_read ? "border-accent/30 bg-accent/5" : ""}`}
                        onClick={() => !notif.is_read && markNotificationRead(notif.id)}
                      >
                        <CardContent className="py-4">
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${notif.is_read ? "bg-muted" : "bg-accent"}`} />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground">{notif.title}</p>
                              <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {format(new Date(notif.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                {notif.email_sent && (
                                  <span className="ml-2 text-accent">· Email enviado</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
