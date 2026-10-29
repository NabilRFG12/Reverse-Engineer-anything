<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · **Português (Brasil)** · [العربية](README_ar.md)

# REA: Faça engenharia reversa de qualquer coisa

### Um único MCP para engenharia reversa de binários, aplicativos e comportamento em execução.

**Viu uma funcionalidade de que gostou? Entenda como ela funciona, até o nível binário.**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[Site](https://rea.tools/) · [Guias](https://rea.tools/guides/) · [Casos de uso](https://rea.tools/showcase/)**

[Início rápido](#início-rápido) · [Como o REA funciona](#como-o-rea-funciona) · [O que você pode analisar](#o-que-você-pode-analisar) · [Casos de uso](#casos-de-uso) · [Perguntas frequentes](#perguntas-frequentes) · [Documentação](#documentação)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA inicia sua ponte de análise dentro do Hopper enquanto inspeciona um binário nativo" width="1200" />

<br />

<table aria-label="Comunidade REA">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>Participe da comunidade de engenharia reversa</strong>
  </a><br />
  <sub>Discord · Perguntas e respostas · Compartilhe seus resultados</sub>
</td>
</tr>
</table>

<br />

</div>

---

Viu uma funcionalidade em um aplicativo que gostaria de ter no seu próprio produto? Peça ao seu agente para investigá-la com o REA. Ele pode inspecionar o aplicativo sem o código-fonte, explicar como a funcionalidade funciona, apresentar as evidências e criar uma versão para o seu projeto.

O REA conecta seu agente a ferramentas para inspecionar binários nativos, aplicativos JavaScript e Electron, assemblies .NET e sites. Você também pode usar as mesmas ferramentas pelo terminal. A análise acontece localmente, e os resultados incluem as evidências e limitações por trás de cada conclusão.

A configuração registra o REA no seu agente e instala as instruções de fluxo de trabalho correspondentes. A análise nativa pode usar uma instalação existente do Hopper ou do Ghidra; a configuração também pode instalar o Hopper opcionalmente, mediante aprovação. A análise estática de JavaScript não precisa de nenhum dos dois motores.

> **[Visite o site do REA](https://rea.tools/)** para instruções de configuração, guias ilustrados e estudos de caso reais.

## Início rápido

### Configure seu agente

Com Node.js e npm instalados, execute:

```bash
npx rea-agents setup
```

Escolha seus agentes, revise as alterações propostas e aprove-as. A configuração adiciona o servidor MCP do REA e as instruções de fluxo de trabalho correspondentes, com backups das configurações existentes. Reinicie seu agente depois.

A configuração oferece suporte ao Claude Code, Codex, Cursor, Gemini CLI, Grok Build e [outros agentes](docs/installation.md#supported-agents). Consulte [instalação e configuração](docs/installation.md) para configurar provedores e registrar o MCP manualmente.

### Peça ao seu agente

```text
Investigue como a busca funciona no aplicativo Notes, mostre as evidências e crie uma funcionalidade semelhante para o meu projeto.
```

Substitua Notes pelo aplicativo alvo e indique a funcionalidade que deseja entender.

### Use o terminal

Inspecione um diretório extraído de um aplicativo JavaScript/Electron ou um arquivo ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

O resultado inclui módulos, importações, limites do Electron e suas evidências. Substitua o caminho pelo do seu alvo, como `"D:/apps/example"` no Windows.

Para instalar o comando `rea` e usá-lo regularmente:

```bash
npm install --global rea-agents
rea --help
```

Para análise nativa, configure primeiro um provedor. Consulte o [guia de CLI e Evidence](docs/cli.md) para comandos nativos, seleção de provedores, snapshots e uso em scripts.

### Atualize o REA

O REA muda rapidamente, e novas versões incluem correções frequentes de bugs. Mantenha sua instalação atualizada.

Para uma CLI instalada pelo npm:

```bash
rea update
```

Para atualizar os registros dos agentes e a skill, execute o comando de configuração exibido pela atualização.

Se você usa `npx`, atualize a configuração do agente com:

```bash
npx rea-agents@latest setup
```

Revise as alterações de configuração e reinicie seu agente. Para comandos avulsos da CLI, use `npx rea-agents@latest` seguido do comando.

## Como o REA funciona

Seu agente chama o REA por MCP para inspecionar o alvo e rastrear o código relevante. O REA retorna os resultados com suas evidências. O agente usa esses resultados para fazer novas perguntas, explicar o comportamento ou escrever e testar uma implementação. Os comandos da CLI usam os mesmos fluxos de trabalho.

![Fluxo de investigação do REA: seu agente pergunta sobre um alvo local, o REA o inspeciona e rastreia com ferramentas de análise, e o agente usa o código, as referências e os pontos desconhecidos retornados para explicar, implementar e testar.](website/public/assets/figures/rea-investigation-flow.svg)

[Abra a figura em tamanho completo](website/public/assets/figures/rea-investigation-flow.svg).

<a id="current-status"></a>

## O que você pode analisar

O REA requer Node.js 22.x (>=22.19), 24.x (>=24.11) ou 26+, além do npm. As ferramentas adicionais e os sistemas anfitriões compatíveis dependem do alvo:

| Alvo                        | O que o REA retorna                                                                                                     | Requisitos e guia                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Binários nativos            | Pseudocódigo, assembly, strings, símbolos, chamadas e referências                                                       | Hopper, Ghidra ou IDA; [análise nativa](https://rea.tools/guides/native/)                                                             |
| Estrutura ELF sem execução  | Seções, segmentos, símbolos/relocações originais e possíveis mecanismos de mitigação identificados por análise estática | pwntools fornecido pelo chamador no Linux x64; [diagnóstico de binários](docs/binary-diagnostics.md)                                  |
| Bytecode EVM                | Seletores de despacho, offsets de bytes, argumentos inferidos e mutabilidade                                            | Entrada local com bytes brutos ou representação hexadecimal; [guia de EVM sem execução](docs/evm-bytecode.md)                         |
| Falhas do Linux registradas | Registros note brutos, registradores/sinais de cada thread registrada e candidatos opcionais a mapeamentos              | pwntools fornecido pelo chamador; GDB/pwndbg opcionais; [falhas registradas](docs/recorded-crashes.md)                                |
| JavaScript / Electron       | Módulos, importações, source maps, rotas, IPC e relações com complementos nativos                                       | Node.js e npm; [análise de aplicativos](https://rea.tools/guides/javascript/)                                                         |
| Sites                       | Estrutura da página, scripts, observações de rede e capturas de tela solicitadas                                        | Um navegador da família Chrome; [análise do navegador](https://rea.tools/guides/browser/)                                             |
| Capturas de rede salvas     | Requisições, respostas, payloads acessíveis e localizações de origem                                                    | HAR; mitmdump no Linux para capturas no formato nativo do mitmproxy; [guia de capturas](docs/web-network-captures.md)                 |
| Assemblies .NET             | Metadados, instruções CIL, dependências nativas declaradas e comparações de builds                                      | Inspeção estática; [guia de código gerenciado](docs/managed-code-analysis.md)                                                         |
| APKs Android                | Declarações do manifesto, classes, métodos descompilados e referências                                                  | JADX sem interface gráfica e um JDK completo no Linux/macOS; [guia de Android](docs/android-analysis.md)                              |
| Firmware                    | Regiões, resultados de extração e encaminhamentos à análise nativa                                                      | Binwalk / Unblob no Linux; [guia de firmware](docs/firmware-analysis.md)                                                              |
| Pacotes e recursos          | Inventários de arquivos, digests, plists, estrutura de bundles Apple e recursos extraídos                               | [Guia de artefatos e JavaScript](docs/javascript-artifact-reconstruction.md), [aplicativos Apple](docs/apple-application-analysis.md) |
| Comportamento de processos  | Saída do terminal, interações, observações de encerramento e do sistema de arquivos, e comparações entre execuções      | Linux/macOS com PTY nativo; [captura de processos](docs/process-capture.md)                                                           |

[Recuperação de jogos Unity](docs/game-reversing.md): inspeção local de metadados/GUID, cenas e possíveis stubs C#; disponível neste fork após compilar.

A inspeção estática de JavaScript e .NET lê os arquivos fornecidos sem executar o aplicativo. A captura em execução inicia o alvo selecionado ou interage com ele usando as permissões do seu usuário; cada guia descreve seus efeitos.

<a id="choosing-a-deep-analysis-provider"></a>

Os formatos nativos e os sistemas anfitriões compatíveis variam por provedor. Consulte [configuração do Hopper e Ghidra](docs/installation.md#hopper), o [guia do IDA](docs/ida-provider.md) e o [suporte experimental ao Ghidra no Windows](docs/windows-ghidra-p0.md). O Ghidra também oferece [análise de DOS de 16 bits](docs/ghidra-dos.md). Para selecionar um provedor, consulte o [guia da CLI](docs/cli.md#choose-a-provider). Verifique a [disponibilidade nas versões](docs/installation.md#released-package-and-main) das funcionalidades adicionadas após a versão mais recente no npm.

## Casos de uso

### DX-Ball: reconstruir um cálculo de panorâmica de áudio

Siga uma chamada de áudio até a função auxiliar que converte posição em panorâmica, inspecione as instruções e transforme pseudocódigo incompleto em C. A reconstrução passa em 3.205 casos com o x86 original e reproduz todos os 63 bytes da função compilada.

[Leia o estudo de caso](https://rea.tools/showcase/dx-ball/) · [Repositório da reconstrução](https://github.com/N0zoM1z0/dx-ball)

### Notion: rastrear a ponte da área de transferência do Electron

Encontre a API da área de transferência do renderizador, siga-a por preload e IPC até o processo principal e inspecione o formato da área de transferência com seus dados de formatação.

[Leia o estudo de caso](https://rea.tools/showcase/notion/)

### TH04: recuperar o cálculo de um anel de projéteis no DOS

Inspecione as instruções de 16 bits do jogo original para PC-98, recupere os cálculos de ângulos fixos e direcionados e compare o C++ reconstruído com a saída do compilador da época.

[Leia o estudo de caso](https://rea.tools/showcase/th04/) · [Repositório da reconstrução](https://github.com/N0zoM1z0/th04)

Se você usou o REA em algo interessante, gostaríamos de conhecer. Compartilhe seu caso em uma [issue](https://github.com/morluto/rea/issues) ou um [pull request](https://github.com/morluto/rea/pulls), incluindo o alvo, sua pergunta, como o REA ajudou e o que descobriu.

## Perguntas frequentes

<details>
<summary><strong>Quais agentes podem usar o REA?</strong></summary>

Qualquer agente que ofereça suporte a servidores MCP locais. A configuração prepara os [agentes compatíveis](docs/installation.md#supported-agents); outros clientes podem usar o [registro manual do MCP](docs/installation.md#mcp-registry).

</details>

<details>
<summary><strong>Preciso do Hopper, Ghidra ou IDA?</strong></summary>

A análise nativa aprofundada usa um desses motores. A inspeção estática de JavaScript e .NET funciona sem um motor de análise nativa. A configuração pode instalar o Hopper após aprovação; Ghidra e IDA usam as instalações existentes. Consulte [configuração dos provedores](docs/installation.md#hopper).

</details>

<details>
<summary><strong>Preciso iniciar o Hopper antes?</strong></summary>

O REA inicia o Hopper quando uma operação precisa dele. No macOS, um diálogo na primeira execução pode pedir que você escolha o modo de demonstração ou ative a licença. Consulte [inicialização do Hopper e solução de problemas](docs/installation.md#launcher-paths-and-troubleshooting).

</details>

<details>
<summary><strong>O que faz a instalação da skill pelo skills.sh?</strong></summary>

A skill fornece instruções de investigação ao seu agente. Use `rea setup` para registrar o servidor MCP do REA e instalar as instruções correspondentes, depois reinicie seu agente. Consulte [instalação apenas da skill](docs/installation.md#skill-only-installation).

</details>

<details>
<summary><strong>Que código o REA retorna?</strong></summary>

A análise nativa retorna pseudocódigo e assembly. A análise de JavaScript/Electron recupera módulos e suas relações. Seu agente usa esses resultados para escrever e testar uma implementação; os [casos de uso](#casos-de-uso) apresentam exemplos completos.

</details>

<details>
<summary><strong>O REA envia meu aplicativo para algum servidor?</strong></summary>

O REA analisa os alvos localmente. Seu agente recebe os resultados das ferramentas, e o provedor do modelo tem sua própria política de dados.

</details>

<details>
<summary><strong>O que devo fazer se encontrar um bug?</strong></summary>

Atualize primeiro; uma versão recente pode já ter corrigido o problema.

Para uma CLI instalada pelo npm:

```bash
rea update
```

Para configurar o agente por `npx`:

```bash
npx rea-agents@latest setup
```

Se você usa um agente, conclua a [atualização da configuração](#atualize-o-rea) e reinicie-o. Tente executar a mesma tarefa novamente. Se o problema persistir, [abra uma issue](https://github.com/morluto/rea/issues) com sua versão do REA, o tipo de alvo, os passos para reproduzir e a saída do erro.

</details>

## Documentação

Comece pelos [guias práticos](https://rea.tools/guides/) do site. Para opções exatas, pré-requisitos e contratos dos resultados:

- [Instalação e configuração](docs/installation.md): registro de agentes, configuração de provedores, atualizações e desinstalação.
- [Prontidão e solução de problemas](docs/installation.md#check-readiness-for-your-task): diagnóstico de um agente ou motor de análise específico.
- [CLI e Evidence](docs/cli.md): comandos, seleção de provedores, snapshots, importação/exportação e status de saída.
- [Contratos MCP](docs/mcp-contracts.md) e [prompts para agentes](docs/mcp-prompts.md): resultados das ferramentas, sessões e investigações guiadas.
- [Catálogo de ferramentas](docs/mcp-contracts.md#generated-catalog): inventário de ferramentas, provedores e comandos da CLI gerado durante o build.
- [Roadmap](docs/roadmap.md): trabalho planejado e acompanhamento das capacidades.

Relate vulnerabilidades conforme [SECURITY.md](SECURITY.md).

## Contribuir

Sua ajuda com o REA é bem-vinda! [Abra uma issue](https://github.com/morluto/rea/issues) para relatar um bug ou sugerir uma funcionalidade, ou [envie um pull request](https://github.com/morluto/rea/pulls) para melhorar o código ou a documentação.

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para configurar o ambiente de desenvolvimento e as verificações, o [guia de testes](docs/testing.md) para os fluxos de verificação e o [mapa da arquitetura](docs/architecture.mermaid) para a estrutura do projeto.

## Links do projeto

[Site](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [Segurança](SECURITY.md)

## Histórico de estrelas

🎉 **20.000 estrelas no GitHub — muito obrigado!**

Obrigado a todos que usam o REA, relatam bugs, testam builds e contribuem com correções.

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="Histórico de estrelas do REA no GitHub" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## Aviso legal

O REA fornece ferramentas para pesquisa, análise e reconstrução por engenharia reversa dentro da lei. Você é responsável por obter as autorizações necessárias e cumprir as leis aplicáveis. O projeto não apoia usos ilegais ou não autorizados.

## Licença

[MIT](LICENSE)
