<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · **Polski** · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md)

# REA: Reverse Engineer Anything

### Jeden serwer MCP do inżynierii wstecznej plików binarnych, aplikacji i zachowania w czasie wykonywania.

**Widzisz funkcję, która Ci się podoba? Dowiedz się, jak działa, aż do poziomu kodu binarnego.**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[Strona internetowa](https://rea.tools/) · [Przewodniki](https://rea.tools/guides/) · [Przykłady zastosowań](https://rea.tools/showcase/)**

[Szybki start](#szybki-start) · [Jak działa REA](#jak-działa-rea) · [Co możesz analizować](#co-możesz-analizować) · [Przykłady zastosowań](#przykłady-zastosowań) · [FAQ](#faq) · [Dokumentacja](#dokumentacja)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA uruchamia most analityczny w Hopperze podczas analizy natywnego pliku binarnego" width="1200" />

<br />

<table aria-label="Społeczność REA">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>Dołącz do społeczności inżynierii wstecznej</strong>
  </a><br />
  <sub>Discord · Pytania i odpowiedzi · Pokaż swój projekt</sub>
</td>
</tr>
</table>

<br />

</div>

---

Widzisz w aplikacji funkcję, którą chcesz mieć we własnym produkcie? Poproś swojego agenta, aby zbadał ją za pomocą REA. Może przeanalizować aplikację bez jej kodu źródłowego, wyjaśnić działanie funkcji, pokazać dowody i stworzyć jej wersję dla Twojego projektu.

REA łączy Twojego agenta z narzędziami do analizy natywnych plików binarnych, aplikacji JavaScript i Electron, zestawów .NET oraz stron internetowych. Z tych samych narzędzi możesz korzystać w terminalu. Analiza odbywa się lokalnie, a wyniki zawierają dowody i ograniczenia stojące za każdym wnioskiem.

Konfigurator rejestruje REA w Twoim agencie i instaluje pasujące instrukcje pracy. Analiza kodu natywnego może korzystać z istniejącej instalacji Hoppera lub Ghidry; konfigurator może też zainstalować Hoppera po uzyskaniu zgody. Statyczna analiza JavaScript nie wymaga żadnego z tych silników.

> **[Odwiedź stronę REA](https://rea.tools/)**, aby znaleźć instrukcje konfiguracji, ilustrowane przewodniki i rzeczywiste studia przypadków.

## Szybki start

### Skonfiguruj agenta

Po zainstalowaniu Node.js i npm uruchom:

```bash
npx rea-agents setup
```

Wybierz swoich agentów, sprawdź proponowane zmiany i zatwierdź je. Konfigurator dodaje serwer MCP REA i pasujące instrukcje pracy, tworząc kopie zapasowe istniejącej konfiguracji. Następnie uruchom agenta ponownie.

Konfigurator obsługuje Claude Code, Codex, Cursor, Gemini CLI, Grok Build i [innych agentów](docs/installation.md#supported-agents). Konfigurację dostawców analizy i ręczną rejestrację MCP opisuje przewodnik [instalacji i konfiguracji](docs/installation.md).

### Zapytaj agenta

```text
Sprawdź, jak działa wyszukiwanie w aplikacji Notes, pokaż mi dowody i stwórz podobną funkcję dla mojego projektu.
```

Zastąp Notes wybraną aplikacją i wskaż funkcję, którą chcesz zrozumieć.

### Korzystaj z terminala

Przeanalizuj rozpakowany katalog aplikacji JavaScript/Electron lub archiwum ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

Wynik obejmuje moduły, importy, granice komponentów Electron oraz dowody. Zastąp ścieżkę ścieżką do swojego celu, na przykład `"D:/apps/example"` w systemie Windows.

Aby zainstalować polecenie `rea` do regularnego użytku:

```bash
npm install --global rea-agents
rea --help
```

Przed analizą kodu natywnego skonfiguruj dostawcę analizy. Polecenia analizy natywnej, wybór dostawcy, migawki i użycie w skryptach opisuje [przewodnik CLI i Evidence](docs/cli.md).

### Zaktualizuj REA

REA szybko się rozwija, a nowe wydania często zawierają poprawki błędów. Dbaj o aktualność swojej instalacji.

Dla CLI zainstalowanego przez npm:

```bash
rea update
```

Aby odświeżyć rejestracje agentów i umiejętność, uruchom polecenie konfiguracji wyświetlone po aktualizacji.

Jeśli używasz `npx`, zaktualizuj konfigurację agenta poleceniem:

```bash
npx rea-agents@latest setup
```

Sprawdź zmiany konfiguracji i uruchom agenta ponownie. Do jednorazowych poleceń CLI używaj `npx rea-agents@latest`, a następnie nazwy polecenia.

## Jak działa REA

Twój agent wywołuje REA przez MCP, aby analizować cel i śledzić istotny kod. REA zwraca ustalenia wraz z dowodami. Agent wykorzystuje je do zadawania dalszych pytań, wyjaśniania zachowania lub pisania i testowania implementacji. Polecenia CLI korzystają z tych samych procedur.

![Przebieg badania z REA: agent pyta o lokalny cel, REA analizuje go i śledzi za pomocą narzędzi analitycznych, a agent korzysta ze zwróconego kodu, odwołań i niewiadomych, aby wyjaśnić działanie, stworzyć implementację i ją przetestować.](website/public/assets/figures/rea-investigation-flow.svg)

[Otwórz ilustrację w pełnym rozmiarze](website/public/assets/figures/rea-investigation-flow.svg).

<a id="current-status"></a>

## Co możesz analizować

REA wymaga Node.js 22.x (>=22.19), 24.x (>=24.11) lub 26+ oraz npm. Dodatkowe narzędzia i obsługiwane platformy zależą od celu analizy:

| Cel                                     | Co zwraca REA                                                                                                         | Wymagania i przewodnik                                                                                                                  |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Natywne pliki binarne                   | Pseudokod, kod asemblera, ciągi znaków, symbole, wywołania i odwołania                                                | Hopper, Ghidra lub IDA; [analiza kodu natywnego](https://rea.tools/guides/native/)                                                      |
| Układ pliku ELF w trybie offline        | Sekcje, segmenty, oryginalne symbole/relokacje i potencjalne mechanizmy zabezpieczeń wskazane przez analizę statyczną | pwntools dostarczone przez użytkownika w systemie Linux x64; [diagnostyka plików binarnych](docs/binary-diagnostics.md)                 |
| Kod bajtowy EVM                         | Selektory wywołań, przesunięcia bajtowe, wywnioskowane argumenty i mutowalność                                        | Lokalny plik z surowymi bajtami lub zapisem szesnastkowym; [przewodnik EVM offline](docs/evm-bytecode.md)                               |
| Zarejestrowane awarie systemu Linux     | Surowe rekordy note, rejestry/sygnały każdego zarejestrowanego wątku i opcjonalni kandydaci na mapowania              | pwntools dostarczone przez użytkownika; opcjonalnie GDB/pwndbg; [zarejestrowane awarie](docs/recorded-crashes.md)                       |
| JavaScript / Electron                   | Moduły, importy, mapy źródeł, trasy, IPC i powiązania z natywnymi dodatkami                                           | Node.js i npm; [analiza aplikacji](https://rea.tools/guides/javascript/)                                                                |
| Strony internetowe                      | Struktura strony, skrypty, obserwacje sieciowe i zamówione zrzuty ekranu                                              | Przeglądarka z rodziny Chrome; [analiza w przeglądarce](https://rea.tools/guides/browser/)                                              |
| Zapisane przechwycenia ruchu sieciowego | Żądania, odpowiedzi, dostępne dane przesyłane i lokalizacje źródłowe                                                  | HAR; mitmdump w systemie Linux dla natywnych przechwyceń mitmproxy; [przewodnik przechwytywania](docs/web-network-captures.md)          |
| Zestawy .NET                            | Metadane, instrukcje CIL, zadeklarowane zależności natywne i porównania kompilacji                                    | Analiza statyczna; [przewodnik kodu zarządzanego](docs/managed-code-analysis.md)                                                        |
| Pakiety APK dla Androida                | Deklaracje manifestu, klasy, zdekompilowane metody i odwołania                                                        | JADX bez interfejsu graficznego i pełny JDK w systemie Linux/macOS; [przewodnik Androida](docs/android-analysis.md)                     |
| Oprogramowanie układowe                 | Regiony, wyniki wyodrębniania i przekazanie do analizy kodu natywnego                                                 | Binwalk / Unblob w systemie Linux; [przewodnik oprogramowania układowego](docs/firmware-analysis.md)                                    |
| Pakiety i zasoby                        | Spisy plików, skróty, pliki plist, struktura pakietów Apple i wyodrębnione zasoby                                     | [Przewodnik artefaktów i JavaScript](docs/javascript-artifact-reconstruction.md), [aplikacje Apple](docs/apple-application-analysis.md) |
| Zachowanie procesów                     | Wyjście terminala, interakcje, obserwacje zakończenia i systemu plików oraz porównania uruchomień                     | Linux/macOS z natywnym PTY; [przechwytywanie procesów](docs/process-capture.md)                                                         |

[Odtwarzanie gier Unity](docs/game-reversing.md): lokalna inspekcja metadanych/GUID, scen i potencjalnych atrap C#; dostępna po zbudowaniu tego forka.

Statyczna analiza JavaScript i .NET odczytuje dostarczone pliki bez uruchamiania aplikacji. Przechwytywanie w czasie wykonywania uruchamia wybrany cel lub wchodzi z nim w interakcje z uprawnieniami Twojego użytkownika; skutki opisano w odpowiednich przewodnikach.

<a id="choosing-a-deep-analysis-provider"></a>

Obsługiwane formaty natywne i platformy zależą od dostawcy analizy. Zobacz [konfigurację Hoppera i Ghidry](docs/installation.md#hopper), [przewodnik IDA](docs/ida-provider.md) oraz [eksperymentalną obsługę Ghidry w systemie Windows](docs/windows-ghidra-p0.md). Ghidra obsługuje też [analizę 16-bitowego DOS-a](docs/ghidra-dos.md). Wybór dostawcy opisuje [przewodnik CLI](docs/cli.md#choose-a-provider). Sprawdź [dostępność w wydaniach](docs/installation.md#released-package-and-main) dla funkcji dodanych po najnowszym wydaniu npm.

## Przykłady zastosowań

### DX-Ball: odtworzenie obliczania panoramy dźwięku

Prześledź wywołanie dźwięku do funkcji pomocniczej przeliczającej pozycję na panoramę, sprawdź instrukcje i przekształć niepełny pseudokod w C. Odtworzona implementacja przechodzi 3 205 przypadków dla oryginalnego x86 i odtwarza wszystkie 63 bajty skompilowanej funkcji.

[Przeczytaj studium przypadku](https://rea.tools/showcase/dx-ball/) · [Repozytorium odtworzonej implementacji](https://github.com/N0zoM1z0/dx-ball)

### Notion: śledzenie mostu schowka w Electron

Znajdź API schowka w procesie renderującym, prześledź je przez preload i IPC do procesu głównego, a następnie sprawdź format schowka wraz z danymi formatowania.

[Przeczytaj studium przypadku](https://rea.tools/showcase/notion/)

### TH04: odtworzenie obliczania pierścienia pocisków w DOS-ie

Sprawdź 16-bitowe instrukcje oryginalnej gry na PC-98, odtwórz obliczenia kątów stałych i skierowanych na cel oraz porównaj odtworzony C++ z wynikiem historycznego kompilatora.

[Przeczytaj studium przypadku](https://rea.tools/showcase/th04/) · [Repozytorium odtworzonej implementacji](https://github.com/N0zoM1z0/th04)

Jeśli użyłeś REA do czegoś ciekawego, chętnie to zobaczymy. Opisz swój przypadek w [zgłoszeniu](https://github.com/morluto/rea/issues) lub [pull requeście](https://github.com/morluto/rea/pulls), podając cel analizy, pytanie, sposób, w jaki REA pomogło, i swoje ustalenia.

## FAQ

<details>
<summary><strong>Którzy agenci mogą korzystać z REA?</strong></summary>

Każdy agent obsługujący lokalne serwery MCP. Konfigurator konfiguruje [obsługiwanych agentów](docs/installation.md#supported-agents); inne klienty mogą użyć [ręcznej rejestracji MCP](docs/installation.md#mcp-registry).

</details>

<details>
<summary><strong>Czy potrzebuję Hoppera, Ghidry lub IDA?</strong></summary>

Dogłębna analiza kodu natywnego używa jednego z nich. Statyczna analiza JavaScript i .NET działa bez silnika analizy natywnej. Konfigurator może zainstalować Hoppera po uzyskaniu zgody; Ghidra i IDA korzystają z istniejących instalacji. Zobacz [konfigurację dostawców analizy](docs/installation.md#hopper).

</details>

<details>
<summary><strong>Czy muszę najpierw uruchomić Hoppera?</strong></summary>

REA uruchamia Hoppera, gdy wymaga tego operacja. W systemie macOS przy pierwszym uruchomieniu okno dialogowe może poprosić o wybór trybu demonstracyjnego lub aktywację licencji. Zobacz [uruchamianie Hoppera i rozwiązywanie problemów](docs/installation.md#launcher-paths-and-troubleshooting).

</details>

<details>
<summary><strong>Co daje zainstalowanie umiejętności z skills.sh?</strong></summary>

Umiejętność dostarcza agentowi instrukcje prowadzenia analizy. Użyj `rea setup`, aby zarejestrować serwer MCP REA i zainstalować pasujące instrukcje, a następnie uruchom agenta ponownie. Zobacz [instalację samej umiejętności](docs/installation.md#skill-only-installation).

</details>

<details>
<summary><strong>Jaki kod zwraca REA?</strong></summary>

Analiza kodu natywnego zwraca pseudokod i kod asemblera. Analiza JavaScript/Electron odzyskuje moduły i ich powiązania. Agent wykorzystuje te ustalenia do napisania i przetestowania implementacji; [przykłady zastosowań](#przykłady-zastosowań) pokazują ten proces w praktyce.

</details>

<details>
<summary><strong>Czy REA przesyła moją aplikację?</strong></summary>

REA analizuje cele lokalnie. Twój agent otrzymuje wyniki narzędzi, a dostawca jego modelu ma własną politykę dotyczącą danych.

</details>

<details>
<summary><strong>Co zrobić, gdy napotkam błąd?</strong></summary>

Najpierw zaktualizuj REA; najnowsze wydanie mogło już naprawić ten problem.

Dla CLI zainstalowanego przez npm:

```bash
rea update
```

Dla konfiguracji agenta przez `npx`:

```bash
npx rea-agents@latest setup
```

Jeśli używasz agenta, wykonaj [odświeżenie konfiguracji](#zaktualizuj-rea) i uruchom go ponownie. Ponów tę samą operację. Jeśli problem pozostaje, [otwórz zgłoszenie](https://github.com/morluto/rea/issues), podając wersję REA, typ celu analizy, kroki odtworzenia problemu i komunikaty błędu.

</details>

## Dokumentacja

Zacznij od [przewodników z przykładami](https://rea.tools/guides/) na stronie internetowej. Dokładne opcje, wymagania wstępne i kontrakty wyników opisano tutaj:

- [Instalacja i konfiguracja](docs/installation.md): rejestracja agentów, konfiguracja dostawców analizy, aktualizacje i odinstalowanie.
- [Gotowość i rozwiązywanie problemów](docs/installation.md#check-readiness-for-your-task): diagnostyka jednego agenta lub silnika analizy.
- [CLI i Evidence](docs/cli.md): polecenia, wybór dostawcy, migawki, import/eksport i kody zakończenia.
- [Kontrakty MCP](docs/mcp-contracts.md) i [prompty dla agentów](docs/mcp-prompts.md): wyniki narzędzi, sesje i prowadzone analizy.
- [Katalog narzędzi](docs/mcp-contracts.md#generated-catalog): generowany podczas kompilacji wykaz narzędzi, dostawców i poleceń CLI.
- [Plan rozwoju](docs/roadmap.md): planowane prace i śledzenie funkcjonalności.

Zgłaszaj podatności zgodnie z [SECURITY.md](SECURITY.md).

## Współtworzenie

Chętnie przyjmiemy Twoją pomoc w rozwoju REA! [Otwórz zgłoszenie](https://github.com/morluto/rea/issues), aby poinformować o błędzie lub zaproponować funkcję, albo [wyślij pull request](https://github.com/morluto/rea/pulls) z ulepszeniami kodu lub dokumentacji.

Zobacz [CONTRIBUTING.md](CONTRIBUTING.md), aby poznać konfigurację środowiska programistycznego i kontrole, [testowanie](docs/testing.md), aby poznać ścieżki weryfikacji, oraz [mapę architektury](docs/architecture.mermaid), aby poznać strukturę projektu.

## Linki projektu

[Strona internetowa](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Zgłoszenia](https://github.com/morluto/rea/issues) · [Bezpieczeństwo](SECURITY.md)

## Historia gwiazdek

🎉 **20 000 gwiazdek na GitHubie — dziękujemy!**

Dziękujemy wszystkim, którzy używają REA, zgłaszają błędy, testują kompilacje i przesyłają poprawki.

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="Historia gwiazdek REA na GitHubie" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## Zastrzeżenie

REA dostarcza narzędzia do zgodnych z prawem badań z zakresu inżynierii wstecznej, analizy i odtwarzania. Odpowiadasz za uzyskanie wymaganych zezwoleń i przestrzeganie obowiązującego prawa. Projekt nie popiera działań nielegalnych ani nieautoryzowanych.

## Licencja

[MIT](LICENSE)
