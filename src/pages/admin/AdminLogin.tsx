import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured } from "@/lib/cms";
import {
  resolveAdminAuthMode,
  verifyPreviewEnvCredentials,
} from "@/utils/adminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const LOCAL_ADMIN_SESSION_KEY = "zogago_admin_session";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const nav = useNavigate();

  const supabaseReady = isSupabaseConfigured();
  const previewEmail = import.meta.env.VITE_ADMIN_EMAIL as string | undefined;
  const previewPassword = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
  const authMode = resolveAdminAuthMode({
    supabaseConfigured: supabaseReady,
    previewEmail,
    previewPassword,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busyRef.current || busy) return;

    if (authMode === "unconfigured") {
      toast.error(
        "Admin authentication is not configured for this environment."
      );
      return;
    }

    busyRef.current = true;
    setBusy(true);
    try {
      const cleanEmail = email.trim().toLowerCase();

      if (authMode === "preview-env") {
        if (
          verifyPreviewEnvCredentials(
            cleanEmail,
            password,
            previewEmail,
            previewPassword
          )
        ) {
          sessionStorage.setItem(
            LOCAL_ADMIN_SESSION_KEY,
            JSON.stringify({ email: cleanEmail, loggedInAt: Date.now() })
          );
          toast.success("Signed in to Admin Panel");
          nav("/admin");
          return;
        }
        toast.error("Invalid admin email or password");
        return;
      }

      if (authMode === "supabase") {
        const { supabase } = await import("@/integrations/supabase/client");
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        nav("/admin");
        return;
      }
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zogago-dark p-4">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-white/10 bg-card p-6 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Sign In</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {authMode === "supabase"
              ? "Authenticate with your Zogago administrator account."
              : authMode === "preview-env"
                ? "Sign in with environment-configured preview credentials."
                : "Administrator authentication requires backend setup."}
          </p>
        </div>

        {authMode === "unconfigured" ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-200">
              Admin sign-in is disabled until real authentication is configured.
              Set Supabase credentials (<code>VITE_SUPABASE_URL</code> &amp;{" "}
              <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>) or preview env variables
              (<code>VITE_ADMIN_EMAIL</code> &amp;{" "}
              <code>VITE_ADMIN_PASSWORD</code>) before signing in.
            </div>
            <Link
              to="/"
              className="block w-full rounded-md border border-white/15 py-2 text-center text-sm text-foreground hover:bg-white/5 transition-colors"
            >
              Return to Website
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <Input
              type="email"
              placeholder="Admin email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Please wait…" : "Sign in"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
