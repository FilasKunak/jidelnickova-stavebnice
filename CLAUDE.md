# Jídelníčková stavebnice CoreRestart — dokumentace projektu

## Co aplikace dělá
AI webová aplikace pro generování jídel podle metody Pravidlo ruky (porcování bez vážení).
Cílová skupina: ženy 25–60 let.

## Technický stack
- Frontend: čistý HTML/CSS/JS (index.html)
- Backend: Vercel serverless funkce (api/)
- Databáze: Supabase (PostgreSQL)
- AI: Anthropic API
- Hosting: Vercel
- Repozitář: github.com/FilasKunak/jidelnickova-stavebnice

## Struktura souborů
- index.html — celá frontendová aplikace
- api/generate.js — proxy pro Anthropic API (generování jídel)
- api/track.js — ukládání statistik do Supabase
- api/stats.js — čtení statistik ze Supabase
- vercel.json — konfigurace Vercelu

## Environment proměnné (nastaveny na Vercelu)
- ANTHROPIC_API_KEY — klíč pro Anthropic API
- SUPABASE_URL — https://aizwejxgedkbyvghsmwj.supabase.co
- SUPABASE_SERVICE_KEY — service role klíč pro Supabase

## Supabase databáze
Tabulka usage_stats:
- id (BIGSERIAL PRIMARY KEY)
- created_at (TIMESTAMP WITH TIME ZONE)
- meal_type (TEXT) — snidane/obed/svacina/vecere
- mode (TEXT) — konkretni/nahodny
- user_id (TEXT) — náhodné ID uložené v localStorage

## Správný model Anthropic API
Používej: claude-haiku-4-5-20251001
POZOR: claude-sonnet-4-20250514 a claude-sonnet-4-5-20251001 jsou neplatná ID!

## Důležité technické poznámky
1. vercel.json maxDuration musí být 60 — Anthropic API potřebuje více než 10s na odpověď
2. Pokud vercel.json a api/*.js mají různý maxDuration, vercel.json má PŘEDNOST
3. Funkce api/generate.js volá Anthropic API se system promptem a user message
4. index.html volá /api/generate (ne přímo Anthropic API) — API klíč je bezpečně na serveru

## Tajná kombinace pro statistiky
Stravovací styl: Bez lepku + Typ jídla: Snídaně + Surovina: pouze Hovězí + klik Sestavit jídlo
→ Zobrazí statistiky použití místo receptů

## Metoda Pravidlo ruky
- DLAŇ = bílkoviny (1 dlaň = 1 porce)
- PĚST = sacharidy (1 pěst = 1 porce)
- HRST = zelenina/ovoce (2 hrsti = 1 porce)
- PALEC = tuky (1 palec = 1 porce)

## Historie oprav
### 2026-03-20
- Opraveno: model ID claude-sonnet-4-20250514 → claude-haiku-4-5-20251001 (neplatné ID)
- Opraveno: vercel.json maxDuration 10s → 60s (timeout způsoboval JSON parse chybu)
- Přidáno: statistiky použití přes Supabase
- Přidáno: tajná kombinace pro zobrazení statistik
- Přidáno: propojení GitHub → Vercel pro automatický deployment
