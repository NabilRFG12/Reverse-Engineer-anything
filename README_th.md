<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · **ไทย** · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md)

# REA: Reverse Engineer Anything

### MCP เดียวสำหรับวิศวกรรมย้อนกลับ ทั้งไบนารี แอปพลิเคชัน และพฤติกรรมขณะทำงาน

**เห็นฟีเจอร์ที่ชอบแล้วอยากรู้ว่าทำงานอย่างไร? เข้าใจได้ลึกถึงระดับไบนารี**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[เว็บไซต์](https://rea.tools/) · [คู่มือ](https://rea.tools/guides/) · [ตัวอย่างการใช้งาน](https://rea.tools/showcase/)**

[เริ่มต้นอย่างรวดเร็ว](#เริ่มต้นอย่างรวดเร็ว) · [REA ทำงานอย่างไร](#rea-ทำงานอย่างไร) · [สิ่งที่วิเคราะห์ได้](#สิ่งที่วิเคราะห์ได้) · [ตัวอย่างการใช้งาน](#ตัวอย่างการใช้งาน) · [คำถามที่พบบ่อย](#คำถามที่พบบ่อย) · [เอกสาร](#เอกสาร)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA เริ่มบริดจ์การวิเคราะห์ภายใน Hopper ขณะตรวจสอบไบนารีเนทีฟ" width="1200" />

<br />

<table aria-label="ชุมชน REA">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>เข้าร่วมชุมชนวิศวกรรมย้อนกลับ</strong>
  </a><br />
  <sub>Discord · ถามตอบ · แบ่งปันผลงาน</sub>
</td>
</tr>
</table>

<br />

</div>

---

เห็นฟีเจอร์ในแอปที่อยากนำมาใช้ในผลิตภัณฑ์ของคุณเองหรือไม่? ขอให้เอเจนต์ของคุณตรวจสอบด้วย REA เอเจนต์สามารถวิเคราะห์แอปโดยไม่ต้องมีซอร์สโค้ด อธิบายการทำงานของฟีเจอร์ แสดงหลักฐาน และสร้างเวอร์ชันสำหรับโปรเจกต์ของคุณได้

REA เชื่อมเอเจนต์ของคุณกับเครื่องมือสำหรับตรวจสอบไบนารีเนทีฟ แอป JavaScript และ Electron แอสเซมบลี .NET และเว็บไซต์ คุณใช้เครื่องมือเดียวกันจากเทอร์มินัลได้ การวิเคราะห์ทำงานบนเครื่องของคุณ และผลลัพธ์มีทั้งหลักฐานและข้อจำกัดที่ประกอบแต่ละข้อสรุป

ขั้นตอนตั้งค่าจะลงทะเบียน REA กับเอเจนต์และติดตั้งคำแนะนำการทำงานที่ตรงกัน การวิเคราะห์เนทีฟใช้ Hopper หรือ Ghidra ที่ติดตั้งอยู่แล้วได้ และขั้นตอนตั้งค่าสามารถติดตั้ง Hopper เพิ่มเติมเมื่อได้รับอนุมัติ การวิเคราะห์ JavaScript แบบสถิตไม่ต้องใช้เอนจินทั้งสองนี้

> **[เยี่ยมชมเว็บไซต์ REA](https://rea.tools/)** เพื่อดูคำแนะนำการตั้งค่า คู่มือพร้อมภาพประกอบ และกรณีศึกษาจริง

## เริ่มต้นอย่างรวดเร็ว

### ตั้งค่าเอเจนต์

เมื่อติดตั้ง Node.js และ npm แล้ว ให้เรียกใช้:

```bash
npx rea-agents setup
```

เลือกเอเจนต์ ตรวจสอบการเปลี่ยนแปลงที่เสนอ แล้วอนุมัติ ขั้นตอนตั้งค่าจะเพิ่มเซิร์ฟเวอร์ MCP ของ REA และคำแนะนำการทำงานที่ตรงกัน พร้อมสำรองการตั้งค่าที่มีอยู่ จากนั้นเริ่มเอเจนต์ใหม่

ขั้นตอนตั้งค่ารองรับ Claude Code, Codex, Cursor, Gemini CLI, Grok Build และ[เอเจนต์อื่น ๆ](docs/installation.md#supported-agents) ดู[การติดตั้งและตั้งค่า](docs/installation.md) สำหรับการตั้งค่าผู้ให้บริการวิเคราะห์และการลงทะเบียน MCP ด้วยตนเอง

### ถามเอเจนต์

```text
ตรวจสอบว่าการค้นหาในแอป Notes ทำงานอย่างไร แสดงหลักฐานให้ฉันดู และสร้างฟีเจอร์ที่คล้ายกันสำหรับโปรเจกต์ของฉัน
```

แทนที่ Notes ด้วยแอปเป้าหมายและฟีเจอร์ที่คุณต้องการเข้าใจ

### ใช้เทอร์มินัล

ตรวจสอบไดเรกทอรีแอป JavaScript/Electron ที่แตกไฟล์แล้ว หรือไฟล์ ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

ผลลัพธ์ประกอบด้วยโมดูล การนำเข้า ขอบเขตของ Electron และหลักฐาน แทนที่พาธด้วยเป้าหมายของคุณ เช่น `"D:/apps/example"` บน Windows

หากต้องการติดตั้งคำสั่ง `rea` สำหรับใช้งานเป็นประจำ:

```bash
npm install --global rea-agents
rea --help
```

สำหรับการวิเคราะห์เนทีฟ ให้ตั้งค่าผู้ให้บริการวิเคราะห์ก่อน ดู[คู่มือ CLI และ Evidence](docs/cli.md) สำหรับคำสั่งเนทีฟ การเลือกผู้ให้บริการ สแนปช็อต และการใช้งานในสคริปต์

### อัปเดต REA

REA เปลี่ยนแปลงอย่างรวดเร็ว และรุ่นใหม่มีการแก้ไขบั๊กอยู่บ่อยครั้ง โปรดอัปเดตการติดตั้งของคุณให้เป็นปัจจุบัน

สำหรับ CLI ที่ติดตั้งผ่าน npm:

```bash
rea update
```

หากต้องการปรับปรุงการลงทะเบียนเอเจนต์และสกิลให้เป็นปัจจุบัน ให้เรียกใช้คำสั่งตั้งค่าที่แสดงหลังการอัปเดต

หากใช้ `npx` ให้อัปเดตการตั้งค่าเอเจนต์ด้วย:

```bash
npx rea-agents@latest setup
```

ตรวจสอบการเปลี่ยนแปลงการตั้งค่าและเริ่มเอเจนต์ใหม่ สำหรับคำสั่ง CLI ที่ใช้ครั้งเดียว ให้ใช้ `npx rea-agents@latest` ตามด้วยคำสั่งที่ต้องการ

## REA ทำงานอย่างไร

เอเจนต์เรียก REA ผ่าน MCP เพื่อตรวจสอบเป้าหมายและติดตามโค้ดที่เกี่ยวข้อง REA ส่งข้อค้นพบกลับมาพร้อมหลักฐาน เอเจนต์ใช้ข้อมูลนี้เพื่อถามคำถามต่อ อธิบายพฤติกรรม หรือเขียนและทดสอบการนำไปใช้งาน คำสั่ง CLI ใช้กระบวนการเดียวกัน

![กระบวนการตรวจสอบด้วย REA: เอเจนต์ถามเกี่ยวกับเป้าหมายบนเครื่อง REA ตรวจสอบและติดตามด้วยเครื่องมือวิเคราะห์ แล้วเอเจนต์ใช้โค้ด การอ้างอิง และสิ่งที่ยังไม่ทราบที่ได้รับกลับมาเพื่ออธิบาย สร้าง และทดสอบ](website/public/assets/figures/rea-investigation-flow.svg)

[เปิดภาพขนาดเต็ม](website/public/assets/figures/rea-investigation-flow.svg)

<a id="current-status"></a>

## สิ่งที่วิเคราะห์ได้

REA ต้องใช้ Node.js 22.x (>=22.19), 24.x (>=24.11) หรือ 26+ และ npm เครื่องมือเพิ่มเติมและแพลตฟอร์มที่รองรับขึ้นอยู่กับเป้าหมาย:

| เป้าหมาย                      | สิ่งที่ REA ส่งกลับ                                                                   | ข้อกำหนดและคู่มือ                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ไบนารีเนทีฟ                    | โค้ดเทียม แอสเซมบลี สตริง สัญลักษณ์ การเรียก และการอ้างอิง                                | Hopper, Ghidra หรือ IDA; [การวิเคราะห์เนทีฟ](https://rea.tools/guides/native/)                                                     |
| โครงสร้าง ELF แบบออฟไลน์       | เซกชัน เซกเมนต์ สัญลักษณ์/รีโลเคชันต้นฉบับ และตัวเลือกกลไกป้องกันที่พบจากการวิเคราะห์แบบสถิต      | pwntools ที่ผู้ใช้จัดเตรียมบน Linux x64; [การวินิจฉัยไบนารี](docs/binary-diagnostics.md)                                                  |
| ไบต์โค้ด EVM                   | ตัวเลือกฟังก์ชันสำหรับการเรียก ออฟเซ็ตไบต์ อาร์กิวเมนต์และความสามารถในการเปลี่ยนสถานะที่อนุมานได้ | ไฟล์บนเครื่องที่มีไบต์ดิบหรือข้อมูลเลขฐานสิบหก; [คู่มือ EVM แบบออฟไลน์](docs/evm-bytecode.md)                                                  |
| ข้อมูลการแครชของ Linux ที่บันทึกไว้ | ระเบียน note ดิบ รีจิสเตอร์/สัญญาณของทุกเธรดที่บันทึกไว้ และตัวเลือกการแมปเพิ่มเติม              | pwntools ที่ผู้ใช้จัดเตรียม; เลือกใช้ GDB/pwndbg เพิ่มเติมได้; [การแครชที่บันทึกไว้](docs/recorded-crashes.md)                                   |
| JavaScript / Electron        | โมดูล การนำเข้า ซอร์สแมป เส้นทาง IPC และความสัมพันธ์กับส่วนเสริมเนทีฟ                      | Node.js และ npm; [การวิเคราะห์แอปพลิเคชัน](https://rea.tools/guides/javascript/)                                                   |
| เว็บไซต์                       | โครงสร้างหน้า สคริปต์ ข้อมูลเครือข่ายที่สังเกตได้ และภาพหน้าจอที่ร้องขอ                         | เบราว์เซอร์ในตระกูล Chrome; [การวิเคราะห์ผ่านเบราว์เซอร์](https://rea.tools/guides/browser/)                                           |
| ข้อมูลเครือข่ายที่บันทึกไว้           | คำขอ คำตอบ เพย์โหลดที่ปรากฏ และตำแหน่งต้นทาง                                         | HAR; mitmdump บน Linux สำหรับข้อมูลที่บันทึกในรูปแบบเนทีฟของ mitmproxy; [คู่มือการบันทึกข้อมูล](docs/web-network-captures.md)                  |
| แอสเซมบลี .NET                | เมทาดาทา คำสั่ง CIL การพึ่งพาเนทีฟที่ประกาศไว้ และการเปรียบเทียบผลการบิลด์                  | การตรวจสอบแบบสถิต; [คู่มือโค้ดแบบจัดการ](docs/managed-code-analysis.md)                                                              |
| APK ของ Android              | การประกาศใน manifest คลาส เมธอดที่ดีคอมไพล์ และการอ้างอิง                             | JADX แบบไม่มี GUI และ JDK แบบเต็มบน Linux/macOS; [คู่มือ Android](docs/android-analysis.md)                                          |
| เฟิร์มแวร์                      | พื้นที่ข้อมูล ผลการแตกไฟล์ และการส่งต่อไปวิเคราะห์เนทีฟ                                     | Binwalk / Unblob บน Linux; [คู่มือเฟิร์มแวร์](docs/firmware-analysis.md)                                                             |
| แพ็กเกจและทรัพยากร             | รายการไฟล์ ค่าแฮช plist โครงสร้างบันเดิลของ Apple และทรัพยากรที่แตกออกมา                | [คู่มืออาร์ติแฟกต์และ JavaScript](docs/javascript-artifact-reconstruction.md), [แอปพลิเคชัน Apple](docs/apple-application-analysis.md) |
| พฤติกรรมของโปรเซส             | เอาต์พุตเทอร์มินัล การโต้ตอบ ข้อมูลการสิ้นสุดและระบบไฟล์ที่สังเกตได้ และการเปรียบเทียบการรัน       | Linux/macOS ที่มี PTY เนทีฟ; [การบันทึกโปรเซส](docs/process-capture.md)                                                              |

[การกู้คืนเกม Unity](docs/game-reversing.md): ตรวจสอบ meta/GUID, scene และเมธอด C# ที่อาจเป็น stub บนเครื่อง ใช้งานได้หลังบิลด์ fork นี้

การตรวจสอบ JavaScript และ .NET แบบสถิตอ่านไฟล์ที่ให้มาโดยไม่รันแอปพลิเคชัน การบันทึกขณะทำงานจะรันหรือโต้ตอบกับเป้าหมายที่เลือกโดยใช้สิทธิ์ของผู้ใช้คุณ คู่มือการทำงานแต่ละฉบับอธิบายผลที่เกิดขึ้นไว้

<a id="choosing-a-deep-analysis-provider"></a>

รูปแบบไบนารีเนทีฟและแพลตฟอร์มที่รองรับแตกต่างกันตามผู้ให้บริการวิเคราะห์ ดู[การตั้งค่า Hopper และ Ghidra](docs/installation.md#hopper), [คู่มือ IDA](docs/ida-provider.md) และ[การรองรับ Ghidra บน Windows แบบทดลอง](docs/windows-ghidra-p0.md) Ghidra ยังรองรับ[การวิเคราะห์ DOS แบบ 16 บิต](docs/ghidra-dos.md) สำหรับการเลือกผู้ให้บริการ ดู[คู่มือ CLI](docs/cli.md#choose-a-provider) ตรวจสอบ[ความพร้อมใช้งานในแต่ละรุ่น](docs/installation.md#released-package-and-main) สำหรับฟีเจอร์ที่เพิ่มหลังรุ่นล่าสุดบน npm

## ตัวอย่างการใช้งาน

### DX-Ball: สร้างการคำนวณแพนเสียงขึ้นใหม่

ติดตามการเรียกเสียงไปยังฟังก์ชันช่วยแปลงตำแหน่งเป็นค่าแพน ตรวจสอบคำสั่ง และแปลงโค้ดเทียมที่ยังไม่สมบูรณ์เป็น C การสร้างขึ้นใหม่นี้ผ่านการทดสอบ 3,205 กรณีเทียบกับ x86 ต้นฉบับ และสร้างไบต์ทั้ง 63 ไบต์ของฟังก์ชันที่คอมไพล์แล้วได้ตรงกัน

[อ่านกรณีศึกษา](https://rea.tools/showcase/dx-ball/) · [รีโพซิทอรีการสร้างขึ้นใหม่](https://github.com/N0zoM1z0/dx-ball)

### Notion: ติดตามบริดจ์คลิปบอร์ดของ Electron

ค้นหา API คลิปบอร์ดของ renderer ติดตามผ่าน preload และ IPC ไปยังโปรเซสหลัก แล้วตรวจสอบรูปแบบคลิปบอร์ดที่มีข้อมูลการจัดรูปแบบ

[อ่านกรณีศึกษา](https://rea.tools/showcase/notion/)

### TH04: กู้คืนการคำนวณวงแหวนกระสุนของ DOS

ตรวจสอบคำสั่ง 16 บิตของเกมต้นฉบับบน PC-98 กู้คืนการคำนวณมุมคงที่และมุมเล็งเป้าหมาย แล้วเปรียบเทียบ C++ ที่สร้างขึ้นใหม่กับผลลัพธ์จากคอมไพเลอร์ในยุคนั้น

[อ่านกรณีศึกษา](https://rea.tools/showcase/th04/) · [รีโพซิทอรีการสร้างขึ้นใหม่](https://github.com/N0zoM1z0/th04)

หากคุณใช้ REA กับสิ่งที่น่าสนใจ เราอยากเห็นผลงานของคุณ แบ่งปันกรณีของคุณผ่าน [issue](https://github.com/morluto/rea/issues) หรือ [pull request](https://github.com/morluto/rea/pulls) พร้อมระบุเป้าหมาย คำถามของคุณ REA ช่วยอย่างไร และสิ่งที่คุณค้นพบ

## คำถามที่พบบ่อย

<details>
<summary><strong>เอเจนต์ใดใช้ REA ได้บ้าง?</strong></summary>

เอเจนต์ใดก็ตามที่รองรับเซิร์ฟเวอร์ MCP บนเครื่อง ขั้นตอนตั้งค่าจะกำหนดค่าให้กับ[เอเจนต์ที่รองรับ](docs/installation.md#supported-agents) ส่วนไคลเอนต์อื่นใช้[การลงทะเบียน MCP ด้วยตนเอง](docs/installation.md#mcp-registry) ได้

</details>

<details>
<summary><strong>จำเป็นต้องมี Hopper, Ghidra หรือ IDA หรือไม่?</strong></summary>

การวิเคราะห์เนทีฟเชิงลึกต้องใช้หนึ่งในเครื่องมือเหล่านี้ การตรวจสอบ JavaScript และ .NET แบบสถิตทำงานได้โดยไม่มีเอนจินวิเคราะห์เนทีฟ ขั้นตอนตั้งค่าสามารถติดตั้ง Hopper หลังได้รับอนุมัติ ส่วน Ghidra และ IDA ใช้การติดตั้งที่คุณมีอยู่แล้ว ดู[การตั้งค่าผู้ให้บริการวิเคราะห์](docs/installation.md#hopper)

</details>

<details>
<summary><strong>ต้องเริ่ม Hopper ก่อนหรือไม่?</strong></summary>

REA เริ่ม Hopper เมื่อการดำเนินการต้องใช้ บน macOS อาจมีหน้าต่างเมื่อรันครั้งแรกให้เลือกโหมดทดลองหรือเปิดใช้ใบอนุญาต ดู[การเริ่ม Hopper และการแก้ไขปัญหา](docs/installation.md#launcher-paths-and-troubleshooting)

</details>

<details>
<summary><strong>การติดตั้งสกิลจาก skills.sh ทำอะไร?</strong></summary>

สกิลให้คำแนะนำการตรวจสอบแก่เอเจนต์ ใช้ `rea setup` เพื่อลงทะเบียนเซิร์ฟเวอร์ MCP ของ REA และติดตั้งคำแนะนำที่ตรงกัน แล้วเริ่มเอเจนต์ใหม่ ดู[การติดตั้งเฉพาะสกิล](docs/installation.md#skill-only-installation)

</details>

<details>
<summary><strong>REA ส่งกลับโค้ดแบบใด?</strong></summary>

การวิเคราะห์เนทีฟส่งกลับโค้ดเทียมและแอสเซมบลี การวิเคราะห์ JavaScript/Electron กู้คืนโมดูลและความสัมพันธ์ระหว่างโมดูล เอเจนต์ใช้ข้อค้นพบเหล่านี้เพื่อเขียนและทดสอบการนำไปใช้งาน ดูตัวอย่างที่ทำจริงใน[ตัวอย่างการใช้งาน](#ตัวอย่างการใช้งาน)

</details>

<details>
<summary><strong>REA อัปโหลดแอปของฉันหรือไม่?</strong></summary>

REA วิเคราะห์เป้าหมายบนเครื่องของคุณ เอเจนต์ได้รับผลลัพธ์ของเครื่องมือ และผู้ให้บริการโมเดลของเอเจนต์มีนโยบายข้อมูลของตนเอง

</details>

<details>
<summary><strong>ควรทำอย่างไรเมื่อพบข้อผิดพลาด?</strong></summary>

อัปเดตก่อน รุ่นล่าสุดอาจแก้ไขปัญหานี้แล้ว

สำหรับ CLI ที่ติดตั้งผ่าน npm:

```bash
rea update
```

สำหรับการตั้งค่าเอเจนต์ผ่าน `npx`:

```bash
npx rea-agents@latest setup
```

หากใช้เอเจนต์ ให้ทำ[การปรับปรุงการตั้งค่า](#อัปเดต-rea) ให้เสร็จแล้วเริ่มเอเจนต์ใหม่ ลองงานเดิมอีกครั้ง หากยังพบปัญหา ให้[เปิด issue](https://github.com/morluto/rea/issues) พร้อมระบุรุ่น REA ประเภทเป้าหมาย ขั้นตอนทำให้เกิดปัญหา และข้อความข้อผิดพลาด

</details>

## เอกสาร

เริ่มจาก[คู่มือพร้อมตัวอย่าง](https://rea.tools/guides/) บนเว็บไซต์ สำหรับตัวเลือก ข้อกำหนดเบื้องต้น และสัญญาผลลัพธ์ที่แน่นอน:

- [การติดตั้งและตั้งค่า](docs/installation.md): การลงทะเบียนเอเจนต์ การตั้งค่าผู้ให้บริการ การอัปเดต และการถอนการติดตั้ง
- [ความพร้อมใช้งานและการแก้ไขปัญหา](docs/installation.md#check-readiness-for-your-task): ตรวจวินิจฉัยเอเจนต์หรือเอนจินวิเคราะห์หนึ่งตัว
- [CLI และ Evidence](docs/cli.md): คำสั่ง การเลือกผู้ให้บริการ สแนปช็อต การนำเข้า/ส่งออก และรหัสการสิ้นสุด
- [สัญญา MCP](docs/mcp-contracts.md) และ[พรอมป์ต์สำหรับเอเจนต์](docs/mcp-prompts.md): ผลลัพธ์เครื่องมือ เซสชัน และการตรวจสอบตามคำแนะนำ
- [แค็ตตาล็อกเครื่องมือ](docs/mcp-contracts.md#generated-catalog): รายการเครื่องมือ ผู้ให้บริการ และคำสั่ง CLI ที่สร้างระหว่างการบิลด์
- [แผนพัฒนา](docs/roadmap.md): งานที่วางแผนไว้และรายการติดตามความสามารถ

รายงานช่องโหว่ผ่าน [SECURITY.md](SECURITY.md)

## การมีส่วนร่วม

เรายินดีรับความช่วยเหลือในการพัฒนา REA! [เปิด issue](https://github.com/morluto/rea/issues) เพื่อรายงานบั๊กหรือเสนอฟีเจอร์ หรือ[ส่ง pull request](https://github.com/morluto/rea/pulls) เพื่อปรับปรุงโค้ดหรือเอกสาร

ดู [CONTRIBUTING.md](CONTRIBUTING.md) สำหรับการตั้งค่าสภาพแวดล้อมพัฒนาและการตรวจสอบ ดู[การทดสอบ](docs/testing.md) สำหรับแนวทางการตรวจยืนยัน และ[แผนผังสถาปัตยกรรม](docs/architecture.mermaid) สำหรับโครงสร้างโปรเจกต์

## ลิงก์ของโปรเจกต์

[เว็บไซต์](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [ความปลอดภัย](SECURITY.md)

## ประวัติดาว

🎉 **20,000 ดาวบน GitHub — ขอบคุณทุกคน!**

ขอบคุณทุกคนที่ใช้ REA รายงานบั๊ก ทดสอบบิลด์ และช่วยแก้ไข

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="ประวัติดาว GitHub ของ REA" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## ข้อสงวนสิทธิ์

REA มีเครื่องมือสำหรับการวิจัยวิศวกรรมย้อนกลับ การวิเคราะห์ และการสร้างขึ้นใหม่อย่างถูกกฎหมาย คุณมีหน้าที่ขออนุญาตตามที่จำเป็นและปฏิบัติตามกฎหมายที่เกี่ยวข้อง โปรเจกต์นี้ไม่สนับสนุนการใช้งานที่ผิดกฎหมายหรือไม่ได้รับอนุญาต

## สัญญาอนุญาต

[MIT](LICENSE)
