# Jídelníčková stavebnice – Projektový CLAUDE.md

## O projektu

**Jídelníčková stavebnice** je webová aplikace určená primárně pro ženy, které chtějí transformovat své tělo pomocí zdravého stravování. Aplikace využívá AI (Anthropic API) pro generování personalizovaných jídelníčků a receptů.

Aktuální fáze: **MVP – jednoduchá verze pro první klientky.**

## Cílová skupina

Ženy, které chtějí:
- Změnit své stravovací návyky
- Transformovat své tělo
- Mít rychlý přístup k inspiraci pro vaření bez složitého plánování

## Aktuální funkce (MVP)

- Generování jídelníčků pomocí AI (Anthropic API)
- Zobrazení receptů
- Nákupní seznam
- Generování 3 variant jídla podle zvolených surovin
- Generování náhodných jídel – inspirace

## Technologie

- **Frontend:** HTML, CSS, JavaScript (single-page aplikace)
- **AI:** Anthropic API (Claude)
- **Hosting:** Vercel (přes GitHub)
- **Verzování:** Git + GitHub (repo: FilasKunak)

## Bezpečnost – KRITICKÉ

Původní HTML kód obsahuje **viditelný Anthropic API klíč přímo v kódu**. Toto je bezpečnostní riziko – API klíč nesmí být nikdy v kódu na GitHubu ani ve frontendu.

### Řešení: Spouštět API volání ze serveru

- API klíč musí být uložen jako **environment variable na Vercelu** (nikdy v kódu)
- Veškerá komunikace s Anthropic API musí probíhat přes **serverovou funkci** (Vercel Serverless Function)
- Frontend komunikuje pouze se serverovou funkcí, nikoli přímo s Anthropic API
- Soubor `.env` musí být v `.gitignore`

### Při každé změně kódu zkontrolovat:
- Není API klíč viditelný ve frontend kódu?
- Probíhají všechna API volání přes server?
- Je `.env` v `.gitignore`?

## Plánované budoucí funkce

- Přihlašování uživatelů (autentizace)
- Ukládání jídelníčků pro každého uživatele
- Placená verze (subscription model)

## Workflow nasazení

Git (lokální) → GitHub (FilasKunak) → Vercel (automatický deploy)

## Důležité poznámky pro Claude

- Vždy komunikuj česky
- Toto je MVP – drž řešení jednoduchá a funkční, nepřidávej zbytečné komplexity
- Při refaktoringu původního HTML kódu vždy přesuň API volání na server
- Zachovej stávající vizuální styl a UX aplikace
- Před každým commitem ověř, že v kódu nejsou žádné citlivé údaje
