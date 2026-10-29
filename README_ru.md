<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · **Русский** · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md)

# REA: Реверс-инжиниринг чего угодно

### Один MCP для реверс-инжиниринга бинарных файлов, приложений и поведения во время выполнения.

**Нашли интересную функцию? Разберитесь, как она работает, вплоть до двоичного кода.**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[Сайт](https://rea.tools/) · [Руководства](https://rea.tools/guides/) · [Примеры](https://rea.tools/showcase/)**

[Быстрый старт](#быстрый-старт) · [Как работает REA](#как-работает-rea) · [Что можно анализировать](#что-можно-анализировать) · [Примеры](#примеры) · [Частые вопросы](#частые-вопросы) · [Документация](#документация)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA запускает мост анализа внутри Hopper при исследовании нативного бинарного файла" width="1200" />

<br />

<table aria-label="Сообщество REA">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>Присоединяйтесь к сообществу реверс-инжиниринга</strong>
  </a><br />
  <sub>Discord · Вопросы и ответы · Обмен результатами</sub>
</td>
</tr>
</table>

<br />

</div>

---

Увидели в приложении функцию, которую хотите добавить в свой продукт? Попросите агента исследовать её с помощью REA. Он может изучить приложение без исходного кода, объяснить работу функции, показать подтверждающие данные и создать подходящую реализацию для вашего проекта.

REA подключает вашего агента к инструментам для исследования нативных бинарных файлов, приложений JavaScript и Electron, сборок .NET и сайтов. Те же инструменты доступны в терминале. Анализ выполняется локально, а результаты содержат данные и ограничения, на которых основан каждый вывод.

Настройка регистрирует REA в вашем агенте и устанавливает соответствующие инструкции по работе. Для нативного анализа можно использовать уже установленный Hopper или Ghidra; настройка также может установить Hopper с вашего согласия. Для статического анализа JavaScript не нужен ни один из этих движков.

> **[Посетите сайт REA](https://rea.tools/)**: там есть инструкции по настройке, иллюстрированные руководства и реальные исследования.

## Быстрый старт

### Настройте агента

Если Node.js и npm установлены, выполните:

```bash
npx rea-agents setup
```

Выберите агентов, проверьте предлагаемые изменения и подтвердите их. Настройка добавляет MCP-сервер REA и соответствующие рабочие инструкции, сохраняя резервные копии существующих настроек. После этого перезапустите агента.

Настройка поддерживает Claude Code, Codex, Cursor, Gemini CLI, Grok Build и [других агентов](docs/installation.md#supported-agents). Настройка провайдеров и ручная регистрация MCP описаны в разделе [установка и настройка](docs/installation.md).

### Задайте вопрос агенту

```text
Исследуй, как работает поиск в приложении Notes, покажи подтверждающие данные и создай похожую функцию для моего проекта.
```

Замените Notes нужным приложением и укажите функцию, которую хотите понять.

### Используйте терминал

Исследуйте распакованный каталог приложения JavaScript/Electron или файл ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

Результат включает модули, импорты, границы Electron и подтверждающие данные. Замените путь своим, например `"D:/apps/example"` в Windows.

Для регулярного использования установите команду `rea`:

```bash
npm install --global rea-agents
rea --help
```

Для нативного анализа сначала настройте провайдер. Нативные команды, выбор провайдера, снимки и работу со скриптами описывает [руководство по CLI и Evidence](docs/cli.md).

### Обновите REA

REA быстро развивается, и новые версии часто содержат исправления ошибок. Регулярно обновляйте установленную версию.

Для CLI, установленного через npm:

```bash
rea update
```

Чтобы обновить регистрации агентов и skill, выполните команду настройки, которую выведет обновление.

Если используете `npx`, обновите настройку агента командой:

```bash
npx rea-agents@latest setup
```

Проверьте изменения настроек и перезапустите агента. Для разовых команд CLI используйте `npx rea-agents@latest`, а затем нужную команду.

## Как работает REA

Агент вызывает REA через MCP, чтобы исследовать цель и проследить связанный код. REA возвращает результаты вместе с подтверждающими данными. Агент использует их для уточняющих вопросов, объяснения поведения или написания и тестирования реализации. Команды CLI используют те же рабочие процессы.

![Процесс исследования с REA: агент задаёт вопрос о локальной цели, REA исследует её инструментами анализа, а агент использует возвращённый код, ссылки и неизвестные сведения для объяснения, реализации и тестирования.](website/public/assets/figures/rea-investigation-flow.svg)

[Открыть рисунок в полном размере](website/public/assets/figures/rea-investigation-flow.svg).

<a id="current-status"></a>

## Что можно анализировать

REA требует Node.js 22.x (>=22.19), 24.x (>=24.11) или 26+, а также npm. Дополнительные инструменты и поддерживаемые системы зависят от цели:

| Цель                        | Что возвращает REA                                                                                                         | Требования и руководство                                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Нативные бинарные файлы     | Псевдокод, ассемблер, строки, символы, вызовы и ссылки                                                                     | Hopper, Ghidra или IDA; [нативный анализ](https://rea.tools/guides/native/)                                                                  |
| Структура ELF без запуска   | Секции, сегменты, исходные символы/релокации и возможные механизмы защиты по данным статического анализа                   | pwntools, предоставленный вызывающей стороной, в Linux x64; [диагностика бинарных файлов](docs/binary-diagnostics.md)                        |
| Байт-код EVM                | Селекторы диспетчеризации, смещения байтов, предполагаемые аргументы и изменяемость состояния                              | Локальные необработанные байты или шестнадцатеричное представление; [руководство по EVM без запуска](docs/evm-bytecode.md)                   |
| Записанные сбои Linux       | Необработанные записи note, регистры/сигналы каждого записанного потока и необязательные кандидаты сопоставления с памятью | pwntools, предоставленный вызывающей стороной; необязательные GDB/pwndbg; [записанные сбои](docs/recorded-crashes.md)                        |
| JavaScript / Electron       | Модули, импорты, карты исходного кода, маршруты, IPC и связи с нативными дополнениями                                      | Node.js и npm; [анализ приложений](https://rea.tools/guides/javascript/)                                                                     |
| Сайты                       | Структура страницы, скрипты, наблюдения за сетью и запрошенные снимки экрана                                               | Браузер семейства Chrome; [анализ браузера](https://rea.tools/guides/browser/)                                                               |
| Сохранённые сетевые захваты | Запросы, ответы, доступные полезные данные и позиции в источнике                                                           | HAR; mitmdump в Linux для захватов в собственном формате mitmproxy; [руководство по сетевым захватам](docs/web-network-captures.md)          |
| Сборки .NET                 | Метаданные, инструкции CIL, объявленные нативные зависимости и сравнения сборок                                            | Статическое исследование; [руководство по управляемому коду](docs/managed-code-analysis.md)                                                  |
| Android APK                 | Объявления манифеста, классы, декомпилированные методы и ссылки                                                            | JADX без графического интерфейса и полный JDK в Linux/macOS; [руководство по Android](docs/android-analysis.md)                              |
| Прошивки                    | Области, результаты извлечения и передача в нативный анализ                                                                | Binwalk / Unblob в Linux; [руководство по прошивкам](docs/firmware-analysis.md)                                                              |
| Пакеты и ресурсы            | Списки файлов, хеши, plist, структура пакетов Apple и извлечённые ресурсы                                                  | [Руководство по артефактам и JavaScript](docs/javascript-artifact-reconstruction.md), [приложения Apple](docs/apple-application-analysis.md) |
| Поведение процессов         | Вывод терминала, взаимодействия, наблюдения за завершением и файловой системой, сравнения запусков                         | Linux/macOS с нативным PTY; [захват процессов](docs/process-capture.md)                                                                      |

[Восстановление игр Unity](docs/game-reversing.md): локальная проверка метаданных/GUID, сцен и возможных заглушек C#; доступна после сборки этого форка.

Статическое исследование JavaScript и .NET читает предоставленные файлы, не запуская приложение. Захват во время выполнения запускает выбранную цель или взаимодействует с ней с правами вашего пользователя; соответствующие руководства описывают последствия.

<a id="choosing-a-deep-analysis-provider"></a>

Нативные форматы и поддерживаемые системы различаются у разных провайдеров. См. [настройку Hopper и Ghidra](docs/installation.md#hopper), [руководство по IDA](docs/ida-provider.md) и [экспериментальную поддержку Ghidra в Windows](docs/windows-ghidra-p0.md). Ghidra также поддерживает [анализ 16-битного DOS](docs/ghidra-dos.md). Выбор провайдера описан в [руководстве по CLI](docs/cli.md#choose-a-provider). Для функций, добавленных после последней версии в npm, проверьте [доступность в релизах](docs/installation.md#released-package-and-main).

## Примеры

### DX-Ball: восстановление расчёта звуковой панорамы

Проследите звуковой вызов до функции, преобразующей координату в значение панорамы, изучите инструкции и превратите неполный псевдокод в C. Восстановленная реализация проходит 3 205 тестов с исходным x86-кодом и воспроизводит все 63 байта скомпилированной функции.

[Прочитать исследование](https://rea.tools/showcase/dx-ball/) · [Репозиторий реконструкции](https://github.com/N0zoM1z0/dx-ball)

### Notion: исследование моста буфера обмена Electron

Найдите API буфера обмена в процессе рендеринга, проследите его через preload и IPC до основного процесса и изучите формат буфера обмена с форматированием.

[Прочитать исследование](https://rea.tools/showcase/notion/)

### TH04: восстановление расчёта кольца пуль в DOS

Изучите 16-битные инструкции оригинальной игры для PC-98, восстановите расчёты фиксированных и прицельных углов и сравните восстановленный C++ с выводом компилятора того времени.

[Прочитать исследование](https://rea.tools/showcase/th04/) · [Репозиторий реконструкции](https://github.com/N0zoM1z0/th04)

Если вы исследовали с REA что-то интересное, поделитесь результатом. Создайте [issue](https://github.com/morluto/rea/issues) или [pull request](https://github.com/morluto/rea/pulls) и укажите цель, ваш вопрос, как помог REA и что удалось узнать.

## Частые вопросы

<details>
<summary><strong>Какие агенты могут использовать REA?</strong></summary>

Любой агент с поддержкой локальных MCP-серверов. Настройка конфигурирует [поддерживаемых агентов](docs/installation.md#supported-agents); другие клиенты могут использовать [ручную регистрацию MCP](docs/installation.md#mcp-registry).

</details>

<details>
<summary><strong>Нужны ли мне Hopper, Ghidra или IDA?</strong></summary>

Углублённый нативный анализ использует один из этих инструментов. Статическое исследование JavaScript и .NET работает без движка нативного анализа. Настройка может установить Hopper после подтверждения; Ghidra и IDA используют существующие установки. См. [настройку провайдеров](docs/installation.md#hopper).

</details>

<details>
<summary><strong>Нужно ли сначала запускать Hopper?</strong></summary>

REA запускает Hopper, когда он нужен для операции. В macOS при первом запуске может появиться диалог выбора деморежима или активации лицензии. См. [запуск Hopper и устранение неполадок](docs/installation.md#launcher-paths-and-troubleshooting).

</details>

<details>
<summary><strong>Что даёт установка skill с skills.sh?</strong></summary>

Skill предоставляет агенту инструкции по исследованию. Используйте `rea setup`, чтобы зарегистрировать MCP-сервер REA и установить соответствующие инструкции, затем перезапустите агента. См. [установку только skill](docs/installation.md#skill-only-installation).

</details>

<details>
<summary><strong>Какой код возвращает REA?</strong></summary>

Нативный анализ возвращает псевдокод и ассемблер. Анализ JavaScript/Electron восстанавливает модули и их связи. Агент использует эти результаты, чтобы написать и протестировать реализацию; в [примерах](#примеры) показаны практические исследования.

</details>

<details>
<summary><strong>REA загружает моё приложение на сервер?</strong></summary>

REA анализирует цели локально. Ваш агент получает результаты инструментов, а у его поставщика моделей есть собственная политика обработки данных.

</details>

<details>
<summary><strong>Что делать, если я столкнулся с ошибкой?</strong></summary>

Сначала обновитесь: недавний релиз мог уже исправить ошибку.

Для CLI, установленного через npm:

```bash
rea update
```

Для настройки агента через `npx`:

```bash
npx rea-agents@latest setup
```

Если используете агента, завершите [обновление настройки](#обновите-rea) и перезапустите его. Повторите ту же задачу. Если проблема сохраняется, [откройте issue](https://github.com/morluto/rea/issues), указав версию REA, тип цели, шаги воспроизведения и вывод ошибки.

</details>

## Документация

Начните с [практических руководств](https://rea.tools/guides/) на сайте. Точные параметры, требования и контракты результатов описаны здесь:

- [Установка и настройка](docs/installation.md): регистрация агентов, настройка провайдеров, обновление и удаление.
- [Готовность и устранение неполадок](docs/installation.md#check-readiness-for-your-task): диагностика конкретного агента или движка анализа.
- [CLI и Evidence](docs/cli.md): команды, выбор провайдера, снимки, импорт/экспорт и коды завершения.
- [Контракты MCP](docs/mcp-contracts.md) и [промпты агентов](docs/mcp-prompts.md): результаты инструментов, сеансы и исследования с подсказками.
- [Каталог инструментов](docs/mcp-contracts.md#generated-catalog): создаваемый при сборке перечень инструментов, провайдеров и команд CLI.
- [План развития](docs/roadmap.md): запланированные работы и отслеживание возможностей.

Сообщайте об уязвимостях согласно [SECURITY.md](SECURITY.md).

## Участие в проекте

Будем рады вашей помощи с REA! [Откройте issue](https://github.com/morluto/rea/issues), чтобы сообщить об ошибке или предложить функцию, либо [отправьте pull request](https://github.com/morluto/rea/pulls) с улучшениями кода или документации.

Настройка среды разработки и проверки описаны в [CONTRIBUTING.md](CONTRIBUTING.md), направления проверки — в [руководстве по тестированию](docs/testing.md), а структура проекта — на [схеме архитектуры](docs/architecture.mermaid).

## Ссылки проекта

[Сайт](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [Безопасность](SECURITY.md)

## История звёзд

🎉 **20 000 звёзд на GitHub — спасибо!**

Спасибо всем, кто использует REA, сообщает об ошибках, тестирует сборки и помогает с исправлениями.

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="История звёзд REA на GitHub" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## Отказ от ответственности

REA предоставляет инструменты для законных исследований, анализа и реконструкции с помощью реверс-инжиниринга. Вы отвечаете за получение необходимых разрешений и соблюдение применимых законов. Проект не поддерживает незаконное или несанкционированное использование.

## Лицензия

[MIT](LICENSE)
