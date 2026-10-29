<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · **Tiếng Việt** · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md)

# REA: Kỹ thuật dịch ngược cho mọi thứ

### Một MCP để dịch ngược tệp nhị phân, ứng dụng và hành vi khi chạy.

**Thấy một tính năng bạn thích? Hiểu cách nó hoạt động, đến tận mức mã nhị phân.**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[Trang web](https://rea.tools/) · [Hướng dẫn](https://rea.tools/guides/) · [Các nghiên cứu điển hình](https://rea.tools/showcase/)**

[Bắt đầu nhanh](#bắt-đầu-nhanh) · [Cách REA hoạt động](#cách-rea-hoạt-động) · [Những gì bạn có thể phân tích](#những-gì-bạn-có-thể-phân-tích) · [Các nghiên cứu điển hình](#các-nghiên-cứu-điển-hình) · [Câu hỏi thường gặp](#câu-hỏi-thường-gặp) · [Tài liệu](#tài-liệu)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA khởi chạy cầu nối phân tích bên trong Hopper khi kiểm tra tệp nhị phân mã máy" width="1200" />

<br />

<table aria-label="Cộng đồng REA">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>Tham gia cộng đồng kỹ thuật dịch ngược</strong>
  </a><br />
  <sub>Discord · Hỏi đáp · Chia sẻ kết quả</sub>
</td>
</tr>
</table>

<br />

</div>

> **Fork Reverse-game:** nhánh này bổ sung công cụ phục vụ reverse game Unity.
> Sau khi build, chạy `node scripts/rea.mjs inspect-game-project /duong/dan/project --json`
> để kiểm tra metadata asset, scene và các hàm C# có dấu hiệu stub. Hướng dẫn reverse
> game bên dưới mô tả cách phục hồi logic native sang C# và phạm vi cần kiểm chứng.

---

Bạn thấy một tính năng trong ứng dụng và muốn đưa nó vào sản phẩm của mình? Hãy nhờ tác nhân của bạn điều tra bằng REA. Tác nhân có thể kiểm tra ứng dụng mà không cần mã nguồn, giải thích cách tính năng hoạt động, đưa ra bằng chứng và xây dựng một phiên bản cho dự án của bạn.

REA kết nối tác nhân của bạn với các công cụ kiểm tra tệp nhị phân mã máy, ứng dụng JavaScript và Electron, assembly .NET và trang web. Bạn cũng có thể dùng các công cụ đó từ terminal. Việc phân tích chạy cục bộ; kết quả bao gồm bằng chứng và giới hạn làm cơ sở cho từng kết luận.

Quá trình thiết lập đăng ký REA với tác nhân và cài đặt các hướng dẫn quy trình tương ứng. Phân tích mã máy có thể sử dụng Hopper hoặc Ghidra đã cài sẵn; quá trình thiết lập cũng có thể cài Hopper nếu bạn chấp thuận. Phân tích tĩnh JavaScript không cần công cụ nào trong hai công cụ này.

> **[Truy cập trang web REA](https://rea.tools/)** để xem cách thiết lập, hướng dẫn có hình minh họa và các nghiên cứu điển hình thực tế.

## Bắt đầu nhanh

### Thiết lập tác nhân

Sau khi cài Node.js và npm, chạy:

```bash
npx rea-agents setup
```

Chọn các tác nhân, xem lại những thay đổi được đề xuất và chấp thuận. Quá trình thiết lập thêm máy chủ MCP của REA cùng hướng dẫn quy trình tương ứng, đồng thời sao lưu cấu hình hiện có. Sau đó khởi động lại tác nhân.

Quá trình thiết lập hỗ trợ Claude Code, Codex, Cursor, Gemini CLI, Grok Build và [các tác nhân khác](docs/installation.md#supported-agents). Xem [cài đặt và thiết lập](docs/installation.md) để cấu hình trình phân tích và đăng ký MCP thủ công.

### Hỏi tác nhân

```text
Tìm hiểu cách tính năng tìm kiếm trong ứng dụng Notes hoạt động, cho tôi xem bằng chứng và xây dựng tính năng tương tự cho dự án của tôi.
```

Thay Notes bằng ứng dụng mục tiêu và chỉ rõ tính năng bạn muốn hiểu.

### Sử dụng terminal

Kiểm tra thư mục ứng dụng JavaScript/Electron đã giải nén hoặc tệp ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

Kết quả bao gồm mô-đun, các khai báo import, ranh giới Electron và bằng chứng tương ứng. Thay đường dẫn bằng mục tiêu của bạn, chẳng hạn `"D:/apps/example"` trên Windows.

Để cài lệnh `rea` cho việc sử dụng thường xuyên:

```bash
npm install --global rea-agents
rea --help
```

Để phân tích mã máy, trước tiên hãy cấu hình trình phân tích. Xem [hướng dẫn CLI và Evidence](docs/cli.md) về các lệnh phân tích mã máy, lựa chọn trình phân tích, ảnh chụp trạng thái và sử dụng trong script.

### Cập nhật REA

REA thay đổi nhanh và các bản phát hành mới thường xuyên có bản sửa lỗi. Hãy giữ bản cài đặt của bạn được cập nhật.

Với CLI được cài bằng npm:

```bash
rea update
```

Để cập nhật đăng ký tác nhân và skill, chạy lệnh thiết lập được in ra sau khi cập nhật.

Nếu dùng `npx`, cập nhật thiết lập tác nhân bằng:

```bash
npx rea-agents@latest setup
```

Xem lại thay đổi cấu hình và khởi động lại tác nhân. Với lệnh CLI dùng một lần, dùng `npx rea-agents@latest` rồi thêm lệnh cần chạy.

## Cách REA hoạt động

Tác nhân gọi REA qua MCP để kiểm tra mục tiêu và lần theo mã liên quan. REA trả về các phát hiện kèm bằng chứng. Tác nhân dùng chúng để đặt câu hỏi tiếp theo, giải thích hành vi hoặc viết và kiểm thử một cách triển khai. Các lệnh CLI sử dụng cùng quy trình.

![Quy trình điều tra của REA: tác nhân hỏi về mục tiêu cục bộ, REA kiểm tra và lần theo mục tiêu bằng công cụ phân tích, rồi tác nhân dùng mã, tham chiếu và những điểm chưa biết được trả về để giải thích, triển khai và kiểm thử.](website/public/assets/figures/rea-investigation-flow.svg)

[Mở hình ở kích thước đầy đủ](website/public/assets/figures/rea-investigation-flow.svg).

<a id="current-status"></a>

## Những gì bạn có thể phân tích

REA yêu cầu Node.js 22.x (>=22.19), 24.x (>=24.11) hoặc 26+, cùng với npm. Công cụ bổ sung và nền tảng chạy REA được hỗ trợ tùy thuộc vào mục tiêu:

| Mục tiêu                      | REA trả về gì                                                                                                   | Yêu cầu và hướng dẫn                                                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Tệp nhị phân mã máy           | Mã giả, hợp ngữ, chuỗi, ký hiệu, lời gọi và tham chiếu                                                          | Hopper, Ghidra hoặc IDA; [phân tích mã máy](https://rea.tools/guides/native/)                                                                 |
| Bố cục ELF ngoại tuyến        | Các section, segment, ký hiệu/thông tin tái định vị gốc và các biện pháp giảm thiểu có thể có từ phân tích tĩnh | pwntools do bên gọi cung cấp trên Linux x64; [chẩn đoán tệp nhị phân](docs/binary-diagnostics.md)                                             |
| Bytecode EVM                  | Bộ chọn điều phối, độ lệch byte, tham số suy luận và khả năng thay đổi trạng thái                               | Đầu vào cục bộ chứa byte thô hoặc dạng thập lục phân; [hướng dẫn EVM ngoại tuyến](docs/evm-bytecode.md)                                       |
| Sự cố Linux đã ghi lại        | Bản ghi note thô, thanh ghi/tín hiệu của mọi luồng được ghi lại và các ứng viên ánh xạ tùy chọn                 | pwntools do bên gọi cung cấp; GDB/pwndbg tùy chọn; [sự cố đã ghi lại](docs/recorded-crashes.md)                                               |
| JavaScript / Electron         | Mô-đun, các khai báo import, source map, tuyến, IPC và quan hệ với tiện ích mở rộng mã máy                      | Node.js và npm; [phân tích ứng dụng](https://rea.tools/guides/javascript/)                                                                    |
| Trang web                     | Cấu trúc trang, script, quan sát mạng và ảnh chụp màn hình được yêu cầu                                         | Trình duyệt thuộc họ Chrome; [phân tích trình duyệt](https://rea.tools/guides/browser/)                                                       |
| Bản ghi lưu lượng mạng đã lưu | Yêu cầu, phản hồi, payload có thể truy cập và vị trí nguồn                                                      | HAR; mitmdump trên Linux cho bản ghi định dạng gốc của mitmproxy; [hướng dẫn bản ghi mạng](docs/web-network-captures.md)                      |
| Assembly .NET                 | Siêu dữ liệu, lệnh CIL, các phụ thuộc mã máy được khai báo và so sánh bản dựng                                  | Kiểm tra tĩnh; [hướng dẫn mã được quản lý](docs/managed-code-analysis.md)                                                                     |
| APK Android                   | Khai báo manifest, lớp, phương thức được dịch ngược và tham chiếu                                               | JADX không giao diện đồ họa và JDK đầy đủ trên Linux/macOS; [hướng dẫn Android](docs/android-analysis.md)                                     |
| Phần sụn                      | Các vùng, kết quả trích xuất và dữ liệu chuyển sang phân tích mã máy                                            | Binwalk / Unblob trên Linux; [hướng dẫn phần sụn](docs/firmware-analysis.md)                                                                  |
| Gói và tài nguyên             | Danh sách tệp, giá trị băm, plist, cấu trúc bundle Apple và tài nguyên được trích xuất                          | [Hướng dẫn hiện vật phần mềm và JavaScript](docs/javascript-artifact-reconstruction.md), [ứng dụng Apple](docs/apple-application-analysis.md) |
| Hành vi tiến trình            | Đầu ra terminal, tương tác, quan sát khi thoát và hệ thống tệp, cùng so sánh các lần chạy                       | Linux/macOS có PTY gốc; [ghi lại tiến trình](docs/process-capture.md)                                                                         |

[Reverse game Unity](docs/game-reversing.md): kiểm tra cục bộ .meta/GUID, scene và các hàm C# có dấu hiệu stub; khả dụng sau khi build fork này.

Kiểm tra tĩnh JavaScript và .NET đọc các tệp được cung cấp mà không chạy ứng dụng. Ghi lại khi chạy sẽ khởi chạy hoặc tương tác với mục tiêu đã chọn bằng quyền người dùng của bạn; từng hướng dẫn mô tả tác động của nó.

<a id="choosing-a-deep-analysis-provider"></a>

Định dạng mã máy và nền tảng chạy REA được hỗ trợ khác nhau tùy trình phân tích. Xem [thiết lập Hopper và Ghidra](docs/installation.md#hopper), [hướng dẫn IDA](docs/ida-provider.md) và [hỗ trợ Ghidra thử nghiệm trên Windows](docs/windows-ghidra-p0.md). Ghidra cũng hỗ trợ [phân tích DOS 16 bit](docs/ghidra-dos.md). Để chọn trình phân tích, xem [hướng dẫn CLI](docs/cli.md#choose-a-provider). Kiểm tra [khả năng sử dụng theo bản phát hành](docs/installation.md#released-package-and-main) đối với tính năng được bổ sung sau phiên bản npm mới nhất.

## Các nghiên cứu điển hình

### DX-Ball: tái tạo phép tính phân bố âm thanh trái phải

Lần theo lời gọi âm thanh đến hàm hỗ trợ chuyển vị trí thành giá trị phân bố âm thanh, kiểm tra các lệnh và chuyển mã giả chưa đầy đủ sang C. Bản tái tạo vượt qua 3.205 trường hợp kiểm thử với x86 gốc và tái tạo đủ 63 byte của hàm đã biên dịch.

[Đọc nghiên cứu điển hình](https://rea.tools/showcase/dx-ball/) · [Kho mã tái tạo](https://github.com/N0zoM1z0/dx-ball)

### Notion: lần theo cầu nối clipboard của Electron

Tìm API clipboard trong tiến trình kết xuất, lần theo qua preload và IPC đến tiến trình chính, rồi kiểm tra định dạng clipboard có dữ liệu định dạng phong phú.

[Đọc nghiên cứu điển hình](https://rea.tools/showcase/notion/)

### TH04: khôi phục phép tính vòng đạn trong DOS

Kiểm tra các lệnh 16 bit của trò chơi PC-98 gốc, khôi phục phép tính góc cố định và góc nhắm mục tiêu, rồi so sánh C++ được tái tạo với đầu ra của trình biên dịch thời đó.

[Đọc nghiên cứu điển hình](https://rea.tools/showcase/th04/) · [Kho mã tái tạo](https://github.com/N0zoM1z0/th04)

Nếu bạn dùng REA cho một mục tiêu thú vị, chúng tôi muốn biết. Chia sẻ trường hợp của bạn qua [issue](https://github.com/morluto/rea/issues) hoặc [pull request](https://github.com/morluto/rea/pulls), nêu mục tiêu, câu hỏi, cách REA giúp bạn và những gì tìm được.

## Câu hỏi thường gặp

<details>
<summary><strong>Tác nhân nào có thể dùng REA?</strong></summary>

Bất kỳ tác nhân nào hỗ trợ máy chủ MCP cục bộ. Quá trình thiết lập cấu hình các [tác nhân được hỗ trợ](docs/installation.md#supported-agents); ứng dụng khách khác có thể dùng [đăng ký MCP thủ công](docs/installation.md#mcp-registry).

</details>

<details>
<summary><strong>Tôi có cần Hopper, Ghidra hoặc IDA không?</strong></summary>

Phân tích mã máy chuyên sâu sử dụng một trong những công cụ đó. Kiểm tra tĩnh JavaScript và .NET hoạt động mà không cần bộ máy phân tích mã máy. Quá trình thiết lập có thể cài Hopper sau khi được chấp thuận; Ghidra và IDA dùng bản cài đặt sẵn có. Xem [thiết lập trình phân tích](docs/installation.md#hopper).

</details>

<details>
<summary><strong>Tôi có cần khởi chạy Hopper trước không?</strong></summary>

REA khởi chạy Hopper khi một thao tác cần đến nó. Trên macOS, hộp thoại lần chạy đầu có thể yêu cầu chọn chế độ dùng thử hoặc kích hoạt giấy phép. Xem [khởi động Hopper và khắc phục sự cố](docs/installation.md#launcher-paths-and-troubleshooting).

</details>

<details>
<summary><strong>Cài skill từ skills.sh có tác dụng gì?</strong></summary>

Skill cung cấp hướng dẫn điều tra cho tác nhân. Dùng `rea setup` để đăng ký máy chủ MCP của REA và cài hướng dẫn tương ứng, sau đó khởi động lại tác nhân. Xem [chỉ cài skill](docs/installation.md#skill-only-installation).

</details>

<details>
<summary><strong>REA trả về mã gì?</strong></summary>

Phân tích mã máy trả về mã giả và hợp ngữ. Phân tích JavaScript/Electron khôi phục mô-đun cùng quan hệ giữa chúng. Tác nhân dùng các phát hiện này để viết và kiểm thử cách triển khai; các [nghiên cứu điển hình](#các-nghiên-cứu-điển-hình) cung cấp ví dụ thực hành.

</details>

<details>
<summary><strong>REA có tải ứng dụng của tôi lên không?</strong></summary>

REA phân tích mục tiêu cục bộ. Tác nhân nhận kết quả công cụ, và nhà cung cấp mô hình của tác nhân có chính sách dữ liệu riêng.

</details>

<details>
<summary><strong>Tôi nên làm gì khi gặp lỗi?</strong></summary>

Hãy cập nhật trước; một bản phát hành gần đây có thể đã sửa lỗi.

Với CLI được cài bằng npm:

```bash
rea update
```

Với thiết lập tác nhân qua `npx`:

```bash
npx rea-agents@latest setup
```

Nếu dùng tác nhân, hãy hoàn tất [làm mới thiết lập](#cập-nhật-rea) và khởi động lại nó. Thử lại cùng tác vụ. Nếu vấn đề vẫn còn, [mở issue](https://github.com/morluto/rea/issues) với phiên bản REA, loại mục tiêu, các bước tái hiện và đầu ra lỗi.

</details>

## Tài liệu

Bắt đầu với [hướng dẫn thực hành](https://rea.tools/guides/) trên trang web. Để biết tùy chọn cụ thể, điều kiện tiên quyết và hợp đồng kết quả:

- [Cài đặt và thiết lập](docs/installation.md): đăng ký tác nhân, cấu hình trình phân tích, cập nhật và gỡ cài đặt.
- [Kiểm tra mức sẵn sàng và khắc phục sự cố](docs/installation.md#check-readiness-for-your-task): chẩn đoán một tác nhân hoặc bộ máy phân tích cụ thể.
- [CLI và Evidence](docs/cli.md): lệnh, lựa chọn trình phân tích, ảnh chụp trạng thái, nhập/xuất và trạng thái thoát.
- [Hợp đồng MCP](docs/mcp-contracts.md) và [prompt cho tác nhân](docs/mcp-prompts.md): kết quả công cụ, phiên làm việc và điều tra có hướng dẫn.
- [Danh mục công cụ](docs/mcp-contracts.md#generated-catalog): danh sách công cụ, trình phân tích và lệnh CLI được tạo khi dựng dự án.
- [Lộ trình](docs/roadmap.md): công việc dự kiến và theo dõi các khả năng.

Báo cáo lỗ hổng theo [SECURITY.md](SECURITY.md).

## Đóng góp

Chúng tôi hoan nghênh bạn giúp phát triển REA! [Mở issue](https://github.com/morluto/rea/issues) để báo lỗi hoặc đề xuất tính năng, hoặc [gửi pull request](https://github.com/morluto/rea/pulls) để cải thiện mã hay tài liệu.

Xem [CONTRIBUTING.md](CONTRIBUTING.md) về thiết lập môi trường phát triển và các bước kiểm tra, [hướng dẫn kiểm thử](docs/testing.md) về các luồng xác minh và [sơ đồ kiến trúc](docs/architecture.mermaid) về cấu trúc dự án.

## Liên kết dự án

[Trang web](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [Bảo mật](SECURITY.md)

## Lịch sử sao

🎉 **20.000 sao trên GitHub — xin cảm ơn!**

Cảm ơn mọi người đã sử dụng REA, báo lỗi, kiểm thử bản dựng và đóng góp bản sửa lỗi.

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="Lịch sử sao GitHub của REA" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## Miễn trừ trách nhiệm

REA cung cấp công cụ cho nghiên cứu dịch ngược, phân tích và tái tạo hợp pháp. Bạn có trách nhiệm có được các quyền cho phép cần thiết và tuân thủ luật áp dụng. Dự án không ủng hộ việc sử dụng trái pháp luật hoặc không được cho phép.

## Giấy phép

[MIT](LICENSE)
