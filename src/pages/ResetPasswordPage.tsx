import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, Lock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { updatePassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        setLoading(true);
        try {
            await updatePassword(password);
            toast.success("Senha atualizada com sucesso!");
            navigate("/login");
        } catch (error: any) {
            toast.error(error.message || "Erro ao atualizar senha");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex flex-1 items-center justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md px-4"
                >
                    <Card className="border-border">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                                <Scale className="h-7 w-7 text-accent" />
                            </div>
                            <h1 className="font-display text-2xl font-bold text-foreground">
                                Nova Senha
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Digite sua nova senha abaixo
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Nova Senha</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-accent text-accent-foreground hover:bg-gold-dark"
                                    disabled={loading}
                                >
                                    {loading ? "Processando..." : "Atualizar Senha"}{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
