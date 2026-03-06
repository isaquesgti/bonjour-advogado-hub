import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Plus, FileText, Users, Scale, Shield, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Publication = Tables<"publications">;

export default function AdminPanel() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [users, setUsers] = useState<Tables<"profiles">[]>([]);
  const [addPubOpen, setAddPubOpen] = useState(false);
  const [newPub, setNewPub] = useState({
    process_number: "", court: "", class: "", parties: "",
    judge: "", publication_date: "", full_text: "", source: "",
  });

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  async function fetchAdminData() {
    const [pubRes] = await Promise.all([
      supabase.from("publications").select("*").order("publication_date", { ascending: false }),
    ]);
    if (pubRes.data) setPublications(pubRes.data);
  }

  async function addPublication() {
    if (!newPub.process_number || !newPub.court || !newPub.publication_date || !newPub.full_text) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    const { error } = await supabase.from("publications").insert({
      process_number: newPub.process_number,
      court: newPub.court,
      class: newPub.class || null,
      parties: newPub.parties || null,
      judge: newPub.judge || null,
      publication_date: newPub.publication_date,
      full_text: newPub.full_text,
      source: newPub.source || null,
    });
    if (error) {
      toast.error("Erro ao adicionar publicação: " + error.message);
    } else {
      toast.success("Publicação adicionada!");
      setNewPub({ process_number: "", court: "", class: "", parties: "", judge: "", publication_date: "", full_text: "", source: "" });
      setAddPubOpen(false);
      fetchAdminData();
    }
  }

  async function deletePublication(id: string) {
    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir publicação");
    } else {
      toast.success("Publicação excluída");
      fetchAdminData();
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <Shield className="mx-auto h-12 w-12 text-destructive mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Acesso Negado</h2>
              <p className="text-muted-foreground">Você não tem permissão para acessar o painel administrativo.</p>
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Painel Administrativo</h1>
            <p className="text-muted-foreground mt-1">Gerencie publicações, usuários e conteúdo da plataforma.</p>
          </motion.div>

          <Tabs defaultValue="publications" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="publications" className="data-[state=active]:bg-card data-[state=active]:text-accent">
                <FileText className="mr-2 h-4 w-4" /> Publicações
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-card data-[state=active]:text-accent">
                <Users className="mr-2 h-4 w-4" /> Usuários
              </TabsTrigger>
            </TabsList>

            <TabsContent value="publications">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold">Publicações ({publications.length})</h2>
                <Dialog open={addPubOpen} onOpenChange={setAddPubOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-gold-dark">
                      <Plus className="mr-2 h-4 w-4" /> Nova Publicação
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-display">Adicionar Publicação</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nº Processo *</Label>
                          <Input value={newPub.process_number} onChange={(e) => setNewPub({ ...newPub, process_number: e.target.value })} placeholder="0000000-00.0000.0.00.0000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Tribunal *</Label>
                          <Input value={newPub.court} onChange={(e) => setNewPub({ ...newPub, court: e.target.value })} placeholder="TJSP" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Classe</Label>
                          <Input value={newPub.class} onChange={(e) => setNewPub({ ...newPub, class: e.target.value })} placeholder="Apelação Cível" />
                        </div>
                        <div className="space-y-2">
                          <Label>Data Publicação *</Label>
                          <Input type="date" value={newPub.publication_date} onChange={(e) => setNewPub({ ...newPub, publication_date: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Partes</Label>
                        <Input value={newPub.parties} onChange={(e) => setNewPub({ ...newPub, parties: e.target.value })} placeholder="Autor x Réu" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Juiz/Relator</Label>
                          <Input value={newPub.judge} onChange={(e) => setNewPub({ ...newPub, judge: e.target.value })} placeholder="Des. Fulano" />
                        </div>
                        <div className="space-y-2">
                          <Label>Fonte</Label>
                          <Input value={newPub.source} onChange={(e) => setNewPub({ ...newPub, source: e.target.value })} placeholder="DJe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Texto Completo *</Label>
                        <Textarea
                          value={newPub.full_text}
                          onChange={(e) => setNewPub({ ...newPub, full_text: e.target.value })}
                          placeholder="Texto integral da publicação..."
                          rows={6}
                        />
                      </div>
                      <Button onClick={addPublication} className="w-full bg-accent text-accent-foreground hover:bg-gold-dark">
                        Adicionar Publicação
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {publications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground">Nenhuma publicação cadastrada.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {publications.map((pub) => (
                    <Card key={pub.id}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{pub.process_number}</p>
                            <p className="text-sm text-muted-foreground">
                              {pub.court} · {format(new Date(pub.publication_date), "dd/MM/yyyy")}
                              {pub.class && ` · ${pub.class}`}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{pub.full_text}</p>
                          </div>
                          <Button variant="outline" size="icon" className="text-destructive shrink-0" onClick={() => deletePublication(pub.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">Gerenciamento de usuários em desenvolvimento.</p>
                  <p className="text-sm text-muted-foreground mt-1">Use o Cloud para visualizar usuários registrados.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
