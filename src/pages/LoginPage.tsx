import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, Mail, Lock, User, ArrowRight, Hash } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [oabNumber, setOabNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isForgotPassword) {
        await resetPassword(email);
        toast.success("Email de recuperação enviado! Verifique sua caixa de entrada.");
        setIsForgotPassword(false);
      } else if (isSignUp) {
        await signUp(email, password, name, oabNumber);
        toast.success("Conta criada! Verifique seu email para confirmar.");
      } else {
        await signIn(email, password);
        toast.success("Login realizado com sucesso!");
        navigate("/monitoring");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar solicitação");
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
                {isForgotPassword
                  ? "Recuperar Senha"
                  : isSignUp
                    ? "Criar Conta"
                    : "Bem-vindo de volta"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isForgotPassword
                  ? "Digite seu email para receber o link de recuperação"
                  : isSignUp
                    ? "Crie sua conta para monitorar publicações"
                    : "Entre na sua conta Bonjour Advogado"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && !isForgotPassword && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Dr. João Silva"
                          className="pl-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oab">Número OAB</Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="oab"
                          placeholder="123456/SP"
                          className="pl-10"
                          value={oabNumber}
                          onChange={(e) => setOabNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao@escritorio.com.br"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {!isForgotPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      {!isSignUp && (
                        <button
                          type="button"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-xs text-accent hover:underline"
                        >
                          Esqueceu a senha?
                        </button>
                      )}
                    </div>
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
                )}
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-gold-dark"
                  disabled={loading}
                >
                  {loading
                    ? "Processando..."
                    : isForgotPassword
                      ? "Enviar link de recuperação"
                      : isSignUp
                        ? "Criar conta"
                        : "Entrar"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <div className="mt-4 text-center space-y-2">
                {isForgotPassword ? (
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-sm text-accent hover:underline block w-full"
                  >
                    Voltar para o login
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-accent hover:underline block w-full"
                  >
                    {isSignUp ? "Já tem conta? Entre aqui" : "Não tem conta? Crie uma"}
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
