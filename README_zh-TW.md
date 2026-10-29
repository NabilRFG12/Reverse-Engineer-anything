<div align="center">

[English](README.md) · [简体中文](README_zh.md) · **繁體中文** · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md)

# REA：逆向分析一切

### 通過一個 MCP 服務，逆向分析二進位檔案、應用程式和執行階段行為。

**看到喜歡的功能，弄清它的工作原理，深入到二進位層面。**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[網站](https://rea.tools/) · [指南](https://rea.tools/guides/) · [案例](https://rea.tools/showcase/)**

[快速開始](#快速開始) · [REA 的工作原理](#rea-的工作原理) · [可以分析什麼](#可以分析什麼) · [案例](#案例) · [常見問題](#常見問題) · [文件](#文件)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA 在 Hopper 中啟動分析橋，檢查原生二進位檔案" width="1200" />

<br />

<table aria-label="REA 社群">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>加入逆向工程社群</strong>
  </a><br />
  <sub>Discord · 問答 · 成果分享</sub>
</td>
</tr>
</table>

<br />

</div>

---

在應用中看到一個想加入自己產品的功能？讓 AI 代理用 REA 調查它。即使沒有原始碼，AI 代理也可以檢查應用、解釋功能的工作方式、展示證據，並為你的專案實現類似功能。

REA 將 AI 代理連接到分析工具，用於檢查原生二進位檔案、JavaScript 和 Electron 應用、.NET 程式集以及網站。你也可以在終端中使用同樣的工具。分析在本機執行，結果包含支撐各項結論的證據和相關限制。

設定流程會向 AI 代理註冊 REA，並安裝對應的工作流程指引。原生分析可以使用已有的 Hopper 或 Ghidra；設定流程也可以在你核准後安裝 Hopper。靜態 JavaScript 分析不需要這兩個引擎。

> **[訪問 REA 網站](https://rea.tools/)**，查看設定說明、圖解指南和真實案例。

## 快速開始

### 設定 AI 代理

安裝 Node.js 和 npm 後，執行：

```bash
npx rea-agents setup
```

選擇 AI 代理，檢查計劃中的變更並核准。設定流程會添加 REA 的 MCP 服務和對應的工作流程指引，並備份已有組態。完成後重新啟動 AI 代理。

設定流程支援 Claude Code、Codex、Cursor、Gemini CLI、Grok Build 和[其他 AI 代理](docs/installation.md#supported-agents)。提供者組態和手動註冊 MCP 的方法見[安裝與設定](docs/installation.md)。

### 詢問 AI 代理

```text
弄清 Notes 應用的搜尋功能如何工作，展示證據，並為我的專案實現類似功能。
```

把 Notes 替換為目標應用，並描述你想瞭解的功能。

### 使用終端

檢查已解包的 JavaScript/Electron 應用目錄或 ASAR 檔案：

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

結果包含模組、匯入、Electron 邊界及相關證據。將路徑替換為你的目標路徑，例如 Windows 上的 `"D:/apps/example"`。

如果需要經常使用，可以安裝 `rea` 命令：

```bash
npm install --global rea-agents
rea --help
```

原生分析需要先設定分析提供者。原生命令、提供者選擇、快照和腳本用法見 [CLI 與 Evidence 指南](docs/cli.md)。

### 更新 REA

REA 更新較快，新版本經常包含錯誤修復。請將安裝的版本保持最新。

通過 npm 安裝的 CLI 使用：

```bash
rea update
```

要更新 AI 代理註冊和 skill，請執行更新命令輸出的設定命令。

如果使用 `npx`，通過以下命令更新 AI 代理設定：

```bash
npx rea-agents@latest setup
```

檢查設定變更並重新啟動 AI 代理。單次 CLI 操作可使用 `npx rea-agents@latest`，後接所需命令。

## REA 的工作原理

AI 代理通過 MCP 呼叫 REA，檢查目標並追蹤相關程式碼。REA 返回發現及對應證據。AI 代理據此提出後續問題、解釋行為，或編寫並測試實現。CLI 命令使用同樣的工作流程。

![REA 調查流程：AI 代理詢問本地目標的行為，REA 使用分析工具檢查和追蹤目標，AI 代理再利用返回的程式碼、引用和未知項進行解釋、實現與測試。](website/public/assets/figures/rea-investigation-flow.svg)

[打開完整尺寸的圖示](website/public/assets/figures/rea-investigation-flow.svg)。

<a id="current-status"></a>

## 可以分析什麼

REA 需要 Node.js 22.x（>=22.19）、24.x（>=24.11）或 26+，以及 npm。額外工具和主機支援取決於分析目標：

| 目標                  | REA 返回的內容                                                  | 要求與指南                                                                                                             |
| --------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 原生二進位檔案        | 偽程式碼、組合語言、字串、符號、呼叫和引用                      | Hopper、Ghidra 或 IDA；[原生分析](https://rea.tools/guides/native/)                                                    |
| 離線 ELF 佈局         | 節、段、原始符號/重定位資訊及靜態防護機制候選項                 | Linux x64 上由呼叫方提供的 pwntools；[二進位診斷](docs/binary-diagnostics.md)                                          |
| EVM 位元組碼          | 分派選擇器、位元組偏移、推斷的參數和狀態可變性                  | 本地原始位元組/十六進位輸入載體；[離線 EVM 指南](docs/evm-bytecode.md)                                                 |
| 已記錄的 Linux 崩潰   | 原始 note 記錄、每個已記錄執行緒的暫存器/訊號及可選的對映候選項 | 呼叫方提供的 pwntools；可選的 GDB/pwndbg；[已記錄崩潰](docs/recorded-crashes.md)                                       |
| JavaScript / Electron | 模組、匯入、source map、路由、IPC 和原生附加元件關係            | Node.js 和 npm；[應用分析](https://rea.tools/guides/javascript/)                                                       |
| 網站                  | 頁面結構、腳本、網路觀察結果和按請求獲取的螢幕擷取畫面          | Chrome 系瀏覽器；[瀏覽器分析](https://rea.tools/guides/browser/)                                                       |
| 已保存的網路擷取      | 請求、回應、可訪問的酬載和來源位置                              | HAR；原生 mitmproxy 擷取需要 Linux 上的 mitmdump；[擷取指南](docs/web-network-captures.md)                             |
| .NET 程式集           | 中繼資料、CIL 指令、聲明的原生依賴和建置對比                    | 靜態檢查；[托管程式碼指南](docs/managed-code-analysis.md)                                                              |
| Android APK           | 清單聲明、類別、反編譯的方法和引用                              | Linux/macOS 上的無界面 JADX 和完整 JDK；[Android 指南](docs/android-analysis.md)                                       |
| 韌體                  | 區域、提取結果和轉交原生分析的內容                              | Linux 上的 Binwalk / Unblob；[韌體指南](docs/firmware-analysis.md)                                                     |
| 軟體包與資源          | 檔案清單、摘要、plist、Apple bundle 結構和提取的資源            | [製品與 JavaScript 指南](docs/javascript-artifact-reconstruction.md)、[Apple 應用](docs/apple-application-analysis.md) |
| 處理程序行為          | 終端輸出、互動、退出和檔案系統觀察結果，以及執行對比            | 支援原生 PTY 的 Linux/macOS；[處理程序擷取](docs/process-capture.md)                                                   |

[Unity 遊戲還原](docs/game-reversing.md)：在本機檢查 meta/GUID、場景與可能的 C# 空殼方法；建置此 fork 後即可使用。

靜態 JavaScript 和 .NET 檢查讀取提供的檔案，不執行應用。執行階段擷取會以你的使用者權限執行目標或與之互動；各執行階段指南說明瞭具體影響。

<a id="choosing-a-deep-analysis-provider"></a>

不同提供者支援的原生格式和主機系統有所不同。請參閱 [Hopper 與 Ghidra 設定](docs/installation.md#hopper)、[IDA 指南](docs/ida-provider.md)和[實驗性 Windows Ghidra 支援](docs/windows-ghidra-p0.md)。Ghidra 也支援 [16 位 DOS 分析](docs/ghidra-dos.md)。提供者選擇見 [CLI 指南](docs/cli.md#choose-a-provider)。對於最新 npm 版本發佈後新增的功能，請查看[發佈可用性](docs/installation.md#released-package-and-main)。

## 案例

### DX-Ball：重建聲像計算

沿聲音呼叫追蹤到根據位置計算聲像的輔助函數，檢查指令，將不完整的偽程式碼轉為 C。重建結果通過了 3,205 個原始 x86 測試用例，並復現了編譯後函數的全部 63 個位元組。

[閱讀案例](https://rea.tools/showcase/dx-ball/) ·
[重建專案儲存庫](https://github.com/N0zoM1z0/dx-ball)

### Notion：追蹤 Electron 剪貼簿橋

找到渲染處理程序的剪貼簿 API，沿 preload 和 IPC 追蹤到主處理程序，並檢查富格式剪貼簿資料。

[閱讀案例](https://rea.tools/showcase/notion/)

### TH04：恢復 DOS 環形子彈的計算

檢查原始 PC-98 遊戲的 16 位指令，恢復固定角度和瞄準角度的計算，並將重建的 C++ 與當年的編譯器輸出進行對比。

[閱讀案例](https://rea.tools/showcase/th04/) ·
[重建專案儲存庫](https://github.com/N0zoM1z0/th04)

如果你用 REA 分析了有趣的目標，我們很想瞭解。歡迎通過 [issue](https://github.com/morluto/rea/issues) 或 [pull request](https://github.com/morluto/rea/pulls) 分享案例，說明目標、你的問題、REA 如何提供幫助，以及你的發現。

## 常見問題

<details>
<summary><strong>哪些 AI 代理可以使用 REA？</strong></summary>

任何支援本地 MCP 服務的 AI 代理都可以使用。設定流程會設定[受支援的 AI 代理](docs/installation.md#supported-agents)；其他客戶端可通過[手動註冊 MCP](docs/installation.md#mcp-registry) 使用。

</details>

<details>
<summary><strong>需要 Hopper、Ghidra 或 IDA 嗎？</strong></summary>

深入的原生分析需要其中一個引擎。靜態 JavaScript 和 .NET 檢查不需要原生分析引擎。設定流程可以在你核准後安裝 Hopper；Ghidra 和 IDA 則使用已有安裝。見[提供者設定](docs/installation.md#hopper)。

</details>

<details>
<summary><strong>需要先啟動 Hopper 嗎？</strong></summary>

REA 會在操作需要時啟動 Hopper。在 macOS 上，首次執行時可能會出現對話框，讓你選擇演示模式或啟用授權。見 [Hopper 啟動與故障排查](docs/installation.md#launcher-paths-and-troubleshooting)。

</details>

<details>
<summary><strong>從 skills.sh 安裝 skill 有什麼作用？</strong></summary>

skill 為 AI 代理提供調查指引。使用 `rea setup` 註冊 REA 的 MCP 服務並安裝對應的指引，然後重新啟動 AI 代理。見[僅安裝 skill](docs/installation.md#skill-only-installation)。

</details>

<details>
<summary><strong>REA 返回什麼程式碼？</strong></summary>

原生分析返回偽程式碼和組合語言。JavaScript/Electron 分析恢復模組及其關係。AI 代理利用這些發現編寫並測試實現；[案例](#案例)提供了完整示例。

</details>

<details>
<summary><strong>REA 會上傳我的應用嗎？</strong></summary>

REA 在本機分析目標。AI 代理會接收工具結果，其模型提供商有自己的資料政策。

</details>

<details>
<summary><strong>遇到錯誤時該怎麼辦？</strong></summary>

先更新；最近的版本可能已經修復了問題。

通過 npm 安裝的 CLI 使用：

```bash
rea update
```

通過 `npx` 設定 AI 代理時使用：

```bash
npx rea-agents@latest setup
```

如果正在使用 AI 代理，請完成[設定更新](#更新-rea)並重新啟動 AI 代理。重試同一任務。如果問題仍然存在，請[提交 issue](https://github.com/morluto/rea/issues)，附上 REA 版本、目標類型、復現步驟和錯誤輸出。

</details>

## 文件

可以先閱讀網站上的[實操指南](https://rea.tools/guides/)。具體選項、前提條件和結果契約見：

- [安裝與設定](docs/installation.md)：AI 代理註冊、提供者組態、更新和卸載。
- [就緒檢查與故障排查](docs/installation.md#check-readiness-for-your-task)：診斷特定 AI 代理或分析引擎。
- [CLI 與 Evidence](docs/cli.md)：命令、提供者選擇、快照、匯入/匯出和退出狀態。
- [MCP 契約](docs/mcp-contracts.md)和[AI 代理提示詞](docs/mcp-prompts.md)：工具結果、會話和引導式調查。
- [工具目錄](docs/mcp-contracts.md#generated-catalog)：建置時生成的工具、提供者和 CLI 命令清單。
- [路線圖](docs/roadmap.md)：計劃中的工作和能力跟蹤。

請按照 [SECURITY.md](SECURITY.md) 報告漏洞。

## 參與貢獻

歡迎幫助改進 REA！你可以[提交 issue](https://github.com/morluto/rea/issues) 報告錯誤或建議功能，也可以[提交 pull request](https://github.com/morluto/rea/pulls) 改進程式碼或文件。

開發設定和檢查見 [CONTRIBUTING.md](CONTRIBUTING.md)，驗證流程見[測試指南](docs/testing.md)，專案結構見[架構圖](docs/architecture.mermaid)。

## 專案連結

[網站](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [安全](SECURITY.md)

## Star 歷史

🎉 **GitHub Star 達到 20,000 個，感謝大家！**

感謝每一位使用 REA、報告錯誤、測試建置和貢獻修復的朋友。

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="REA 的 GitHub Star 歷史" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## 免責聲明

REA 為合法的逆向工程研究、分析和重建提供工具。你有責任取得所需授權並遵守適用法律。本專案不認同非法或未經授權的使用。

## 授權條款

[MIT](LICENSE)
