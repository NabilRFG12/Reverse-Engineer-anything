<div align="center">

[English](README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · **العربية**

# REA: هندسة عكسية لأي شيء

### خادم MCP واحد للهندسة العكسية للملفات الثنائية والتطبيقات والسلوك أثناء التشغيل.

**وجدت ميزة تعجبك؟ افهم طريقة عملها حتى مستوى الشيفرة الثنائية.**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![CI](https://img.shields.io/github/actions/workflow/status/morluto/rea/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/morluto/rea/actions/workflows/ci.yml)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[الموقع](https://rea.tools/) · [الأدلة](https://rea.tools/guides/) · [دراسات الحالة](https://rea.tools/showcase/)**

[البدء السريع](#البدء-السريع) · [كيف يعمل REA](#كيف-يعمل-rea) · [ما الذي يمكنك تحليله](#ما-الذي-يمكنك-تحليله) · [دراسات الحالة](#دراسات-الحالة) · [الأسئلة الشائعة](#الأسئلة-الشائعة) · [التوثيق](#التوثيق)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA يشغّل جسر التحليل داخل Hopper لفحص ملف ثنائي للشيفرة الأصلية" width="1200" />

<br />

<table aria-label="مجتمع REA">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>انضم إلى مجتمع الهندسة العكسية</strong>
  </a><br />
  <sub>Discord · أسئلة وأجوبة · مشاركة النتائج</sub>
</td>
</tr>
</table>

<br />

</div>

---

هل وجدت في تطبيق ميزة تريد إضافتها إلى منتجك؟ اطلب من وكيلك استقصاءها باستخدام REA. يستطيع فحص التطبيق من دون شيفرته المصدرية، وشرح طريقة عمل الميزة وعرض الأدلة، ثم بناء نسخة تناسب مشروعك.

يربط REA وكيلك بأدوات لفحص الملفات الثنائية للشيفرة الأصلية، وتطبيقات JavaScript وElectron، وتجميعات .NET، والمواقع. يمكنك أيضًا استخدام الأدوات نفسها من الطرفية. يجري التحليل محليًا، وتتضمن النتائج الأدلة والقيود التي تستند إليها كل خلاصة.

يسجّل الإعداد REA لدى وكيلك ويثبّت تعليمات سير العمل المطابقة. يمكن لتحليل الشيفرة الأصلية استخدام تثبيت موجود من Hopper أو Ghidra؛ ويمكن للإعداد أيضًا تثبيت Hopper اختياريًا بعد موافقتك. لا يحتاج التحليل الثابت لـ JavaScript إلى أي من المحركين.

> **[زر موقع REA](https://rea.tools/)** للاطلاع على تعليمات الإعداد والأدلة المصوّرة ودراسات الحالة الفعلية.

## البدء السريع

### إعداد وكيلك

بعد تثبيت Node.js وnpm، نفّذ:

```bash
npx rea-agents setup
```

اختر الوكلاء، وراجع التغييرات المقترحة، ثم وافق عليها. يضيف الإعداد خادم MCP الخاص بـ REA وتعليمات سير العمل المطابقة، مع الاحتفاظ بنسخ احتياطية من الإعدادات الموجودة. أعد تشغيل وكيلك بعد ذلك.

يدعم الإعداد Claude Code وCodex وCursor وGemini CLI وGrok Build و[وكلاء آخرين](docs/installation.md#supported-agents). راجع [التثبيت والإعداد](docs/installation.md) لتهيئة موفّري التحليل وتسجيل MCP يدويًا.

### اطلب من وكيلك

```text
استقصِ طريقة عمل البحث في تطبيق Notes، واعرض الأدلة، ثم ابنِ ميزة مشابهة لمشروعي.
```

استبدل Notes بالتطبيق المستهدف وحدّد الميزة التي تريد فهمها.

### استخدام الطرفية

افحص مجلد تطبيق JavaScript/Electron بعد فك حزمه، أو ملف ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

تتضمن النتيجة الوحدات وعمليات الاستيراد وحدود Electron والأدلة المتعلقة بها. استبدل المسار بمسار هدفك، مثل `"D:/apps/example"` على Windows.

لتثبيت أمر `rea` للاستخدام المعتاد:

```bash
npm install --global rea-agents
rea --help
```

لتحليل الشيفرة الأصلية، هيّئ موفّرًا أولًا. راجع [دليل CLI وEvidence](docs/cli.md) لأوامر تحليل الشيفرة الأصلية، واختيار الموفّر، واللقطات، والاستخدام في السكربتات.

### تحديث REA

يتطور REA بسرعة، وتتضمن الإصدارات الجديدة إصلاحات متكررة للأخطاء. حافظ على تحديث نسختك.

لواجهة CLI المثبّتة عبر npm:

```bash
rea update
```

لتحديث تسجيلات الوكلاء والمهارة، نفّذ أمر الإعداد الذي يعرضه التحديث.

إذا كنت تستخدم `npx`، فحدّث إعداد وكيلك بالأمر التالي:

```bash
npx rea-agents@latest setup
```

راجع تغييرات الإعداد وأعد تشغيل وكيلك. لأوامر CLI التي تنفّذها مرة واحدة، استخدم `npx rea-agents@latest` متبوعًا بالأمر المطلوب.

## كيف يعمل REA

يستدعي وكيلك REA عبر MCP لفحص الهدف وتتبع الشيفرة ذات الصلة. يعيد REA النتائج مع أدلتها. يستخدمها الوكيل لطرح أسئلة متابعة، أو شرح السلوك، أو كتابة تنفيذ واختباره. تستخدم أوامر CLI سير العمل نفسه.

![مسار الاستقصاء في REA: يسأل وكيلك عن هدف محلي، ويفحصه REA ويتتبعه بأدوات التحليل، ثم يستخدم الوكيل الشيفرة والمراجع والجوانب غير المحسومة التي أعادتها الأدوات لشرح السلوك وتنفيذه واختباره.](website/public/assets/figures/rea-investigation-flow.svg)

[افتح الشكل بحجمه الكامل](website/public/assets/figures/rea-investigation-flow.svg).

<a id="current-status"></a>

## ما الذي يمكنك تحليله

يتطلب REA إصدار Node.js 22.x (>=22.19) أو 24.x (>=24.11) أو 26+، إضافة إلى npm. تعتمد الأدوات الإضافية والأنظمة المضيفة المدعومة على الهدف:

| الهدف                           | ما يعيده REA                                                                                               | المتطلبات والدليل                                                                                                                 |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| الملفات الثنائية للشيفرة الأصلية | شيفرة شبه برمجية، وتعليمات تجميع، وسلاسل نصية، ورموز، واستدعاءات، ومراجع                                    | Hopper أو Ghidra أو IDA؛ [تحليل الشيفرة الأصلية](https://rea.tools/guides/native/)                                                 |
| بنية ELF دون تشغيل              | الأقسام والمقاطع والرموز ومعلومات إعادة التموضع الأصلية، وآليات الحماية المحتملة المستدلّ عليها بالفحص الثابت | pwntools يوفّره المستدعي على Linux x64؛ [تشخيص الملفات الثنائية](docs/binary-diagnostics.md)                                       |
| شيفرة EVM البايتية              | محددات التوجيه، وإزاحات البايتات، والمعاملات المستنتجة، وقابلية تغيير الحالة                                | مدخل محلي يحمل بايتات خامًا أو تمثيلًا سداسيًا عشريًا؛ [دليل EVM دون تشغيل](docs/evm-bytecode.md)                                      |
| أعطال Linux المسجّلة             | سجلات note الخام، ومسجّلات المعالج/الإشارات لكل خيط مسجّل، وترشيحات اختيارية لخرائط الذاكرة                     | pwntools يوفّره المستدعي؛ GDB/pwndbg اختياريان؛ [الأعطال المسجّلة](docs/recorded-crashes.md)                                         |
| JavaScript / Electron           | الوحدات، وعمليات الاستيراد، وخرائط المصدر، والمسارات، وIPC، وعلاقات إضافات الشيفرة الأصلية                    | Node.js وnpm؛ [تحليل التطبيقات](https://rea.tools/guides/javascript/)                                                             |
| المواقع                         | بنية الصفحة، والسكربتات، وملاحظات الشبكة، ولقطات الشاشة المطلوبة                                            | متصفح من عائلة Chrome؛ [تحليل المتصفح](https://rea.tools/guides/browser/)                                                         |
| تسجيلات الشبكة المحفوظة          | الطلبات، والاستجابات، ومحتويات الحمولة المتاحة، ومواضعها في المصدر                                          | HAR؛ وmitmdump على Linux لتسجيلات mitmproxy بصيغتها الأصلية؛ [دليل تسجيلات الشبكة](docs/web-network-captures.md)                     |
| تجميعات .NET                    | البيانات الوصفية، وتعليمات CIL، واعتماديات الشيفرة الأصلية المعلنة، ومقارنات البناء                         | فحص ثابت؛ [دليل الشيفرة المُدارة](docs/managed-code-analysis.md)                                                                   |
| حزم Android APK                 | تصريحات ملف manifest، والأصناف، والدوال الناتجة عن فك الترجمة، والمراجع                                     | JADX دون واجهة رسومية وJDK كامل على Linux/macOS؛ [دليل Android](docs/android-analysis.md)                                         |
| البرامج الثابتة                 | المناطق، ونتائج الاستخراج، وما يُمرّر إلى تحليل الشيفرة الأصلية                                                | Binwalk / Unblob على Linux؛ [دليل البرامج الثابتة](docs/firmware-analysis.md)                                                     |
| الحزم والموارد                  | قوائم الملفات، والبصمات، وملفات plist، وبنية حزم Apple، والموارد المستخرجة                                 | [دليل تحليل الملفات وJavaScript](docs/javascript-artifact-reconstruction.md)، [تطبيقات Apple](docs/apple-application-analysis.md) |
| سلوك العمليات                   | مخرجات الطرفية، والتفاعلات، وملاحظات الخروج ونظام الملفات، ومقارنات التشغيل                                  | Linux/macOS مع PTY أصلي؛ [تسجيل سلوك العمليات](docs/process-capture.md)                                                           |

[فحص ألعاب Unity](docs/game-reversing.md): فحص محلي للبيانات الوصفية وGUID والمشاهد ودوال C# المحتمل أن تكون هياكل فارغة؛ متاح في هذا الفرع بعد البناء.

يقرأ الفحص الثابت لـ JavaScript و.NET الملفات المقدّمة دون تشغيل التطبيق. يشغّل التسجيل أثناء التنفيذ الهدف المحدد أو يتفاعل معه بصلاحيات مستخدمك؛ ويشرح كل دليل للتسجيل أثناء التنفيذ آثاره.

<a id="choosing-a-deep-analysis-provider"></a>

تختلف صيغ ملفات الشيفرة الأصلية والأنظمة المضيفة المدعومة باختلاف الموفّر. راجع [إعداد Hopper وGhidra](docs/installation.md#hopper)، و[دليل IDA](docs/ida-provider.md)، و[دعم Ghidra التجريبي على Windows](docs/windows-ghidra-p0.md). يدعم Ghidra أيضًا [تحليل DOS ذي 16 بت](docs/ghidra-dos.md). لاختيار الموفّر، راجع [دليل CLI](docs/cli.md#choose-a-provider). تحقّق من [توفر الميزات في الإصدارات](docs/installation.md#released-package-and-main) للميزات المضافة بعد أحدث إصدار على npm.

## دراسات الحالة

### DX-Ball: إعادة بناء حساب توزيع الصوت بين القناتين

تتبّع استدعاء صوت إلى الدالة المساعدة التي تحوّل الموضع إلى توزيع بين القناتين، وافحص التعليمات، وحوّل الشيفرة شبه البرمجية غير المكتملة إلى C. تجتاز إعادة البناء 3,205 حالات اختبار على x86 الأصلي، وتعيد إنتاج جميع بايتات الدالة المترجمة البالغ عددها 63 بايتًا.

[اقرأ دراسة الحالة](https://rea.tools/showcase/dx-ball/) ·
[مستودع إعادة البناء](https://github.com/N0zoM1z0/dx-ball)

### Notion: تتبّع جسر الحافظة في Electron

اعثر على API الحافظة في عملية العرض، وتتبّعه عبر preload وIPC إلى العملية الرئيسية، وافحص صيغة الحافظة ذات التنسيق الغني.

[اقرأ دراسة الحالة](https://rea.tools/showcase/notion/)

### TH04: استعادة حساب حلقة المقذوفات في DOS

افحص تعليمات اللعبة الأصلية على PC-98 ذات 16 بت، واستعد حساب الزوايا الثابتة والموجّهة نحو الهدف، وقارن شيفرة C++ المعاد بناؤها بمخرجات المترجم المستخدم آنذاك.

[اقرأ دراسة الحالة](https://rea.tools/showcase/th04/) ·
[مستودع إعادة البناء](https://github.com/N0zoM1z0/th04)

إذا استخدمت REA لفحص هدف مثير للاهتمام، فنود الاطلاع عليه. شارك حالتك في [issue](https://github.com/morluto/rea/issues) أو [pull request](https://github.com/morluto/rea/pulls)، مع ذكر الهدف، وسؤالك، وكيف ساعدك REA، وما توصلت إليه.

## الأسئلة الشائعة

<details>
<summary><strong>أي وكلاء يمكنهم استخدام REA؟</strong></summary>

أي وكيل يدعم خوادم MCP المحلية. يهيّئ الإعداد [الوكلاء المدعومين](docs/installation.md#supported-agents)؛ ويمكن للعملاء الآخرين استخدام [تسجيل MCP يدويًا](docs/installation.md#mcp-registry).

</details>

<details>
<summary><strong>هل أحتاج إلى Hopper أو Ghidra أو IDA؟</strong></summary>

يستخدم تحليل الشيفرة الأصلية المتعمق أحدها. يعمل الفحص الثابت لـ JavaScript و.NET دون محرك لتحليل الشيفرة الأصلية. يستطيع الإعداد تثبيت Hopper بعد الموافقة؛ أما Ghidra وIDA فيستخدمان تثبيتاتك الموجودة. راجع [إعداد الموفّرين](docs/installation.md#hopper).

</details>

<details>
<summary><strong>هل أحتاج إلى تشغيل Hopper أولًا؟</strong></summary>

يشغّل REA برنامج Hopper عندما تحتاج العملية إليه. على macOS، قد تظهر عند التشغيل الأول نافذة تطلب اختيار وضع العرض التجريبي أو تفعيل الترخيص. راجع [تشغيل Hopper واستكشاف الأخطاء](docs/installation.md#launcher-paths-and-troubleshooting).

</details>

<details>
<summary><strong>ماذا يفعل تثبيت المهارة من skills.sh؟</strong></summary>

توفّر المهارة تعليمات الاستقصاء لوكيلك. استخدم `rea setup` لتسجيل خادم MCP الخاص بـ REA وتثبيت التعليمات المطابقة، ثم أعد تشغيل وكيلك. راجع [تثبيت المهارة وحدها](docs/installation.md#skill-only-installation).

</details>

<details>
<summary><strong>ما الشيفرة التي يعيدها REA؟</strong></summary>

يعيد تحليل الشيفرة الأصلية شيفرة شبه برمجية وتعليمات تجميع. يستعيد تحليل JavaScript/Electron الوحدات والعلاقات بينها. يستخدم وكيلك هذه النتائج لكتابة تنفيذ واختباره؛ وتقدّم [دراسات الحالة](#دراسات-الحالة) أمثلة عملية.

</details>

<details>
<summary><strong>هل يرفع REA تطبيقي؟</strong></summary>

يحلّل REA الأهداف محليًا. يتلقى وكيلك نتائج الأدوات، ولموفّر النموذج الذي يستخدمه سياسة بيانات خاصة به.

</details>

<details>
<summary><strong>ماذا أفعل إذا واجهت خطأ؟</strong></summary>

حدّث أولًا؛ فقد يكون إصدار حديث قد أصلح المشكلة بالفعل.

لواجهة CLI المثبّتة عبر npm:

```bash
rea update
```

لإعداد الوكيل عبر `npx`:

```bash
npx rea-agents@latest setup
```

إذا كنت تستخدم وكيلًا، فأكمل [تحديث الإعداد](#تحديث-rea) وأعد تشغيله. أعد محاولة المهمة نفسها. إذا استمرت المشكلة، [افتح issue](https://github.com/morluto/rea/issues) يتضمن إصدار REA، ونوع الهدف، وخطوات إعادة الإنتاج، ومخرجات الخطأ.

</details>

## التوثيق

ابدأ بـ [الأدلة العملية](https://rea.tools/guides/) على الموقع. للخيارات الدقيقة والمتطلبات وعقود النتائج:

- [التثبيت والإعداد](docs/installation.md): تسجيل الوكلاء، وتهيئة الموفّرين، والتحديثات، وإلغاء التثبيت.
- [الجاهزية واستكشاف الأخطاء](docs/installation.md#check-readiness-for-your-task): تشخيص وكيل أو محرك تحليل محدد.
- [CLI وEvidence](docs/cli.md): الأوامر، واختيار الموفّر، واللقطات، والاستيراد/التصدير، وحالات الخروج.
- [عقود MCP](docs/mcp-contracts.md) و[تعليمات الوكلاء](docs/mcp-prompts.md): نتائج الأدوات، والجلسات، والاستقصاءات الموجّهة.
- [كتالوج الأدوات](docs/mcp-contracts.md#generated-catalog): قائمة الأدوات والموفّرين وأوامر CLI المولّدة أثناء البناء.
- [خطة العمل](docs/roadmap.md): الأعمال المخطط لها ومتابعة القدرات.

أبلغ عن الثغرات وفق [SECURITY.md](SECURITY.md).

## المساهمة

نرحّب بمساعدتك في تطوير REA! [افتح issue](https://github.com/morluto/rea/issues) للإبلاغ عن خطأ أو اقتراح ميزة، أو [أرسل pull request](https://github.com/morluto/rea/pulls) لتحسين الشيفرة أو التوثيق.

راجع [CONTRIBUTING.md](CONTRIBUTING.md) لإعداد بيئة التطوير والفحوص، و[دليل الاختبار](docs/testing.md) لمسارات التحقق، و[خريطة البنية](docs/architecture.mermaid) لهيكل المشروع.

## روابط المشروع

[الموقع](https://rea.tools/) · [npm](https://www.npmjs.com/package/rea-agents) · [skills.sh](https://skills.sh/morluto/rea/reverse-engineer-anything) · [Issues](https://github.com/morluto/rea/issues) · [الأمان](SECURITY.md)

## سجل النجوم

🎉 **20,000 نجمة على GitHub — شكرًا لكم!**

شكرًا لكل من يستخدم REA، ويبلّغ عن الأخطاء، ويختبر إصدارات البناء، ويساهم بالإصلاحات.

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="سجل نجوم REA على GitHub" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

## إخلاء المسؤولية

يوفّر REA أدوات لأبحاث الهندسة العكسية والتحليل وإعادة البناء المشروعة. أنت مسؤول عن الحصول على أي تفويض مطلوب والالتزام بالقوانين المعمول بها. لا يؤيد المشروع الاستخدام غير القانوني أو غير المصرّح به.

## الترخيص

[MIT](LICENSE)
