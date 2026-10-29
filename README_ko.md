<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · **한국어** · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md)

# REA: 무엇이든 리버스 엔지니어링

### 하나의 MCP로 바이너리, 애플리케이션, 런타임 동작을 리버스 엔지니어링합니다.

**마음에 드는 기능을 발견했다면, 바이너리 수준까지 작동 원리를 이해하세요.**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[웹사이트](https://rea.tools/) · [가이드](https://rea.tools/guides/) · [사례](https://rea.tools/showcase/)**

[빠른 시작](#빠른-시작) · [REA의 작동 방식](#rea의-작동-방식) · [분석할 수 있는 대상](#분석할-수-있는-대상) · [사례](#사례) · [자주 묻는 질문](#자주-묻는-질문) · [문서](#문서)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA가 Hopper 안에서 분석 브리지를 실행해 네이티브 바이너리를 검사하는 모습" width="1200" />

<br />

<table aria-label="REA 커뮤니티">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>리버스 엔지니어링 커뮤니티에 참여하세요</strong>
  </a><br />
  <sub>Discord · 질문과 답변 · 결과 공유</sub>
</td>
</tr>
</table>

<br />

</div>

---

앱에서 내 제품에도 넣고 싶은 기능을 발견했나요? 에이전트에게 REA로 조사해 달라고 요청하세요. 소스 코드가 없어도 앱을 검사하고, 기능의 작동 원리를 설명하고, 근거를 보여 주고, 프로젝트에 맞는 기능을 구현할 수 있습니다.

REA는 에이전트를 분석 도구에 연결해 네이티브 바이너리, JavaScript와 Electron 앱, .NET 어셈블리, 웹사이트를 검사할 수 있게 합니다. 터미널에서도 같은 도구를 사용할 수 있습니다. 분석은 로컬에서 실행되며, 결과에는 각 결론의 근거와 한계가 포함됩니다.

설정 과정은 에이전트에 REA를 등록하고 해당 버전에 맞는 워크플로 지침을 설치합니다. 네이티브 분석에는 기존 Hopper 또는 Ghidra 설치를 사용할 수 있습니다. 승인하면 설정 과정에서 Hopper를 설치할 수도 있습니다. 정적 JavaScript 분석에는 두 엔진 모두 필요하지 않습니다.

> **[REA 웹사이트](https://rea.tools/)**에서 설정 방법, 그림으로 설명한 가이드, 실제 사례를 확인하세요.

## 빠른 시작

### 에이전트 설정

Node.js와 npm이 설치된 환경에서 다음 명령을 실행하세요.

```bash
npx rea-agents setup
```

에이전트를 선택하고, 예정된 변경 사항을 검토한 뒤 승인하세요. 설정 과정은 기존 설정을 백업하고 REA의 MCP 서버와 버전에 맞는 워크플로 지침을 추가합니다. 완료 후 에이전트를 다시 시작하세요.

설정은 Claude Code, Codex, Cursor, Gemini CLI, Grok Build 및 [다른 에이전트](docs/installation.md#supported-agents)를 지원합니다. 제공자 설정과 수동 MCP 등록은 [설치 및 설정](docs/installation.md)을 참고하세요.

### 에이전트에게 요청

```text
Notes 앱의 검색 기능이 어떻게 작동하는지 조사하고, 근거를 보여 준 다음, 내 프로젝트에 비슷한 기능을 구현해 줘.
```

Notes를 대상 앱으로 바꾸고 이해하고 싶은 기능을 지정하세요.

### 터미널 사용

압축을 푼 JavaScript/Electron 앱 디렉터리 또는 ASAR를 검사합니다.

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

결과에는 모듈, 임포트, Electron 경계와 관련 근거가 포함됩니다. 경로를 분석할 대상으로 바꾸세요. Windows에서는 `"D:/apps/example"` 같은 경로를 사용할 수 있습니다.

자주 사용할 경우 `rea` 명령을 설치하세요.

```bash
npm install --global rea-agents
rea --help
```

네이티브 분석에는 먼저 제공자를 설정해야 합니다. 네이티브 명령, 제공자 선택, 스냅샷, 스크립트 사용은 [CLI 및 Evidence 가이드](docs/cli.md)를 참고하세요.

### REA 업데이트

REA는 빠르게 바뀌며 새 릴리스에는 버그 수정이 자주 포함됩니다. 설치된 버전을 최신으로 유지하세요.

npm으로 설치한 CLI에서는 다음 명령을 사용합니다.

```bash
rea update
```

에이전트 등록과 스킬을 갱신하려면 업데이트 과정에서 출력된 설정 명령을 실행하세요.

`npx`를 사용한다면 다음 명령으로 에이전트 설정을 갱신하세요.

```bash
npx rea-agents@latest setup
```

설정 변경 사항을 검토하고 에이전트를 다시 시작하세요. 일회성 CLI 작업에는 `npx rea-agents@latest` 뒤에 필요한 명령을 붙여 실행하세요.

## REA의 작동 방식

에이전트는 MCP를 통해 REA를 호출하여 대상을 검사하고 관련 코드를 추적합니다. REA는 조사 결과와 근거를 반환합니다. 에이전트는 이를 바탕으로 추가 질문을 하고, 동작을 설명하거나, 구현을 작성하고 테스트합니다. CLI 명령도 같은 워크플로를 사용합니다.

![REA 조사 흐름: 에이전트가 로컬 대상에 대해 질문하면 REA가 분석 도구로 대상을 검사하고 추적합니다. 에이전트는 반환된 코드, 참조, 확인되지 않은 사항을 이용해 설명하고 구현하고 테스트합니다.](website/public/assets/figures/rea-investigation-flow.svg)

[원본 크기의 그림 열기](website/public/assets/figures/rea-investigation-flow.svg).

<a id="current-status"></a>

## 분석할 수 있는 대상

REA에는 Node.js 22.x(>=22.19), 24.x(>=24.11) 또는 26+와 npm이 필요합니다. 추가 도구와 호스트 지원은 대상에 따라 다릅니다.

| 대상                  | REA가 반환하는 내용                                                           | 요구 사항 및 가이드                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 네이티브 바이너리     | 의사 코드, 어셈블리, 문자열, 심볼, 호출, 참조                                 | Hopper, Ghidra 또는 IDA; [네이티브 분석](https://rea.tools/guides/native/)                                                            |
| 오프라인 ELF 레이아웃 | 섹션, 세그먼트, 원본 심볼/재배치 정보, 정적 분석으로 얻은 보안 완화 기법 후보 | Linux x64에서 호출자가 제공하는 pwntools; [바이너리 진단](docs/binary-diagnostics.md)                                                 |
| EVM 바이트코드        | 디스패치 선택자, 바이트 오프셋, 추론한 인자와 상태 변경 가능 여부             | 로컬 원시 바이트/16진수 입력 파일; [오프라인 EVM 가이드](docs/evm-bytecode.md)                                                        |
| 기록된 Linux 크래시   | 원시 note 레코드, 기록된 모든 스레드의 레지스터/시그널, 선택적 매핑 후보      | 호출자가 제공하는 pwntools; GDB/pwndbg는 선택 사항; [기록된 크래시](docs/recorded-crashes.md)                                         |
| JavaScript / Electron | 모듈, 임포트, 소스 맵, 라우트, IPC, 네이티브 애드온 관계                      | Node.js와 npm; [애플리케이션 분석](https://rea.tools/guides/javascript/)                                                              |
| 웹사이트              | 페이지 구조, 스크립트, 네트워크 관찰 결과, 요청한 스크린샷                    | Chrome 계열 브라우저; [브라우저 분석](https://rea.tools/guides/browser/)                                                              |
| 저장된 네트워크 캡처  | 요청, 응답, 접근 가능한 페이로드, 소스 위치                                   | HAR; mitmproxy 네이티브 캡처에는 Linux의 mitmdump; [캡처 가이드](docs/web-network-captures.md)                                        |
| .NET 어셈블리         | 메타데이터, CIL 명령, 선언된 네이티브 의존성, 빌드 비교                       | 정적 검사; [관리 코드 가이드](docs/managed-code-analysis.md)                                                                          |
| Android APK           | 매니페스트 선언, 클래스, 디컴파일된 메서드, 참조                              | Linux/macOS의 헤드리스 JADX와 전체 JDK; [Android 가이드](docs/android-analysis.md)                                                    |
| 펌웨어                | 영역, 추출 결과, 네이티브 분석으로 전달할 정보                                | Linux의 Binwalk / Unblob; [펌웨어 가이드](docs/firmware-analysis.md)                                                                  |
| 패키지 및 리소스      | 파일 목록, 다이제스트, plist, Apple 번들 구조, 추출한 리소스                  | [아티팩트 및 JavaScript 가이드](docs/javascript-artifact-reconstruction.md), [Apple 애플리케이션](docs/apple-application-analysis.md) |
| 프로세스 동작         | 터미널 출력, 상호작용, 종료 및 파일 시스템 관찰 결과, 실행 비교               | 네이티브 PTY를 지원하는 Linux/macOS; [프로세스 캡처](docs/process-capture.md)                                                         |

[Unity 게임 복구](docs/game-reversing.md): 메타/GUID, 씬 및 C# 스텁 후보를 로컬에서 검사합니다. 이 포크를 빌드한 후 사용할 수 있습니다.

정적 JavaScript 및 .NET 검사는 제공된 파일을 읽으며 애플리케이션을 실행하지 않습니다. 런타임 캡처는 사용자의 권한으로 선택한 대상을 실행하거나 대상과 상호작용합니다. 각 런타임 가이드에서 그 영향을 설명합니다.

<a id="choosing-a-deep-analysis-provider"></a>

지원하는 네이티브 형식과 호스트는 제공자마다 다릅니다. [Hopper 및 Ghidra 설정](docs/installation.md#hopper), [IDA 가이드](docs/ida-provider.md), [실험적 Windows Ghidra 지원](docs/windows-ghidra-p0.md)을 참고하세요. Ghidra는 [16비트 DOS 분석](docs/ghidra-dos.md)도 지원합니다. 제공자 선택은 [CLI 가이드](docs/cli.md#choose-a-provider)를 참고하세요. 최신 npm 릴리스 이후 추가된 기능은 [릴리스에서의 사용 가능 여부](docs/installation.md#released-package-and-main)를 확인하세요.

## 사례

### DX-Ball: 사운드 패닝 계산 재구현

사운드 호출에서 위치를 패닝 값으로 변환하는 보조 함수까지 추적하고, 명령을 검사하여 불완전한 의사 코드를 C로 옮깁니다. 재구현한 코드는 원본 x86에 대한 3,205개 테스트 케이스를 통과했으며, 컴파일된 함수의 63바이트 전체를 재현합니다.

[사례 읽기](https://rea.tools/showcase/dx-ball/) ·
[재구현 저장소](https://github.com/N0zoM1z0/dx-ball)

### Notion: Electron 클립보드 브리지 추적

렌더러의 클립보드 API를 찾고, preload와 IPC를 거쳐 메인 프로세스까지 추적한 뒤, 서식 있는 클립보드 형식을 검사합니다.

[사례 읽기](https://rea.tools/showcase/notion/)

### TH04: DOS 원형 탄막 계산 복원

원본 PC-98 게임의 16비트 명령을 검사하고 고정 각도와 조준 각도의 계산을 복원합니다. 재구현한 C++를 당시 컴파일러의 출력과 비교합니다.

[사례 읽기](https://rea.tools/showcase/th04/) ·
[재구현 저장소](https://github.com/N0zoM1z0/th04)

REA로 흥미로운 대상을 분석했다면 알려 주세요. [issue](https://github.com/morluto/rea/issues) 또는 [pull request](https://github.com/morluto/rea/pulls)에 대상, 조사하려던 질문, REA가 어떻게 도움이 되었는지, 무엇을 알아냈는지를 담아 공유하세요.

## 자주 묻는 질문

<details>
<summary><strong>어떤 에이전트에서 REA를 사용할 수 있나요?</strong></summary>

로컬 MCP 서버를 지원하는 에이전트라면 사용할 수 있습니다. 설정 과정은 [지원하는 에이전트](docs/installation.md#supported-agents)를 구성합니다. 다른 클라이언트는 [수동 MCP 등록](docs/installation.md#mcp-registry)을 이용할 수 있습니다.

</details>

<details>
<summary><strong>Hopper, Ghidra 또는 IDA가 필요한가요?</strong></summary>

심층 네이티브 분석에는 이 중 하나를 사용합니다. 정적 JavaScript 및 .NET 검사에는 네이티브 분석 엔진이 필요하지 않습니다. 설정 과정에서 승인 후 Hopper를 설치할 수 있으며, Ghidra와 IDA는 기존 설치를 사용합니다. [제공자 설정](docs/installation.md#hopper)을 참고하세요.

</details>

<details>
<summary><strong>Hopper를 먼저 실행해야 하나요?</strong></summary>

REA는 작업에 필요할 때 Hopper를 실행합니다. macOS에서는 처음 실행할 때 데모 모드를 선택하거나 라이선스를 활성화하라는 대화 상자가 나타날 수 있습니다. [Hopper 실행 및 문제 해결](docs/installation.md#launcher-paths-and-troubleshooting)을 참고하세요.

</details>

<details>
<summary><strong>skills.sh에서 설치하는 스킬은 어떤 역할을 하나요?</strong></summary>

스킬은 에이전트에게 조사 지침을 제공합니다. `rea setup`으로 REA의 MCP 서버를 등록하고 버전에 맞는 지침을 설치한 뒤 에이전트를 다시 시작하세요. [스킬만 설치하기](docs/installation.md#skill-only-installation)를 참고하세요.

</details>

<details>
<summary><strong>REA는 어떤 코드를 반환하나요?</strong></summary>

네이티브 분석은 의사 코드와 어셈블리를 반환합니다. JavaScript/Electron 분석은 모듈과 그 관계를 복원합니다. 에이전트는 이 결과를 사용해 구현을 작성하고 테스트합니다. [사례](#사례)에서 구체적인 예를 볼 수 있습니다.

</details>

<details>
<summary><strong>REA가 내 앱을 업로드하나요?</strong></summary>

REA는 대상을 로컬에서 분석합니다. 에이전트는 도구 결과를 받으며, 에이전트의 모델 제공자에는 별도의 데이터 정책이 있습니다.

</details>

<details>
<summary><strong>버그가 발생하면 어떻게 해야 하나요?</strong></summary>

먼저 업데이트하세요. 최근 릴리스에서 이미 수정되었을 수 있습니다.

npm으로 설치한 CLI에서는 다음 명령을 사용합니다.

```bash
rea update
```

`npx`로 에이전트를 설정했다면 다음 명령을 사용합니다.

```bash
npx rea-agents@latest setup
```

에이전트를 사용 중이라면 [설정 갱신](#rea-업데이트)을 완료하고 다시 시작하세요. 같은 작업을 다시 시도하세요. 문제가 계속되면 REA 버전, 대상 유형, 재현 단계, 오류 출력을 포함해 [issue를 등록](https://github.com/morluto/rea/issues)하세요.

</details>

## 문서

웹사이트의 [실습 가이드](https://rea.tools/guides/)부터 읽어 보세요. 정확한 옵션, 사전 요구 사항, 결과 계약은 다음 문서를 참고하세요.

- [설치 및 설정](docs/installation.md): 에이전트 등록, 제공자 설정, 업데이트, 제거.
- [준비 상태 확인 및 문제 해결](docs/installation.md#check-readiness-for-your-task): 특정 에이전트 또는 분석 엔진 진단.
- [CLI 및 Evidence](docs/cli.md): 명령, 제공자 선택, 스냅샷, 가져오기/내보내기, 종료 상태.
- [MCP 계약](docs/mcp-contracts.md) 및 [에이전트 프롬프트](docs/mcp-prompts.md): 도구 결과, 세션, 안내에 따른 조사.
- [도구 카탈로그](docs/mcp-contracts.md#generated-catalog): 빌드 시 생성되는 도구, 제공자, CLI 명령 목록.
- [로드맵](docs/roadmap.md): 계획된 작업과 기능 진행 상황.

취약점은 [SECURITY.md](SECURITY.md)에 따라 보고하세요.

## 기여

REA에 도움을 보태 주세요! [issue를 등록](https://github.com/morluto/rea/issues)해 버그나 기능을 제안하거나, [pull request를 보내](https://github.com/morluto/rea/pulls) 코드와 문서를 개선할 수 있습니다.

개발 환경과 검사 항목은 [CONTRIBUTING.md](CONTRIBUTING.md), 검증 절차는 [테스트 가이드](docs/testing.md), 프로젝트 구조는 [아키텍처 지도](docs/architecture.mermaid)를 참고하세요.

## 프로젝트 링크

[웹사이트](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [보안](SECURITY.md)

## 스타 기록

🎉 **GitHub 스타 20,000개, 감사합니다!**

REA를 사용하고, 버그를 보고하고, 빌드를 테스트하고, 수정에 기여해 주신 모든 분께 감사드립니다.

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="REA GitHub 스타 기록" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## 면책 조항

REA는 합법적인 리버스 엔지니어링 연구, 분석, 재구성을 위한 도구를 제공합니다. 필요한 권한을 얻고 관련 법률을 준수할 책임은 사용자에게 있습니다. 이 프로젝트는 불법적이거나 허가받지 않은 사용을 지지하지 않습니다.

## 라이선스

[MIT](LICENSE)
