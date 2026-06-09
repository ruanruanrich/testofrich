const BRAND = {
  teacher: "阮阮",
  course: "金钱整理魔法课",
  slogan: "时间、精力、金钱是人生三驾马车，理清金钱关系，财富自然流动",
  wechat: "rrls2024",
  services: "金钱关系梳理、财富状态咨询",
  privacy: "信息仅用于测评解读和咨询联系"
};

const MAX_DIMENSION_SCORE = 25;
const MAX_TOTAL_SCORE = 150;

const dimensions = [
  {
    name: "金钱关系与安全感",
    questions: [
      ["我能比较坦然地谈钱、收费、预算或家庭财务安排。", false],
      ["即使账户余额波动，我也能通过计划和行动找回安全感。", false],
      ["我能分辨自己花钱是出于真实需要，还是为了获得认可、安抚不安或维系关系。", false],
      ["我常觉得谈钱会显得自己太现实、太功利，甚至不好意思开口。", true],
      ["我会为了不伤感情、避免尴尬或证明自己大方，而承担超出计划的花费。", true]
    ]
  },
  {
    name: "收入能力与机会管理",
    questions: [
      ["我清楚自己目前最主要的收入来源，以及它的增长空间。", false],
      ["我知道自己的核心能力可以如何转化成更高收入。", false],
      ["我能相对清楚地区分主业、副业和长期机会各自的优先级。", false],
      ["我经常觉得自己很忙很累，但说不清这些努力怎样带来更高收入。", true],
      ["面对涨薪、报价、谈合作或争取机会时，我常常会退缩或不好意思开口。", true]
    ]
  },
  {
    name: "消费与生活习惯",
    questions: [
      ["我大多数消费是有意识的，而不是靠情绪、冲动或补偿心理驱动。", false],
      ["我能分清“真正需要”“提升生活质量”和“短暂安慰自己”的消费。", false],
      ["我的生活习惯总体上能支持财务稳定，例如规律作息、健康管理和减少无效消耗。", false],
      ["我经常因为压力、委屈、奖励自己或一时心动而买下原本没计划的东西。", true],
      ["我有些花费其实是在为混乱的生活习惯买单，例如熬夜后点外卖、拖延后加急、情绪不好就消费。", true]
    ]
  },
  {
    name: "储蓄系统与现金流",
    questions: [
      ["我每月会固定留下一部分钱，而不是花完再看剩多少。", false],
      ["我知道自己为什么要存钱，例如安全感、学习成长、家庭计划、资产积累或未来选择权。", false],
      ["我有一笔可以应对突发情况的备用金。", false],
      ["我通常是先花钱，月底如果还有剩下才会考虑存起来。", true],
      ["我虽然会存钱，但常常没有明确边界，遇到想买的东西或临时状况就会花掉。", true]
    ]
  },
  {
    name: "投资认知与风险规划",
    questions: [
      ["我理解投资不是一夜暴富，而是长期资产管理的一部分。", false],
      ["我大致了解自己的投资风格和风险承受能力。", false],
      ["我考虑过退休、父母养老、孩子教育或医疗风险对未来现金流的影响。", false],
      ["我容易因为别人赚钱了、害怕错过机会，或者听到热门项目就冲动投入。", true],
      ["我知道未来会有养老、教育、医疗等大额责任，但常常觉得太远了，所以先不去规划。", true]
    ]
  },
  {
    name: "财富目标与行动力",
    questions: [
      ["我知道自己为什么想要更多钱，而不只是笼统地觉得“越多越好”。", false],
      ["我有清晰的短期财务目标，例如还债、储蓄、涨薪、启动副业等。", false],
      ["我能把财富目标拆成可执行的行动，例如每月存多少钱、提升什么能力、减少哪类支出。", false],
      ["我经常说想多赚钱、想变自由，但很少把目标拆成具体行动。", true],
      ["我常说要存钱、要规划、要提升收入，但真正执行时容易拖延或三分钟热度。", true]
    ]
  }
];

const dimensionMeta = {
  金钱关系与安全感: {
    code: "A1",
    system: "金钱关系系统",
    short: "金钱关系",
    lowLabel: "安全感与边界卡点",
    action: "先看见自己在关系里为哪些感受买单。"
  },
  收入能力与机会管理: {
    code: "B1",
    system: "现金流系统",
    short: "收入机会",
    lowLabel: "能力变现卡点",
    action: "把主业、副业和机会排出优先级。"
  },
  消费与生活习惯: {
    code: "A2",
    system: "金钱关系系统",
    short: "消费习惯",
    lowLabel: "情绪消费卡点",
    action: "连续 7 天记录钱和精力流向。"
  },
  储蓄系统与现金流: {
    code: "B2",
    system: "现金流系统",
    short: "储蓄现金流",
    lowLabel: "留钱系统卡点",
    action: "先建立一笔有边界的备用金。"
  },
  投资认知与风险规划: {
    code: "C1",
    system: "财富可持续系统",
    short: "投资风险",
    lowLabel: "风险规划卡点",
    action: "先补风险承受和家庭长期责任框架。"
  },
  财富目标与行动力: {
    code: "C2",
    system: "财富可持续系统",
    short: "目标行动",
    lowLabel: "目标落地卡点",
    action: "把愿望拆成一个本周能完成的小动作。"
  }
};

const diagnosis = {
  金钱关系与安全感: "你的卡点可能不只在钱本身，而在安全感、关系边界和“我是否值得拥有”的内在拉扯。",
  收入能力与机会管理: "你可能很能干，但还没有把能力、主业、副业和机会放进同一张收入地图。",
  消费与生活习惯: "你花掉的可能不只是钱，也可能是在替压力、委屈、拖延和生活混乱买单。",
  储蓄系统与现金流: "你不是天生存不住钱，而是缺少一个有目的、有边界、能复盘的留钱系统。",
  投资认知与风险规划: "你现在最需要的不是追热点，而是建立投资判断力和家庭长期风险框架。",
  财富目标与行动力: "你想要更多钱，但目标还需要从愿望变成可执行、可复盘、能坚持的行动。"
};

const adviceGroups = [
  {
    title: "清晰财富观",
    match: ["金钱关系与安全感", "财富目标与行动力", "投资认知与风险规划"],
    text: "重新定义钱对你的意义，把“想有钱”拆成安全感、自由度、家庭支持、成长资源和未来选择权。"
  },
  {
    title: "探究行为习惯",
    match: ["消费与生活习惯", "储蓄系统与现金流", "收入能力与机会管理"],
    text: "连续 7 天记录真实消费和时间使用，找出最容易导致冲动消费、拖延存钱或收入停滞的场景。"
  },
  {
    title: "探索关系需求",
    match: ["金钱关系与安全感", "消费与生活习惯"],
    text: "分辨自己是在为真实关系付出，还是在为认可、内疚、害怕冲突买单，并练习表达金钱边界。"
  },
  {
    title: "学习金融知识",
    match: ["投资认知与风险规划", "储蓄系统与现金流"],
    text: "先补基础知识，了解风险承受能力、投资风格、备用金、保险、养老和教育规划的底层框架。"
  }
];

const resultLevels = [
  ["财富系统升级型", 120, 150, "你已经具备不错的财富意识和行动基础。接下来要做的是把收入、现金流、关系边界和长期目标整合成更稳定的财富系统。"],
  ["稳固财富基石型", 90, 119, "你已经开始重视金钱，也有一些行动，但容易在执行、边界或长期规划上断断续续。你的问题不是没有潜力，而是系统还不够稳定。"],
  ["财富觉醒型", 60, 89, "你在几个关键维度上可能都有压力。建议先看见底层模式，再一步步建立更稳定的财富流动。"],
  ["财富秩序重建型", 30, 59, "你现在最需要的不是复杂投资，而是先建立基本的财富秩序：知道钱去了哪里，知道哪些习惯和关系正在消耗你。"]
];

const qRoot = document.querySelector("#questions");
const report = document.querySelector("#report-card");
let latestResult = null;

function scorePercent(score) {
  return Math.round(score / MAX_DIMENSION_SCORE * 100);
}

function scoreColor(score) {
  if (score >= 20) return "#4e7a64";
  if (score >= 14) return "#c18b3c";
  return "#ef4a38";
}

function buildRadarSvg(scores) {
  const names = Object.keys(scores);
  const cx = 150;
  const cy = 150;
  const maxR = 102;
  const points = names.map((name, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / names.length;
    const r = maxR * scores[name] / MAX_DIMENSION_SCORE;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  }).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  const rings = [0.33, 0.66, 1].map((ratio) => {
    const ring = names.map((_, index) => {
      const angle = -Math.PI / 2 + index * Math.PI * 2 / names.length;
      const r = maxR * ratio;
      return `${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${ring}" fill="none" stroke="#eadfd2" stroke-width="1" />`;
  }).join("");

  const axes = names.map((name, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / names.length;
    const x = cx + Math.cos(angle) * maxR;
    const y = cy + Math.sin(angle) * maxR;
    const tx = cx + Math.cos(angle) * (maxR + 28);
    const ty = cy + Math.sin(angle) * (maxR + 28);
    return `
      <line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#eadfd2" />
      <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${dimensionMeta[name].short}</text>
    `;
  }).join("");

  return `
    <svg viewBox="0 0 300 300" class="radar" role="img" aria-label="财富六维雷达图">
      ${rings}
      ${axes}
      <polygon points="${points}" fill="rgba(255,122,69,.34)" stroke="#ef4a38" stroke-width="3" />
    </svg>
  `;
}

function renderQuestions() {
  let index = 0;
  qRoot.innerHTML = dimensions.map((dimension) => {
    const items = dimension.questions.map(([text]) => {
      index += 1;
      return `
        <div class="question">
          <p>${index}. ${text}</p>
          <div class="scale" role="radiogroup" aria-label="第 ${index} 题评分">
            ${[1, 2, 3, 4, 5].map((score) => `
              <label>
                <input type="radio" name="q${index}" value="${score}" required>
                <span>${score}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");
    return `<section class="dimension"><h3>${dimension.name}</h3>${items}</section>`;
  }).join("");
}

function getProfile() {
  return {
    name: document.querySelector("#name").value.trim(),
    age: document.querySelector("#age").value,
    identities: [...document.querySelectorAll("input[name='identity']:checked")].map((item) => item.value),
    wechat: document.querySelector("#wechat").value.trim(),
    concern: document.querySelector("#concern").value.trim()
  };
}

function validateProfile(profile) {
  if (!profile.name || !profile.age || !profile.wechat || !profile.concern || profile.identities.length === 0) {
    alert("请先完整填写姓名、年龄段、身份、微信号和最想解决的问题。");
    return false;
  }
  return true;
}

function scoreAssessment() {
  const scores = {};
  let cursor = 0;
  for (const dimension of dimensions) {
    let sum = 0;
    for (const [, reverse] of dimension.questions) {
      cursor += 1;
      const checked = document.querySelector(`input[name="q${cursor}"]:checked`);
      if (!checked) {
        alert(`第 ${cursor} 题还没有选择。`);
        return null;
      }
      const raw = Number(checked.value);
      sum += reverse ? 6 - raw : raw;
    }
    scores[dimension.name] = sum;
  }
  return scores;
}

function classify(total) {
  return resultLevels.find(([, min, max]) => total >= min && total <= max) || resultLevels.at(-1);
}

function dimensionStatus(score) {
  if (score >= 20) return "优势区";
  if (score >= 14) return "成长区";
  return "卡点区";
}

function buildSystemGroups(scores) {
  const order = ["金钱关系系统", "现金流系统", "财富可持续系统"];
  return order.map((system) => {
    const items = Object.entries(scores)
      .filter(([name]) => dimensionMeta[name].system === system)
      .map(([name, score]) => ({ name, score, meta: dimensionMeta[name] }));
    const total = items.reduce((sum, item) => sum + item.score, 0);
    const max = items.length * MAX_DIMENSION_SCORE;
    return { system, items, total, max };
  });
}

function pickPriority(scores) {
  const priority = ["金钱关系与安全感", "财富目标与行动力", "储蓄系统与现金流", "消费与生活习惯", "收入能力与机会管理", "投资认知与风险规划"];
  const sorted = Object.entries(scores).sort((a, b) => a[1] - b[1] || priority.indexOf(a[0]) - priority.indexOf(b[0]));
  return sorted[0][0];
}

function buildResult() {
  const profile = getProfile();
  if (!validateProfile(profile)) return;
  const scores = scoreAssessment();
  if (!scores) return;

  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const [level, , , levelText] = classify(total);
  const lowest = pickPriority(scores);
  const highest = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const matchedAdvice = adviceGroups.filter((item) => item.match.includes(lowest));
  const fallbackAdvice = adviceGroups.filter((item) => !item.match.includes(lowest)).slice(0, 1);
  const suggestions = [...matchedAdvice, ...fallbackAdvice].slice(0, 3);

  latestResult = { profile, scores, total, level, levelText, lowest, highest, suggestions };
  renderReport(latestResult);
  document.querySelector("#result").hidden = false;
  document.querySelector("#result").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderReport(data) {
  const dimensionsHtml = Object.entries(data.scores).map(([name, score]) => `
    <div class="box">
      <h4>${name} · ${score}/${MAX_DIMENSION_SCORE}</h4>
      <div class="bar"><span style="width:${score / MAX_DIMENSION_SCORE * 100}%"></span></div>
      <p>${dimensionStatus(score)}</p>
    </div>
  `).join("");

  const visualRows = buildSystemGroups(data.scores).map((group) => {
    const rows = group.items.map(({ name, score, meta }) => {
      const percent = scorePercent(score);
      return `
        <div class="visual-row ${name === data.lowest ? "is-lowest" : ""}">
          <div class="visual-code">
            <strong>${meta.code}</strong>
            <span>${meta.short}</span>
          </div>
          <div class="visual-main">
            <div class="visual-label">
              <b>${name}</b>
              <span>${score}/${MAX_DIMENSION_SCORE} · ${dimensionStatus(score)}</span>
            </div>
            <div class="visual-bar">
              <i style="width:${percent}%; background:${scoreColor(score)}"></i>
            </div>
            <p>${score < 14 ? meta.lowLabel : meta.action}</p>
          </div>
        </div>
      `;
    }).join("");
    return `
      <div class="system-group">
        <div class="system-head">
          <b>${group.system}</b>
          <span>${group.total}/${group.max}</span>
        </div>
        ${rows}
      </div>
    `;
  }).join("");

  const suggestionsHtml = data.suggestions.map((item) => `
    <div class="suggestion">
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </div>
  `).join("");

  report.innerHTML = `
    <div class="summary">
      <img src="./assets/logo-cropped.png" alt="${BRAND.course}" class="summary-logo">
      <div>
        <p class="report-kicker">${BRAND.slogan}</p>
        <h3>${data.profile.name} 的财富状态：${data.level}</h3>
        <div class="score">${data.total}/${MAX_TOTAL_SCORE}</div>
        <p>${data.levelText}</p>
      </div>
    </div>
    <div class="grid">
      <div class="box">
        <h4>你的财富支撑点</h4>
        <p>${data.highest}。这个维度目前是你相对稳定的优势，可以继续放大。</p>
      </div>
      <div class="box">
        <h4>最值得优先处理</h4>
        <p>${data.lowest}。${diagnosis[data.lowest]}</p>
      </div>
    </div>
    <div class="visual-map">
      <div>
        <h4>财富地图</h4>
        <p>越短的条形，越说明这个系统需要优先补强。</p>
        ${visualRows}
      </div>
      <div class="radar-card">
        <h4>六维雷达图</h4>
        ${buildRadarSvg(data.scores)}
      </div>
    </div>
    <div class="grid">${dimensionsHtml}</div>
    <div class="box">
      <h4>你的基本信息</h4>
      <p>年龄段：${data.profile.age}</p>
      <p>身份：${data.profile.identities.join("、")}</p>
      <p>最想解决的问题：${data.profile.concern}</p>
    </div>
    <div class="suggestions">${suggestionsHtml}</div>
    <div class="box">
      <h4>下一步</h4>
      <p>测评只能帮你看见问题轮廓。想知道自己最值得优先调整的 1-3 个方向，可以预约${BRAND.services}，或添加微信 ${BRAND.wechat} 领取详细解读。</p>
      <p class="privacy">${BRAND.privacy}</p>
    </div>
  `;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = [...text];
  let line = "";
  for (const char of chars) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
  return y + lineHeight;
}

function drawRadarOnCanvas(ctx, scores, cx, cy, radius) {
  const names = Object.keys(scores);
  ctx.save();
  ctx.strokeStyle = "#eadfd2";
  ctx.lineWidth = 2;
  [0.34, 0.67, 1].forEach((ratio) => {
    ctx.beginPath();
    names.forEach((name, index) => {
      const angle = -Math.PI / 2 + index * Math.PI * 2 / names.length;
      const x = cx + Math.cos(angle) * radius * ratio;
      const y = cy + Math.sin(angle) * radius * ratio;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  });

  ctx.strokeStyle = "rgba(80,69,65,.28)";
  names.forEach((name, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / names.length;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.stroke();
  });

  ctx.beginPath();
  names.forEach((name, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / names.length;
    const r = radius * scores[name] / MAX_DIMENSION_SCORE;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(255,122,69,.34)";
  ctx.strokeStyle = "#ef4a38";
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#504541";
  ctx.font = "20px sans-serif";
  names.forEach((name, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / names.length;
    const x = cx + Math.cos(angle) * (radius + 34);
    const y = cy + Math.sin(angle) * (radius + 34);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(dimensionMeta[name].short, x, y);
  });
  ctx.restore();
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fillRoundRect(ctx, x, y, width, height, radius, fillStyle) {
  roundRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function drawQrPlaceholder(ctx, x, y, size) {
  fillRoundRect(ctx, x, y, size, size, 18, "#ffffff");
  ctx.strokeStyle = "rgba(255,255,255,.92)";
  ctx.lineWidth = 4;
  ctx.stroke();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function drawReportImage() {
  if (!latestResult) {
    alert("请先生成测评报告。");
    return;
  }
  const canvas = document.querySelector("#report-canvas");
  canvas.width = 1080;
  canvas.height = 1680;
  const ctx = canvas.getContext("2d");
  const data = latestResult;
  ctx.letterSpacing = "0px";
  ctx.fillStyle = "#fff6e4";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const header = ctx.createLinearGradient(0, 0, canvas.width, 340);
  header.addColorStop(0, "#ff8a4b");
  header.addColorStop(1, "#ef2d2f");
  ctx.fillStyle = header;
  ctx.fillRect(0, 0, canvas.width, 340);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 44px sans-serif";
  ctx.fillText("3分钟看懂你的财富流动状态", 70, 92);
  ctx.font = "27px sans-serif";
  ctx.fillText("时间、精力、金钱是人生三驾马车", 70, 142);
  ctx.fillText("理清金钱关系，财富自然流动", 70, 180);
  ctx.font = "bold 76px sans-serif";
  ctx.fillText(`${data.total}`, 70, 262);
  ctx.font = "30px sans-serif";
  ctx.fillText(`/ ${MAX_TOTAL_SCORE}`, 210, 262);
  ctx.font = "bold 34px sans-serif";
  ctx.fillText(`${data.profile.name} · ${data.level}`, 70, 310);

  fillRoundRect(ctx, 670, 72, 300, 190, 26, "rgba(255,255,255,.22)");
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText("优先关注", 710, 124);
  ctx.font = "bold 34px sans-serif";
  wrapText(ctx, data.lowest, 710, 176, 220, 44);

  let y = 400;
  fillRoundRect(ctx, 54, y - 28, 972, 238, 18, "#ffffff");
  ctx.fillStyle = "#202124";
  ctx.font = "bold 34px sans-serif";
  ctx.fillText("核心诊断", 90, y + 28);
  ctx.font = "29px sans-serif";
  y = wrapText(ctx, `你的财富支撑点是「${data.highest}」，可以继续放大。`, 90, y + 82, 860, 44);
  y = wrapText(ctx, `当前最值得优先处理的是「${data.lowest}」。${diagnosis[data.lowest]}`, 90, y + 8, 860, 44);

  y = 690;
  fillRoundRect(ctx, 54, y - 34, 972, 520, 18, "#ffffff");
  ctx.fillStyle = "#202124";
  ctx.font = "bold 36px sans-serif";
  ctx.fillText("财富地图", 90, y + 6);
  ctx.font = "bold 27px sans-serif";
  ctx.fillText("六维雷达图", 730, y + 6);
  y += 52;
  buildSystemGroups(data.scores).forEach((group) => {
    ctx.fillStyle = "#ef4a38";
    ctx.font = "bold 25px sans-serif";
    ctx.fillText(`${group.system} ${group.total}/${group.max}`, 90, y);
    y += 42;
    group.items.forEach(({ name, score, meta }) => {
      ctx.fillStyle = "#202124";
      ctx.font = "bold 23px sans-serif";
      ctx.fillText(`${meta.code}`, 104, y);
      ctx.font = "23px sans-serif";
      ctx.fillText(meta.short, 154, y);
      ctx.font = "22px sans-serif";
      ctx.fillText(`${score}/${MAX_DIMENSION_SCORE}`, 322, y);
      ctx.fillStyle = "#f2ded0";
      ctx.fillRect(410, y - 22, 245, 20);
      ctx.fillStyle = scoreColor(score);
      ctx.fillRect(410, y - 22, 245 * score / MAX_DIMENSION_SCORE, 20);
      y += 42;
    });
    y += 14;
  });

  drawRadarOnCanvas(ctx, data.scores, 820, 940, 128);

  y = 1240;
  fillRoundRect(ctx, 54, y - 28, 972, 188, 18, "#fff1e8");
  ctx.fillStyle = "#202124";
  ctx.font = "bold 34px sans-serif";
  ctx.fillText("下一步建议", 90, y + 22);
  ctx.font = "28px sans-serif";
  const firstSuggestion = data.suggestions[0]?.text || "先选择最低分维度，连续 7 天观察真实行为。";
  wrapText(ctx, firstSuggestion, 90, y + 78, 830, 42);

  y = 1458;
  const cta = ctx.createLinearGradient(54, y, 1026, y + 160);
  cta.addColorStop(0, "#ff8a4b");
  cta.addColorStop(1, "#ef2d2f");
  fillRoundRect(ctx, 54, y - 22, 972, 170, 18, cta);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px sans-serif";
  ctx.fillText("想看懂自己的金钱模式？", 90, y + 30);
  ctx.font = "26px sans-serif";
  ctx.fillText(`预约${BRAND.services} · 添加微信 ${BRAND.wechat}`, 90, y + 78);
  ctx.font = "22px sans-serif";
  ctx.fillText(BRAND.privacy, 90, y + 120);
  try {
    const qrSource = window.QR_DATA_URL || "./assets/wechat-qr.jpeg";
    const qr = await loadImage(qrSource);
    fillRoundRect(ctx, 812, y - 10, 140, 140, 16, "#ffffff");
    ctx.drawImage(qr, 824, y + 2, 116, 116);
  } catch (error) {
    drawQrPlaceholder(ctx, 820, y - 2, 122);
  }

  const url = canvas.toDataURL("image/png");
  const link = document.querySelector("#image-link");
  const previewWrap = document.querySelector("#image-preview");
  const preview = document.querySelector("#report-preview");
  preview.src = url;
  previewWrap.hidden = false;
  link.href = url;
  link.hidden = false;
  link.textContent = "下载报告图";
  previewWrap.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelector("#submit").addEventListener("click", buildResult);
document.querySelector("#reset").addEventListener("click", () => location.reload());
document.querySelector("#download").addEventListener("click", drawReportImage);
renderQuestions();
