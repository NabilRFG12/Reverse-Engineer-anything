<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · **日本語** · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md)

# REA：あらゆるものをリバースエンジニアリング

### バイナリ、アプリケーション、実行時の動作を、ひとつの MCP でリバースエンジニアリング。

**気に入った機能を見つけたら、その仕組みをバイナリのレベルまで理解する。**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[ウェブサイト](https://rea.tools/) · [ガイド](https://rea.tools/guides/) · [事例](https://rea.tools/showcase/)**

[クイックスタート](#クイックスタート) · [REA の仕組み](#rea-の仕組み) · [分析できる対象](#分析できる対象) · [事例](#事例) · [よくある質問](#よくある質問) · [ドキュメント](#ドキュメント)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA が Hopper 内で分析ブリッジを起動し、ネイティブバイナリを調べる様子" width="1200" />

<br />

<table aria-label="REA コミュニティ">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>リバースエンジニアリングのコミュニティに参加</strong>
  </a><br />
  <sub>Discord · 質問と回答 · 成果の共有</sub>
</td>
</tr>
</table>

<br />

</div>

---

アプリに、自分の製品にも取り入れたい機能を見つけましたか？エージェントに REA で調査を依頼してください。ソースコードがなくてもアプリを調べ、機能の仕組みを説明し、根拠を示したうえで、あなたのプロジェクト向けに実装できます。

REA はエージェントを分析ツールにつなぎ、ネイティブバイナリ、JavaScript や Electron のアプリ、.NET アセンブリ、ウェブサイトを調べられるようにします。同じツールをターミナルからも使えます。分析はローカルで実行され、結果には各結論を裏付ける根拠と制限事項が含まれます。

セットアップはエージェントに REA を登録し、対応するワークフローの手順をインストールします。ネイティブ分析には既存の Hopper または Ghidra を使えます。承認すれば、セットアップで Hopper をインストールすることもできます。静的な JavaScript 分析には、どちらのエンジンも必要ありません。

> **[REA のウェブサイト](https://rea.tools/)**で、セットアップ手順、図解ガイド、実際の事例を確認できます。

## クイックスタート

### エージェントを設定する

Node.js と npm がインストールされている環境で実行します。

```bash
npx rea-agents setup
```

使うエージェントを選び、予定されている変更を確認して承認してください。セットアップは REA の MCP サーバーと対応するワークフローの手順を追加し、既存の設定をバックアップします。完了後にエージェントを再起動してください。

セットアップは Claude Code、Codex、Cursor、Gemini CLI、Grok Build、および[その他のエージェント](docs/installation.md#supported-agents)に対応しています。プロバイダーの設定と MCP の手動登録については、[インストールとセットアップ](docs/installation.md)を参照してください。

### エージェントに依頼する

```text
Notes アプリの検索機能の仕組みを調べ、根拠を示して、私のプロジェクトにも同様の機能を実装してください。
```

Notes を対象のアプリに置き換え、理解したい機能を指定してください。

### ターミナルを使う

展開済みの JavaScript/Electron アプリのディレクトリ、または ASAR を調べます。

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

結果にはモジュール、インポート、Electron の境界と、それらの根拠が含まれます。パスは対象に合わせて変更してください。Windows では、たとえば `"D:/apps/example"` を指定します。

日常的に使う場合は、`rea` コマンドをインストールできます。

```bash
npm install --global rea-agents
rea --help
```

ネイティブ分析には、先にプロバイダーの設定が必要です。ネイティブ分析のコマンド、プロバイダーの選択、スナップショット、スクリプトでの利用は、[CLI と Evidence のガイド](docs/cli.md)を参照してください。

### REA を更新する

REA は更新が速く、新しいリリースには頻繁にバグ修正が含まれます。インストールしたバージョンを最新に保ってください。

npm でインストールした CLI の場合：

```bash
rea update
```

エージェントの登録とスキルを更新するには、更新処理が表示するセットアップコマンドを実行してください。

`npx` を使っている場合は、次のコマンドでエージェントの設定を更新します。

```bash
npx rea-agents@latest setup
```

設定の変更を確認し、エージェントを再起動してください。単発の CLI 操作では、`npx rea-agents@latest` に続けてコマンドを指定します。

## REA の仕組み

エージェントは MCP 経由で REA を呼び出し、対象を調べて関連するコードを追跡します。REA は調査結果と根拠を返します。エージェントはそれを使って追加の質問をしたり、動作を説明したり、実装を書いてテストしたりします。CLI コマンドも同じワークフローを使います。

![REA の調査フロー：エージェントがローカルの対象について質問し、REA が分析ツールで調査・追跡します。エージェントは返されたコード、参照、未解明の点を使い、説明、実装、テストを行います。](website/public/assets/figures/rea-investigation-flow.svg)

[原寸大の図を開く](website/public/assets/figures/rea-investigation-flow.svg)。

<a id="current-status"></a>

## 分析できる対象

REA には Node.js 22.x（>=22.19）、24.x（>=24.11）、または 26+ と npm が必要です。追加のツールや対応ホストは、対象によって異なります。

| 対象                             | REA が返すもの                                                                         | 要件とガイド                                                                                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ネイティブバイナリ               | 疑似コード、アセンブリ、文字列、シンボル、呼び出し、参照                               | Hopper、Ghidra、または IDA；[ネイティブ分析](https://rea.tools/guides/native/)                                                                     |
| オフライン ELF レイアウト        | セクション、セグメント、元のシンボル／再配置情報、静的解析によるセキュリティ対策の候補 | Linux x64 で利用者が用意する pwntools；[バイナリ診断](docs/binary-diagnostics.md)                                                                  |
| EVM バイトコード                 | ディスパッチセレクター、バイトオフセット、推定された引数と状態変更の可否               | ローカルの生バイト／16 進数の入力ファイル；[オフライン EVM ガイド](docs/evm-bytecode.md)                                                           |
| 記録済みの Linux クラッシュ      | 生の note レコード、記録された全スレッドのレジスター／シグナル、任意のマッピング候補   | 利用者が用意する pwntools；GDB/pwndbg は任意；[記録済みクラッシュ](docs/recorded-crashes.md)                                                       |
| JavaScript / Electron            | モジュール、インポート、ソースマップ、ルート、IPC、ネイティブアドオンの関係            | Node.js と npm；[アプリケーション分析](https://rea.tools/guides/javascript/)                                                                       |
| ウェブサイト                     | ページ構造、スクリプト、ネットワークの観測結果、依頼されたスクリーンショット           | Chrome 系ブラウザー；[ブラウザー分析](https://rea.tools/guides/browser/)                                                                           |
| 保存済みのネットワークキャプチャ | リクエスト、レスポンス、取得可能なペイロード、ソース内の位置                           | HAR；mitmproxy ネイティブ形式のキャプチャには Linux 上の mitmdump；[キャプチャガイド](docs/web-network-captures.md)                                |
| .NET アセンブリ                  | メタデータ、CIL 命令、宣言されたネイティブ依存関係、ビルドの比較                       | 静的な検査；[マネージドコードのガイド](docs/managed-code-analysis.md)                                                                              |
| Android APK                      | マニフェストの宣言、クラス、逆コンパイルされたメソッド、参照                           | Linux/macOS 上のヘッドレス JADX と完全な JDK；[Android ガイド](docs/android-analysis.md)                                                           |
| ファームウェア                   | 領域、抽出結果、ネイティブ分析への引き継ぎ                                             | Linux 上の Binwalk / Unblob；[ファームウェアガイド](docs/firmware-analysis.md)                                                                     |
| パッケージとリソース             | ファイル一覧、ダイジェスト、plist、Apple バンドルの構造、抽出されたリソース            | [アーティファクトと JavaScript のガイド](docs/javascript-artifact-reconstruction.md)、[Apple アプリケーション](docs/apple-application-analysis.md) |
| プロセスの動作                   | ターミナル出力、対話、終了とファイルシステムの観測結果、実行の比較                     | ネイティブ PTY を備えた Linux/macOS；[プロセスキャプチャ](docs/process-capture.md)                                                                 |

[Unity ゲームの復元](docs/game-reversing.md): メタデータ・GUID、シーン、C# スタブ候補をローカルで検査します。このフォークをビルドすると利用できます。

静的な JavaScript と .NET の検査は、指定されたファイルを読み取り、アプリケーションを実行しません。実行時キャプチャは、あなたのユーザー権限で対象を実行したり、対象とやり取りしたりします。それぞれの実行時ガイドに、どのような操作が行われるかを記載しています。

<a id="choosing-a-deep-analysis-provider"></a>

対応するネイティブ形式とホストは、プロバイダーによって異なります。[Hopper と Ghidra のセットアップ](docs/installation.md#hopper)、[IDA ガイド](docs/ida-provider.md)、[Windows 向け Ghidra の実験的対応](docs/windows-ghidra-p0.md)を参照してください。Ghidra は [16 ビット DOS 分析](docs/ghidra-dos.md)にも対応しています。プロバイダーの選択は [CLI ガイド](docs/cli.md#choose-a-provider)を参照してください。最新の npm リリース以降に追加された機能については、[リリースでの利用可否](docs/installation.md#released-package-and-main)を確認してください。

## 事例

### DX-Ball：音声のパン計算を再構築する

音声の呼び出しから位置をパンに変換する補助関数をたどり、命令を調べ、不完全な疑似コードを C に書き直します。再構築した実装は、元の x86 に対する 3,205 ケースの検証を通過し、コンパイル後の関数の全 63 バイトを再現しています。

[事例を読む](https://rea.tools/showcase/dx-ball/) ·
[再構築リポジトリ](https://github.com/N0zoM1z0/dx-ball)

### Notion：Electron のクリップボードブリッジを追跡する

レンダラーのクリップボード API を見つけ、preload と IPC を経由してメインプロセスまでたどり、リッチなクリップボード形式を調べます。

[事例を読む](https://rea.tools/showcase/notion/)

### TH04：DOS の弾幕リングの計算を復元する

元の PC-98 ゲームの 16 ビット命令を調べ、固定角度と自機を狙う角度の計算を復元し、再構築した C++ を当時のコンパイラーの出力と比較します。

[事例を読む](https://rea.tools/showcase/th04/) ·
[再構築リポジトリ](https://github.com/N0zoM1z0/th04)

REA で興味深い対象を調べたら、ぜひ共有してください。[issue](https://github.com/morluto/rea/issues) または [pull request](https://github.com/morluto/rea/pulls) に、対象、調べたかったこと、REA がどう役立ったか、何が分かったかを記載してください。

## よくある質問

<details>
<summary><strong>どのエージェントで REA を使えますか？</strong></summary>

ローカル MCP サーバーに対応するエージェントなら使えます。セットアップは[対応エージェント](docs/installation.md#supported-agents)を設定します。その他のクライアントでは、[MCP の手動登録](docs/installation.md#mcp-registry)を利用できます。

</details>

<details>
<summary><strong>Hopper、Ghidra、IDA は必要ですか？</strong></summary>

深いネイティブ分析には、そのいずれかを使います。静的な JavaScript と .NET の検査には、ネイティブ分析エンジンは必要ありません。セットアップは承認後に Hopper をインストールできます。Ghidra と IDA は既存のインストールを使います。[プロバイダーのセットアップ](docs/installation.md#hopper)を参照してください。

</details>

<details>
<summary><strong>先に Hopper を起動する必要はありますか？</strong></summary>

REA は必要な操作の際に Hopper を起動します。macOS では、初回起動時にデモモードを選ぶか、ライセンスを有効化するよう求められることがあります。[Hopper の起動とトラブルシューティング](docs/installation.md#launcher-paths-and-troubleshooting)を参照してください。

</details>

<details>
<summary><strong>skills.sh からスキルをインストールすると何ができますか？</strong></summary>

スキルはエージェントに調査の手順を提供します。`rea setup` で REA の MCP サーバーを登録し、対応する手順をインストールしてから、エージェントを再起動してください。[スキルのみのインストール](docs/installation.md#skill-only-installation)を参照してください。

</details>

<details>
<summary><strong>REA はどのようなコードを返しますか？</strong></summary>

ネイティブ分析は疑似コードとアセンブリを返します。JavaScript/Electron 分析はモジュールとその関係を復元します。エージェントはその結果を使って実装を書き、テストします。[事例](#事例)に具体的な手順があります。

</details>

<details>
<summary><strong>REA はアプリをアップロードしますか？</strong></summary>

REA は対象をローカルで分析します。エージェントはツールの結果を受け取り、そのモデルプロバイダーには独自のデータポリシーがあります。

</details>

<details>
<summary><strong>バグに遭遇したらどうすればよいですか？</strong></summary>

まず更新してください。最近のリリースですでに修正されている可能性があります。

npm でインストールした CLI の場合：

```bash
rea update
```

`npx` でエージェントを設定している場合：

```bash
npx rea-agents@latest setup
```

エージェントを使っている場合は、[設定の更新](#rea-を更新する)を完了し、再起動してください。同じタスクをもう一度試し、問題が続く場合は [issue を作成](https://github.com/morluto/rea/issues)して、REA のバージョン、対象の種類、再現手順、エラー出力を記載してください。

</details>

## ドキュメント

まずはウェブサイトの[実践ガイド](https://rea.tools/guides/)を参照してください。正確なオプション、前提条件、結果の契約については、以下を参照してください。

- [インストールとセットアップ](docs/installation.md)：エージェントの登録、プロバイダーの設定、更新、アンインストール。
- [準備状況の確認とトラブルシューティング](docs/installation.md#check-readiness-for-your-task)：特定のエージェントや分析エンジンを診断。
- [CLI と Evidence](docs/cli.md)：コマンド、プロバイダーの選択、スナップショット、インポート／エクスポート、終了ステータス。
- [MCP 契約](docs/mcp-contracts.md)と[エージェント向けプロンプト](docs/mcp-prompts.md)：ツールの結果、セッション、ガイド付き調査。
- [ツールカタログ](docs/mcp-contracts.md#generated-catalog)：ビルド時に生成されるツール、プロバイダー、CLI コマンドの一覧。
- [ロードマップ](docs/roadmap.md)：計画中の作業と機能の進捗。

脆弱性の報告は [SECURITY.md](SECURITY.md) に従ってください。

## 貢献する

REA への貢献を歓迎します！[issue を作成](https://github.com/morluto/rea/issues)してバグや機能の提案を報告したり、[pull request を送信](https://github.com/morluto/rea/pulls)してコードやドキュメントを改善したりできます。

開発環境とチェックは [CONTRIBUTING.md](CONTRIBUTING.md)、検証レーンは[テストガイド](docs/testing.md)、プロジェクト構造は[アーキテクチャ図](docs/architecture.mermaid)を参照してください。

## プロジェクトリンク

[ウェブサイト](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [セキュリティ](SECURITY.md)

## スター履歴

🎉 **GitHub スター 20,000 件、ありがとうございます！**

REA の利用、バグ報告、ビルドのテスト、修正への貢献に感謝します。

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="REA の GitHub スター履歴" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## 免責事項

REA は、合法的なリバースエンジニアリングの研究、分析、再構築のためのツールを提供します。必要な許可を得て、適用される法律に従う責任は利用者にあります。このプロジェクトは違法または無許可の利用を支持しません。

## ライセンス

[MIT](LICENSE)
