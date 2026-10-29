<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · **Українська** · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md)

# REA: Реверс-інжиніринг будь-чого

### Один MCP для реверс-інжинірингу бінарних файлів, застосунків і поведінки під час виконання.

**Побачили цікаву функцію? Зрозумійте, як вона працює, аж до рівня двійкового коду.**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[Сайт](https://rea.tools/) · [Посібники](https://rea.tools/guides/) · [Приклади](https://rea.tools/showcase/)**

[Швидкий старт](#швидкий-старт) · [Як працює REA](#як-працює-rea) · [Що можна аналізувати](#що-можна-аналізувати) · [Приклади](#приклади) · [Поширені запитання](#поширені-запитання) · [Документація](#документація)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA запускає міст аналізу всередині Hopper під час дослідження нативного бінарного файла" width="1200" />

<br />

<table aria-label="Спільнота REA">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>Приєднуйтеся до спільноти реверс-інжинірингу</strong>
  </a><br />
  <sub>Discord · Запитання й відповіді · Обмін результатами</sub>
</td>
</tr>
</table>

<br />

</div>

---

Побачили в застосунку функцію, яку хочете додати до свого продукту? Попросіть агента дослідити її за допомогою REA. Він може перевірити застосунок без вихідного коду, пояснити роботу функції, показати підтвердження та створити реалізацію для вашого проєкту.

REA підключає вашого агента до інструментів дослідження нативних бінарних файлів, застосунків JavaScript і Electron, збірок .NET та сайтів. Ті самі інструменти можна використовувати з термінала. Аналіз виконується локально, а результати містять підтвердження й обмеження, на яких ґрунтується кожен висновок.

Налаштування реєструє REA у вашому агенті та встановлює відповідні інструкції робочих процесів. Для нативного аналізу можна використати вже встановлений Hopper або Ghidra; налаштування також може встановити Hopper за вашою згодою. Статичному аналізу JavaScript не потрібен жоден із цих рушіїв.

> **[Відвідайте сайт REA](https://rea.tools/)**, щоб знайти інструкції налаштування, ілюстровані посібники та реальні дослідження.

## Швидкий старт

### Налаштуйте агента

Якщо Node.js і npm встановлено, виконайте:

```bash
npx rea-agents setup
```

Виберіть агентів, перевірте запропоновані зміни та схваліть їх. Налаштування додає MCP-сервер REA та відповідні інструкції робочих процесів, створюючи резервні копії наявної конфігурації. Після цього перезапустіть агента.

Налаштування підтримує Claude Code, Codex, Cursor, Gemini CLI, Grok Build та [інших агентів](docs/installation.md#supported-agents). Конфігурацію провайдерів і ручну реєстрацію MCP описано в розділі [встановлення й налаштування](docs/installation.md).

### Запитайте агента

```text
Досліди, як працює пошук у застосунку Notes, покажи підтвердження й створи подібну функцію для мого проєкту.
```

Замініть Notes цільовим застосунком і вкажіть функцію, яку хочете зрозуміти.

### Використовуйте термінал

Перевірте розпакований каталог застосунку JavaScript/Electron або файл ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

Результат містить модулі, імпорти, межі Electron і підтвердження для них. Замініть шлях своїм, наприклад `"D:/apps/example"` у Windows.

Для регулярного використання встановіть команду `rea`:

```bash
npm install --global rea-agents
rea --help
```

Для нативного аналізу спочатку налаштуйте провайдера. Нативні команди, вибір провайдера, знімки та використання у скриптах описує [посібник CLI та Evidence](docs/cli.md).

### Оновіть REA

REA швидко розвивається, а нові випуски часто містять виправлення помилок. Підтримуйте встановлену версію актуальною.

Для CLI, встановленого через npm:

```bash
rea update
```

Щоб оновити реєстрації агентів і skill, виконайте команду налаштування, яку виведе оновлення.

Якщо використовуєте `npx`, оновіть налаштування агента командою:

```bash
npx rea-agents@latest setup
```

Перевірте зміни налаштувань і перезапустіть агента. Для разових команд CLI використовуйте `npx rea-agents@latest`, а потім потрібну команду.

## Як працює REA

Агент викликає REA через MCP, щоб перевірити ціль і простежити пов'язаний код. REA повертає знахідки разом із підтвердженнями. Агент використовує їх для уточнювальних запитань, пояснення поведінки або написання й тестування реалізації. Команди CLI використовують ті самі робочі процеси.

![Процес дослідження з REA: агент запитує про локальну ціль, REA перевіряє й простежує її інструментами аналізу, а агент використовує повернений код, посилання та невідомі дані для пояснення, реалізації й тестування.](website/public/assets/figures/rea-investigation-flow.svg)

[Відкрити зображення в повному розмірі](website/public/assets/figures/rea-investigation-flow.svg).

<a id="current-status"></a>

## Що можна аналізувати

REA потребує Node.js 22.x (>=22.19), 24.x (>=24.11) або 26+, а також npm. Додаткові інструменти й підтримувані системи залежать від цілі:

| Ціль                                 | Що повертає REA                                                                                                   | Вимоги й посібник                                                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Нативні бінарні файли                | Псевдокод, асемблерний код, рядки, символи, виклики й посилання                                                   | Hopper, Ghidra або IDA; [нативний аналіз](https://rea.tools/guides/native/)                                                            |
| Структура ELF без запуску            | Секції, сегменти, початкові символи/релокації та можливі захисні механізми за даними статичного аналізу           | pwntools, наданий стороною, що викликає інструмент, у Linux x64; [діагностика бінарних файлів](docs/binary-diagnostics.md)             |
| Байт-код EVM                         | Селектори диспетчеризації, зміщення байтів, виведені припущення про аргументи та змінюваність стану               | Локальні необроблені байти або шістнадцяткове представлення; [посібник EVM без запуску](docs/evm-bytecode.md)                          |
| Записані аварійні завершення в Linux | Необроблені записи note, регістри/сигнали кожного записаного потоку й необов'язкові кандидати зіставлення пам'яті | pwntools, наданий стороною, що викликає інструмент; необов'язкові GDB/pwndbg; [записані аварійні завершення](docs/recorded-crashes.md) |
| JavaScript / Electron                | Модулі, імпорти, карти вихідного коду, маршрути, IPC і зв'язки з нативними доповненнями                           | Node.js і npm; [аналіз застосунків](https://rea.tools/guides/javascript/)                                                              |
| Сайти                                | Структура сторінки, скрипти, мережеві спостереження й запитані знімки екрана                                      | Браузер сімейства Chrome; [аналіз браузера](https://rea.tools/guides/browser/)                                                         |
| Збережені мережеві захоплення        | Запити, відповіді, доступні корисні дані та місця в джерелі                                                       | HAR; mitmdump у Linux для захоплень у власному форматі mitmproxy; [посібник мережевих захоплень](docs/web-network-captures.md)         |
| Збірки .NET                          | Метадані, інструкції CIL, оголошені нативні залежності й порівняння збірок                                        | Статична перевірка; [посібник керованого коду](docs/managed-code-analysis.md)                                                          |
| Android APK                          | Оголошення маніфесту, класи, декомпільовані методи й посилання                                                    | JADX без графічного інтерфейсу й повний JDK у Linux/macOS; [посібник Android](docs/android-analysis.md)                                |
| Прошивки                             | Області, результати видобування й передавання до нативного аналізу                                                | Binwalk / Unblob у Linux; [посібник прошивок](docs/firmware-analysis.md)                                                               |
| Пакети й ресурси                     | Переліки файлів, хеші, plist, структура пакетів Apple та видобуті ресурси                                         | [Посібник артефактів і JavaScript](docs/javascript-artifact-reconstruction.md), [застосунки Apple](docs/apple-application-analysis.md) |
| Поведінка процесів                   | Вивід термінала, взаємодії, спостереження за завершенням і файловою системою та порівняння запусків               | Linux/macOS із нативним PTY; [захоплення процесів](docs/process-capture.md)                                                            |

[Відновлення ігор Unity](docs/game-reversing.md): локальна перевірка метаданих/GUID, сцен і можливих заглушок C#; доступна після збирання цього форку.

Статична перевірка JavaScript і .NET читає надані файли, не запускаючи застосунок. Захоплення під час виконання запускає вибрану ціль або взаємодіє з нею з правами вашого користувача; відповідні посібники описують його вплив.

<a id="choosing-a-deep-analysis-provider"></a>

Нативні формати й підтримка систем відрізняються залежно від провайдера. Дивіться [налаштування Hopper і Ghidra](docs/installation.md#hopper), [посібник IDA](docs/ida-provider.md) та [експериментальну підтримку Ghidra у Windows](docs/windows-ghidra-p0.md). Ghidra також підтримує [аналіз 16-бітного DOS](docs/ghidra-dos.md). Для вибору провайдера дивіться [посібник CLI](docs/cli.md#choose-a-provider). Для функцій, доданих після найновішої версії в npm, перевірте [доступність у випусках](docs/installation.md#released-package-and-main).

## Приклади

### DX-Ball: відновлення розрахунку звукової панорами

Простежте звуковий виклик до допоміжної функції, що перетворює координату на панорамування, перевірте інструкції та перетворіть неповний псевдокод на C. Відновлена реалізація проходить 3 205 тестів з оригінальним x86-кодом і відтворює всі 63 байти скомпільованої функції.

[Прочитати дослідження](https://rea.tools/showcase/dx-ball/) · [Репозиторій реконструкції](https://github.com/N0zoM1z0/dx-ball)

### Notion: відстеження мосту буфера обміну Electron

Знайдіть API буфера обміну в процесі рендерингу, простежте його через preload та IPC до головного процесу й перевірте формат буфера обміну з даними форматування.

[Прочитати дослідження](https://rea.tools/showcase/notion/)

### TH04: відновлення розрахунку кільця куль у DOS

Перевірте 16-бітні інструкції оригінальної гри для PC-98, відновіть розрахунки фіксованих і прицільних кутів та порівняйте відновлений C++ із виводом тогочасного компілятора.

[Прочитати дослідження](https://rea.tools/showcase/th04/) · [Репозиторій реконструкції](https://github.com/N0zoM1z0/th04)

Якщо ви дослідили з REA щось цікаве, поділіться результатом. Створіть [issue](https://github.com/morluto/rea/issues) або [pull request](https://github.com/morluto/rea/pulls) і вкажіть ціль, ваше запитання, як допоміг REA та що ви з'ясували.

## Поширені запитання

<details>
<summary><strong>Які агенти можуть використовувати REA?</strong></summary>

Будь-який агент, що підтримує локальні MCP-сервери. Налаштування конфігурує [підтримуваних агентів](docs/installation.md#supported-agents); інші клієнти можуть використати [ручну реєстрацію MCP](docs/installation.md#mcp-registry).

</details>

<details>
<summary><strong>Чи потрібні мені Hopper, Ghidra або IDA?</strong></summary>

Поглиблений нативний аналіз використовує один із цих інструментів. Статична перевірка JavaScript і .NET працює без рушія нативного аналізу. Налаштування може встановити Hopper після схвалення; Ghidra й IDA використовують наявні встановлення. Дивіться [налаштування провайдерів](docs/installation.md#hopper).

</details>

<details>
<summary><strong>Чи потрібно спочатку запускати Hopper?</strong></summary>

REA запускає Hopper, коли він потрібен для операції. У macOS під час першого запуску може з'явитися діалог вибору деморежиму або активації ліцензії. Дивіться [запуск Hopper та усунення неполадок](docs/installation.md#launcher-paths-and-troubleshooting).

</details>

<details>
<summary><strong>Що дає встановлення skill із skills.sh?</strong></summary>

Skill надає агенту інструкції дослідження. Використовуйте `rea setup`, щоб зареєструвати MCP-сервер REA та встановити відповідні інструкції, а потім перезапустіть агента. Дивіться [встановлення лише skill](docs/installation.md#skill-only-installation).

</details>

<details>
<summary><strong>Який код повертає REA?</strong></summary>

Нативний аналіз повертає псевдокод і асемблерний код. Аналіз JavaScript/Electron відновлює модулі та їхні зв'язки. Агент використовує ці результати, щоб написати й протестувати реалізацію; [приклади](#приклади) містять практичні дослідження.

</details>

<details>
<summary><strong>Чи завантажує REA мій застосунок на сервер?</strong></summary>

REA аналізує цілі локально. Ваш агент отримує результати інструментів, а постачальник його моделі має власну політику даних.

</details>

<details>
<summary><strong>Що робити, якщо я зіткнувся з помилкою?</strong></summary>

Спочатку оновіться: нещодавній випуск уже міг виправити помилку.

Для CLI, встановленого через npm:

```bash
rea update
```

Для налаштування агента через `npx`:

```bash
npx rea-agents@latest setup
```

Якщо використовуєте агента, завершіть [оновлення налаштувань](#оновіть-rea) і перезапустіть його. Повторіть те саме завдання. Якщо проблема залишається, [відкрийте issue](https://github.com/morluto/rea/issues) із версією REA, типом цілі, кроками відтворення та виводом помилки.

</details>

## Документація

Почніть із [практичних посібників](https://rea.tools/guides/) на сайті. Точні параметри, передумови й контракти результатів описано тут:

- [Встановлення й налаштування](docs/installation.md): реєстрація агентів, конфігурація провайдерів, оновлення та видалення.
- [Готовність та усунення неполадок](docs/installation.md#check-readiness-for-your-task): діагностика конкретного агента або рушія аналізу.
- [CLI та Evidence](docs/cli.md): команди, вибір провайдера, знімки, імпорт/експорт і статуси завершення.
- [Контракти MCP](docs/mcp-contracts.md) і [промпти агентів](docs/mcp-prompts.md): результати інструментів, сеанси й керовані дослідження.
- [Каталог інструментів](docs/mcp-contracts.md#generated-catalog): створюваний під час збірки перелік інструментів, провайдерів і команд CLI.
- [План розвитку](docs/roadmap.md): заплановані роботи й відстеження можливостей.

Повідомляйте про вразливості згідно з [SECURITY.md](SECURITY.md).

## Участь у проєкті

Будемо раді вашій допомозі з REA! [Відкрийте issue](https://github.com/morluto/rea/issues), щоб повідомити про помилку чи запропонувати функцію, або [надішліть pull request](https://github.com/morluto/rea/pulls) з поліпшеннями коду чи документації.

Налаштування середовища розробки й перевірки описано в [CONTRIBUTING.md](CONTRIBUTING.md), шляхи верифікації — у [посібнику тестування](docs/testing.md), а структуру проєкту — на [схемі архітектури](docs/architecture.mermaid).

## Посилання проєкту

[Сайт](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [Безпека](SECURITY.md)

## Історія зірок

🎉 **20 000 зірок на GitHub — дякуємо!**

Дякуємо всім, хто використовує REA, повідомляє про помилки, тестує збірки й допомагає з виправленнями.

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="Історія зірок REA на GitHub" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## Відмова від відповідальності

REA надає інструменти для законних досліджень, аналізу й реконструкції за допомогою реверс-інжинірингу. Ви відповідаєте за отримання необхідних дозволів і дотримання застосовних законів. Проєкт не підтримує незаконне або несанкціоноване використання.

## Ліцензія

[MIT](LICENSE)
