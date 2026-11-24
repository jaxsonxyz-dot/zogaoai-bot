import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isSupabaseConfigured } from "@/lib/cms";
import { LOCAL_ADMIN_SESSION_KEY } from "./AdminLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getContactMessages,
  getAllReviews,
  saveReview,
  deleteReview,
  toggleReviewApproval,
  setAllReviewsApproval,
  importGoogleReviewsToVault,
  type Review,
} from "@/lib/storage";
import { toast } from "sonner";

type Layout = "side" | "pair" | "full";
type Section = { title: string; body: string; layout: Layout; images: string[] };
type Project = {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  challenge: string;
  direction: string;
  cover_url: string | null;
  images: string[];
  colors: { name: string; hex: string }[];
  published: boolean;
  sections: Section[];
};

const CATEGORIES = [
  { value: "Logo & Branding", label: "Logo & Branding" },
  { value: "Web Design", label: "Web Design & Development" },
  { value: "Shopify", label: "Shopify & E-commerce" },
  { value: "Architecture", label: "Architecture" },
  { value: "Image Editing", label: "Creative & Image Editing" },
];
const BUCKET = "portfolio-images";
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;
const SECTION_COUNT = 7;
const LAYOUTS: { v: Layout; label: string; slots: number }[] = [
  { v: "side", label: "Text + 1 image side by side", slots: 1 },
  { v: "pair", label: "Text on top + 2 images", slots: 2 },
  { v: "full", label: "Text on top + 1 full-width image", slots: 1 },
];
const slotsFor = (l: Layout) => LAYOUTS.find((x) => x.v === l)!.slots;

const blankSection = (): Section => ({
  title: "",
  body: "",
  layout: "side",
  images: [],
});
const blankForm = () => ({
  slug: "",
  name: "",
  category: CATEGORIES[0].value,
  summary: "",
  challenge: "",
  direction: "",
  colors: "",
});
const blankSections = () => Array.from({ length: SECTION_COUNT }, blankSection);

async function compressImageForLocalFallback(file: File): Promise<string> {
  if (typeof document === "undefined" || !file.type.startsWith("image/")) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const maxDim = 1200;
        const scale = Math.min(1, maxDim / Math.max(img.width || 1, img.height || 1));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error("Canvas context unavailable"));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.78);
        URL.revokeObjectURL(objectUrl);
        resolve(compressed);
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        reject(err instanceof Error ? err : new Error("Failed to compress image"));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image for compression"));
    };
    img.src = objectUrl;
  });
}

async function upload(file: File): Promise<string> {
  if (!isSupabaseConfigured()) {
    return compressImageForLocalFallback(file);
  }
  const path = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 7)}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, TEN_YEARS);
  if (e2 || !data) throw e2;
  return data.signedUrl;
}

const ImageSlot = ({
  label,
  url,
  file,
  onPick,
  onClear,
}: {
  label: string;
  url?: string;
  file?: File | null;
  onPick: (f: File) => void;
  onClear: () => void;
}) => {
  const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!file) {
      setObjectUrl(undefined);
      return;
    }
    const createdUrl = URL.createObjectURL(file);
    setObjectUrl(createdUrl);
    return () => {
      URL.revokeObjectURL(createdUrl);
    };
  }, [file]);

  const preview = objectUrl || url;
  const status = file
    ? url
      ? "Will REPLACE existing"
      : "NEW image"
    : url
    ? "Existing image"
    : "Empty";

  return (
    <div className="rounded-lg border border-border bg-background p-2 space-y-2">
      <div className="flex justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className={file ? "text-primary" : "text-muted-foreground"}>
          {status}
        </span>
      </div>
      <div className="aspect-video rounded bg-muted overflow-hidden flex items-center justify-center text-xs text-muted-foreground">
        {preview ? (
          <img src={preview} alt={label} className="h-full w-full object-cover" />
        ) : (
          "No image"
        )}
      </div>
      <div className="flex gap-2">
        <label className="flex-1">
          <span className="block cursor-pointer rounded-md border border-input px-2 py-1 text-center text-xs hover:bg-accent">
            {url || file ? "Change photo" : "Upload photo"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])}
          />
        </label>
        {(url || file) && (
          <Button type="button" size="sm" variant="ghost" onClick={onClear}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

const blankReviewForm = () => ({
  name: "",
  role: "",
  company: "",
  rating: 5,
  text: "",
  reviewUrl: "",
});

const LOCAL_PROJECTS_KEY = "zogago_cms_projects_local";

const getLocalProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(LOCAL_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalProjects = (list: Project[]) => {
  try {
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(list));
  } catch {
    // Ignore storage quota errors
  }
};

const AdminDashboard = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [state, setState] = useState<"loading" | "denied" | "ok">("loading");
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState(blankReviewForm());
  const [saveAsPublished, setSaveAsPublished] = useState<boolean>(false);
  const [googleSyncInput, setGoogleSyncInput] = useState<string>("");
  const [googleSyncBusy, setGoogleSyncBusy] = useState<boolean>(false);
  const [mode, setMode] = useState<"new" | "edit">("new");
  const [editId, setEditId] = useState<string>("");
  const [form, setForm] = useState(blankForm());
  const [coverUrl, setCoverUrl] = useState<string | undefined>();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [sections, setSections] = useState<Section[]>(blankSections());
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  const load = async () => {
    let remoteProjects: Project[] = [];
    let remoteInq: any[] = [];

    if (isSupabaseConfigured()) {
      const { data } = await supabase
        .from("cms_projects")
        .select("*")
        .order("created_at", { ascending: false });
      remoteProjects = (data as any) || [];

      const { data: inq } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      remoteInq = inq || [];
    }

    const localProjects = getLocalProjects();
    const remoteSlugs = new Set(remoteProjects.map((p) => p.slug));
    setProjects([
      ...remoteProjects,
      ...localProjects.filter((lp) => !remoteSlugs.has(lp.slug)),
    ]);

    // Sync any remote visitor review submissions (source === 'review_submission') into the local Review Vault as Staged (approved: false)
    const remoteReviews = remoteInq.filter(
      (r: any) => r.source === "review_submission"
    );
    if (remoteReviews.length > 0) {
      const existingRevs = getAllReviews();
      const existingSigs = new Set(
        existingRevs.map(
          (r) => `${r.name.toLowerCase()}::${r.text.slice(0, 60).toLowerCase()}`
        )
      );
      for (const rr of remoteReviews) {
        const sig = `${String(rr.name || "").toLowerCase()}::${String(
          rr.message || ""
        )
          .slice(0, 60)
          .toLowerCase()}`;
        if (!existingSigs.has(sig) && rr.name && rr.message) {
          const ratingTag = Array.isArray(rr.services)
            ? rr.services.find((s: string) => s.startsWith("rating:"))
            : undefined;
          const parsedRating = ratingTag
            ? Number(ratingTag.split(":")[1]) || 5
            : 5;
          saveReview({
            name: rr.name,
            initial: String(rr.name).charAt(0).toUpperCase(),
            role: rr.email || "Client Partner",
            company: "",
            text: rr.message,
            rating: parsedRating,
            source: "Website Review Submission",
            approved: false,
          });
          existingSigs.add(sig);
        }
      }
    }

    const localInq = getContactMessages().map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      message: m.message,
      services: m.services || [],
      created_at: new Date(m.timestamp).toISOString(),
    }));

    const seenKeys = new Set(
      remoteInq.map((r: any) => `${r.email}::${r.message}`)
    );
    const mergedInquiries = [
      ...remoteInq,
      ...localInq.filter((l) => !seenKeys.has(`${l.email}::${l.message}`)),
    ];

    setInquiries(mergedInquiries);
    setReviews(getAllReviews());
    queryClient.invalidateQueries({ queryKey: ["cms_projects_public"] });
  };

  useEffect(() => {
    (async () => {
      const localSession = sessionStorage.getItem(LOCAL_ADMIN_SESSION_KEY);
      if (localSession) {
        setState("ok");
        load();
        return;
      }

      if (!isSupabaseConfigured()) {
        return nav("/admin/login");
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return nav("/admin/login");
      const { data } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (!data) return setState("denied");
      setState("ok");
      load();
    })();
  }, [nav]);

  const reset = () => {
    setForm(blankForm());
    setCoverUrl(undefined);
    setCoverFile(null);
    setSections(blankSections());
    setFiles({});
    setEditId("");
  };

  const startEdit = (id: string) => {
    const p = projects.find((x) => x.id === id);
    setFiles({});
    setCoverFile(null);
    setEditId(id);
    if (!p) return reset();
    setMode("edit");
    setForm({
      slug: p.slug,
      name: p.name,
      category: p.category,
      summary: p.summary || "",
      challenge: p.challenge || "",
      direction: p.direction || "",
      colors: (p.colors || []).map((c) => `${c.name}:${c.hex}`).join(", "),
    });
    setCoverUrl(p.cover_url || undefined);
    const s = Array.isArray(p.sections) ? p.sections : [];
    setSections(
      Array.from({ length: SECTION_COUNT }, (_, i) => ({
        ...blankSection(),
        ...(s[i] || {}),
      }))
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updSection = (i: number, patch: Partial<Section>) =>
    setSections((prev) =>
      prev.map((s, j) => (j === i ? { ...s, ...patch } : s))
    );

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busyRef.current || busy) return;
    if (mode === "edit" && !editId)
      return toast.error("Pick a project to edit first");
    const rawSlug = (form.slug || form.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (!rawSlug) return toast.error("Project name or slug is required");
    const duplicate = projects.find(
      (p) => p.slug === rawSlug && p.id !== editId
    );
    if (duplicate) {
      return toast.error(
        `Slug "${rawSlug}" is already used by "${duplicate.name}". Please enter a unique slug.`
      );
    }

    busyRef.current = true;
    setBusy(true);
    try {
      const cover_url = coverFile ? await upload(coverFile) : coverUrl || null;
      const finalSections: Section[] = [];
      for (let i = 0; i < SECTION_COUNT; i++) {
        const s = sections[i];
        const imgs: string[] = [];
        for (let k = 0; k < slotsFor(s.layout); k++) {
          const f = files[`${i}-${k}`];
          const u = f ? await upload(f) : s.images[k];
          if (u) imgs.push(u);
        }
        if (s.title || s.body || imgs.length)
          finalSections.push({ ...s, images: imgs });
      }
      const colors = form.colors
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
        .map((c) => {
          const [name, hex] = c.split(":").map((x) => x.trim());
          return { name, hex: hex || name };
        });
      const payload = {
        slug: rawSlug,
        name: form.name,
        category: form.category,
        summary: form.summary,
        challenge: form.challenge,
        direction: form.direction,
        colors,
        cover_url,
        sections: finalSections as any,
        images: finalSections.flatMap((s) => s.images),
      };
      if (isSupabaseConfigured()) {
        const { error } =
          mode === "edit"
            ? await supabase.from("cms_projects").update(payload).eq("id", editId)
            : await supabase.from("cms_projects").insert(payload);
        if (error) throw error;
      } else {
        const current = getLocalProjects();
        if (mode === "edit") {
          saveLocalProjects(
            current.map((item) =>
              item.id === editId ? { ...item, ...(payload as any) } : item
            )
          );
        } else {
          const newProj: Project = {
            id: `local-${Date.now()}`,
            published: true,
            ...(payload as any),
          };
          saveLocalProjects([newProj, ...current]);
        }
      }
      toast.success(mode === "edit" ? "Changes saved" : "New project added");
      reset();
      setMode("new");
      await load();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  const togglePublish = async (p: Project) => {
    if (busyRef.current) return;
    busyRef.current = true;
    try {
      if (isSupabaseConfigured() && !String(p.id).startsWith("local-")) {
        const { error } = await supabase
          .from("cms_projects")
          .update({ published: !p.published })
          .eq("id", p.id);
        if (error) return toast.error(error.message);
      } else {
        const current = getLocalProjects();
        saveLocalProjects(
          current.map((item) =>
            item.id === p.id ? { ...item, published: !p.published } : item
          )
        );
      }
      toast.success(
        p.published
          ? `"${p.name}" unpublished (Draft)`
          : `"${p.name}" published live`
      );
      await load();
    } finally {
      busyRef.current = false;
    }
  };

  const remove = async (p: Project) => {
    if (busyRef.current) return;
    if (!confirm(`Delete "${p.name}"?`)) return;
    busyRef.current = true;
    try {
      if (isSupabaseConfigured() && !String(p.id).startsWith("local-")) {
        await supabase.from("cms_projects").delete().eq("id", p.id);
      } else {
        saveLocalProjects(getLocalProjects().filter((item) => item.id !== p.id));
      }
      if (editId === p.id) {
        reset();
        setMode("new");
      }
      await load();
    } finally {
      busyRef.current = false;
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) {
      return toast.error("Client name and review text are required");
    }
    saveReview({
      name: reviewForm.name.trim(),
      initial: reviewForm.name.trim().charAt(0).toUpperCase(),
      role: reviewForm.role.trim() || "Client",
      company: reviewForm.company.trim(),
      text: reviewForm.text.trim(),
      rating: Number(reviewForm.rating) || 5,
      source: "Google Reviews",
      reviewUrl: reviewForm.reviewUrl.trim() || undefined,
      approved: saveAsPublished,
    });
    setReviewForm(blankReviewForm());
    setReviews(getAllReviews());
    toast.success(
      saveAsPublished
        ? "Review published live on the site"
        : "Review saved privately in Vault (Unpublished)"
    );
  };

  const handleToggleReviewApproval = (id: string) => {
    const updated = toggleReviewApproval(id);
    setReviews(updated);
    const target = updated.find((r) => r.id === id);
    toast.success(
      target?.approved
        ? `Published "${target.name}" live`
        : `Moved "${target?.name || "review"}" back to private Vault`
    );
  };

  const handleBatchPublishReviews = (approveAll: boolean) => {
    const updated = setAllReviewsApproval(approveAll);
    setReviews(updated);
    toast.success(
      approveAll
        ? `Published all ${updated.length} reviews live on the website!`
        : `Moved all ${updated.length} reviews to the private Vault (Hidden from public)`
    );
  };

  const handleGoogleReviewsSync = async () => {
    const input = googleSyncInput.trim();
    if (!input) {
      return toast.error(
        "Paste a Google Reviews API URL (e.g. Featurable / Places proxy) or Google Reviews JSON first"
      );
    }
    setGoogleSyncBusy(true);
    try {
      let payload: unknown;
      if (input.startsWith("http://") || input.startsWith("https://")) {
        const res = await fetch(input);
        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }
        payload = await res.json();
      } else {
        payload = JSON.parse(input);
      }

      const { importedCount, totalReviews } = importGoogleReviewsToVault(payload);
      setReviews(totalReviews);
      setGoogleSyncInput("");
      if (importedCount > 0) {
        toast.success(
          `Saved ${importedCount} Google review(s) to your private Vault (Unpublished). Approve or Batch-Publish whenever you are ready!`
        );
      } else {
        toast.info(
          "No new unique reviews found in that payload (or they are already in your Vault)."
        );
      }
    } catch (err: any) {
      toast.error(
        err?.message ||
          "Could not parse Google Reviews payload. Paste a valid JSON array/object or API URL."
      );
    } finally {
      setGoogleSyncBusy(false);
    }
  };

  const handleDeleteReview = (id: string) => {
    deleteReview(id);
    setReviews(getAllReviews());
    toast.success("Review removed");
  };

  const logout = async () => {
    sessionStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    nav("/admin/login");
  };

  if (state === "loading")
    return (
      <div className="min-h-screen bg-background p-8 text-muted-foreground">
        Loading…
      </div>
    );
  if (state === "denied")
    return (
      <div className="min-h-screen bg-background p-8 text-foreground space-y-4">
        <p>This account is not an admin.</p>
        <Button onClick={logout}>Sign out</Button>
      </div>
    );

  const set = (k: keyof ReturnType<typeof blankForm>) => (e: any) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button variant="outline" onClick={logout}>
            Sign out
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Button
            variant={mode === "new" ? "default" : "outline"}
            onClick={() => {
              reset();
              setMode("new");
            }}
          >
            + Add New
          </Button>
          <Button
            variant={mode === "edit" ? "default" : "outline"}
            onClick={() => {
              reset();
              setMode("edit");
            }}
          >
            Edit Existing
          </Button>
          {mode === "edit" && (
            <select
              className="h-10 flex-1 min-w-[200px] rounded-md border border-input bg-background px-3"
              value={editId}
              onChange={(e) => startEdit(e.target.value)}
            >
              <option value="">— Choose a project to edit —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <form
          onSubmit={save}
          className="space-y-6 rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {mode === "edit"
                ? editId
                  ? `Editing: ${form.name}`
                  : "Choose a project above"
                : "New case study"}
            </h2>
            <span
              className={`rounded-full px-3 py-1 text-xs ${
                mode === "edit"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {mode === "edit" ? "EDIT MODE" : "ADD NEW MODE"}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Main details &amp; cover</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Project name"
                value={form.name}
                onChange={set("name")}
                required
              />
              <Input
                placeholder="URL slug (optional, e.g. logo-project-01)"
                value={form.slug}
                onChange={set("slug")}
              />
              <select
                className="h-10 rounded-md border border-input bg-background px-3"
                value={form.category}
                onChange={set("category")}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              placeholder="Short subtitle / summary under the title"
              value={form.summary}
              onChange={set("summary")}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Textarea
                placeholder="The Challenge (optional overview section)"
                value={form.challenge}
                onChange={set("challenge")}
              />
              <Textarea
                placeholder="Creative Direction (optional overview section)"
                value={form.direction}
                onChange={set("direction")}
              />
            </div>
            <Input
              placeholder="Colors, e.g. Neon Purple:#D633FF, Black:#0B0B0B"
              value={form.colors}
              onChange={set("colors")}
            />
            <div className="max-w-sm">
              <ImageSlot
                label="Cover image"
                url={coverUrl}
                file={coverFile}
                onPick={setCoverFile}
                onClear={() => {
                  setCoverFile(null);
                  setCoverUrl(undefined);
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">
              Chapters (up to 7 — leave empty ones blank)
            </h3>
            {sections.map((s, i) => (
              <div
                key={i}
                className="space-y-3 rounded-lg border border-border p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-primary">
                    {String(i + 1).padStart(2, "0")} — Chapter
                  </span>
                  <select
                    className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                    value={s.layout}
                    onChange={(e) =>
                      updSection(i, { layout: e.target.value as Layout })
                    }
                  >
                    {LAYOUTS.map((l) => (
                      <option key={l.v} value={l.v}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  placeholder="Chapter title (e.g. The Crest)"
                  value={s.title}
                  onChange={(e) => updSection(i, { title: e.target.value })}
                />
                <Textarea
                  placeholder="Chapter description"
                  value={s.body}
                  onChange={(e) => updSection(i, { body: e.target.value })}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: slotsFor(s.layout) }, (_, k) => (
                    <ImageSlot
                      key={k}
                      label={`Image ${k + 1}`}
                      url={s.images[k]}
                      file={files[`${i}-${k}`]}
                      onPick={(f) => setFiles({ ...files, [`${i}-${k}`]: f })}
                      onClear={() => {
                        setFiles({ ...files, [`${i}-${k}`]: null });
                        const imgs = [...s.images];
                        imgs[k] = "";
                        updSection(i, { images: imgs });
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            disabled={busy || (mode === "edit" && !editId)}
          >
            {busy
              ? "Uploading…"
              : mode === "edit"
              ? "Save changes"
              : "Add project"}
          </Button>
        </form>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            Your projects ({projects.length})
          </h2>
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-3"
            >
              {p.cover_url && (
                <img
                  src={p.cover_url}
                  alt={p.name}
                  className="h-14 w-20 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-muted-foreground">
                  {p.category} · {(p.sections || []).length} chapters ·{" "}
                  {p.published ? "Live" : "Hidden"}
                </div>
              </div>
              <Button size="sm" onClick={() => startEdit(p.id)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => togglePublish(p)}
              >
                {p.published ? "Hide" : "Publish"}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => remove(p)}>
                Delete
              </Button>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Client Reviews Vault &amp; Batch Publisher ({reviews.length} Total)
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Staged in Private Vault:{" "}
                <strong>{reviews.filter((r) => !r.approved).length}</strong> ·
                Published Live on Website:{" "}
                <strong>{reviews.filter((r) => r.approved).length}</strong> ·
                Batch Goal: Gather 10–15 reviews in Vault, then publish all at once.
              </p>
            </div>

            {reviews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleBatchPublishReviews(true)}
                >
                  Publish All ({reviews.length}) Live
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleBatchPublishReviews(false)}
                >
                  Move All to Private Vault (Hide)
                </Button>
              </div>
            )}
          </div>

          {/* Google Reviews API / JSON Auto-Save to Vault */}
          <div className="space-y-2.5 rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium">
              Sync Google Reviews via API URL or JSON (Saves to Private Vault — Does Not Publish Automatically)
            </div>
            <p className="text-xs text-muted-foreground">
              Paste a Google Places API / Featurable widget JSON URL (e.g.{" "}
              <code>https://featurable.com/api/v1/widgets/YOUR_WIDGET_ID</code>)
              or paste a Google Reviews JSON export below. All imported reviews are saved as{" "}
              <strong>Hidden Vault Drafts</strong> until you click Publish.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Textarea
                rows={2}
                className="flex-1 text-xs font-mono"
                placeholder='Paste API URL (https://...) or Google Reviews JSON: [{"author_name":"Jane Doe","rating":5,"text":"Amazing work!"}]'
                value={googleSyncInput}
                onChange={(e) => setGoogleSyncInput(e.target.value)}
              />
              <Button
                type="button"
                size="sm"
                disabled={googleSyncBusy}
                onClick={handleGoogleReviewsSync}
                className="shrink-0 self-start"
              >
                {googleSyncBusy ? "Syncing…" : "Save to Vault (Unpublished)"}
              </Button>
            </div>
          </div>

          {/* Manual Review Entry Form */}
          <form
            onSubmit={handleAddReview}
            className="space-y-3 rounded-xl border border-border bg-card p-4"
          >
            <div className="text-sm font-medium">
              Add a Client or Google Review Manually
            </div>
            <div className="grid sm:grid-cols-4 gap-3">
              <Input
                placeholder="Client name"
                value={reviewForm.name}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, name: e.target.value })
                }
                required
              />
              <Input
                placeholder="Role (e.g. Founder)"
                value={reviewForm.role}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, role: e.target.value })
                }
              />
              <Input
                placeholder="Company (optional)"
                value={reviewForm.company}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, company: e.target.value })
                }
              />
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    rating: Number(e.target.value),
                  })
                }
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>
            <Textarea
              placeholder="Client review text..."
              value={reviewForm.text}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, text: e.target.value })
              }
              required
            />
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <Input
                className="flex-1 min-w-[220px]"
                placeholder="Google Review link (optional)"
                value={reviewForm.reviewUrl}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, reviewUrl: e.target.value })
                }
              />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveAsPublished}
                    onChange={(e) => setSaveAsPublished(e.target.checked)}
                  />
                  <span>Publish immediately (unchecked = Save in Vault)</span>
                </label>
                <Button type="submit" size="sm">
                  {saveAsPublished ? "Publish Live" : "Save to Vault"}
                </Button>
              </div>
            </div>
          </form>

          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-border bg-card p-3 text-sm"
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2 font-medium">
                  <span>{rev.name}</span>
                  <span className="text-muted-foreground font-normal">
                    · {rev.role}
                    {rev.company ? `, ${rev.company}` : ""} · {rev.rating}★
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[11px] font-mono uppercase ${
                      rev.approved
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {rev.approved ? "Published Live" : "Staged in Vault (Hidden)"}
                  </span>
                </div>
                <p className="text-muted-foreground">{rev.text}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleReviewApproval(rev.id)}
                >
                  {rev.approved ? "Move to Vault (Hide)" : "Publish Live"}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteReview(rev.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            Contact messages ({inquiries.length})
          </h2>
          {inquiries.map((q) => (
            <div
              key={q.id}
              className="rounded-lg border border-border bg-card p-3 text-sm space-y-1.5"
            >
              <div className="font-medium">
                {q.name} ·{" "}
                <a className="underline" href={`mailto:${q.email}`}>
                  {q.email}
                </a>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(q.created_at).toLocaleString()}
              </div>
              {Array.isArray(q.services) && q.services.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {q.services.map((svc: string) => (
                    <span
                      key={svc}
                      className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-1 whitespace-pre-wrap">{q.message}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
