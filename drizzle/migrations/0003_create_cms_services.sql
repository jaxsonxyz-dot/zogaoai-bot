CREATE TABLE public.cms_services (
  page_key text PRIMARY KEY,
  hero_title text NOT NULL DEFAULT '',
  hero_description text NOT NULL DEFAULT '',
  showcase_title text NOT NULL DEFAULT '',
  showcase_subtitle text NOT NULL DEFAULT '',
  cards jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_services TO authenticated;
GRANT ALL ON public.cms_services TO service_role;
ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads services" ON public.cms_services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert services" ON public.cms_services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update services" ON public.cms_services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete services" ON public.cms_services FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));