import * as React from "react";
import * as ReactDOM from "react-dom/client";
const { useState, useEffect, useRef } = React;

/* ─── Design tokens ─── */
const C = {
  navy:   "#0F2238",
  accent: "#2E7BA6",
  gold:   "#C68A2A",
  coral:  "#E89380",
  sun:    "#E8A93A",
  sky:    "#7BB7D6",
  dark:   "#2C4256",
  mid:    "#5C7184",
  light:  "#9DAEC0",
  line:   "#DDE5EC",
  bg:     "#F4F8FC",
  white:  "#FFFFFF",
};

const sans   = "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif";
const serif  = "'Noto Serif JP', 'Yu Mincho', serif";
const enFont = "'Cormorant Garamond', Georgia, serif";

const PAGES = [
  { ja:"ホーム",       en:"HOME",    url:"/",          title:"MI-ZA（ミーザ）｜在宅医療AI伴走サービス・チームビルディング・医療DX支援",    desc:"在宅医療・訪問診療クリニック専門のコンサルティング会社MI-ZA（ミーザ）。在宅医療の経営支援・事務長支援・チームビルディング・生成AI実装・医療DX支援・ホームページ制作まで対応。" },
  { ja:"サービス",     en:"SERVICE", url:"/service/",  title:"在宅医療コンサルティングのサービス内容｜MI-ZA（ミーザ）",    desc:"MI-ZA（ミーザ）の在宅医療コンサルティングサービス。経営企画・組織開発・マーケティングの3つの軸で訪問診療クリニックの院長をサポートします。" },
  { ja:"支援事例",     en:"CASE",    url:"/cases/",    title:"支援事例（個別コンサルティング）｜MI-ZA（ミーザ）在宅医療・訪問診療クリニック専門",         desc:"MI-ZA（ミーザ）の個別コンサルティング・AI伴走サービスの支援事例。訪問診療・在宅医療クリニックの実際のご相談と支援内容をご紹介します。生成AIサブスクリプションの事例は2026年5月開始後、順次掲載予定。" },
  { ja:"会社概要",     en:"COMPANY", url:"/company/",  title:"会社概要｜MI-ZA（ミーザ）在宅医療・訪問診療クリニック専門の経営・伴走支援",         desc:"MI-ZA（ミーザ）の会社概要。在宅医療・訪問診療クリニックの経営を、生成AI×現役事務長のAI伴走サービスで支援するコンサルティング会社です。" },
  { ja:"スタッフ",     en:"STAFF",  url:"/member/",   title:"スタッフ｜MI-ZA（ミーザ）在宅医療・訪問診療クリニック専門の経営・伴走支援",         desc:"MI-ZA（ミーザ）のスタッフ紹介。訪問診療・在宅医療クリニック専門の経営コンサルタント＋生成AI伴走チームです。" },
  { ja:"ブログ",       en:"BLOG",    url:"/blog/",     title:"ブログ｜MI-ZA（ミーザ）在宅医療・訪問診療クリニック専門の経営・伴走支援",           desc:"MI-ZA（ミーザ）公式ブログ。在宅医療・訪問診療の経営・診療報酬・組織づくり・生成AI活用／AI伴走サービスの実践事例を発信。" },
  { ja:"お問い合わせ", en:"CONTACT", url:"/contact/",  title:"お問い合わせ｜MI-ZA（ミーザ）在宅医療・訪問診療クリニック専門の経営・伴走支援",     desc:"MI-ZA（ミーザ）へのお問い合わせ。訪問診療・在宅医療クリニックの経営・AI伴走サービス・生成AI実装に関するご相談はこちらから。" },
  { ja:"プライバシーポリシー", en:"PRIVACY", url:"/privacy/", title:"プライバシーポリシー｜MI-ZA（ミーザ）在宅医療・訪問診療クリニック専門の経営・伴走支援", desc:"MI-ZA（ミーザ）のプライバシーポリシー。個人情報の取り扱いについて。" },
  { ja:"サービス導入",       en:"APPLY",   url:"/contact/",         title:"サービス導入｜MI-ZA（ミーザ）在宅医療AIサブスクリプション",                                       desc:"MI-ZA（ミーザ）のサブスクリプションサービスお申込み。在宅医療クリニック向けAI伴走サービスのプラン選択ページ。" },
  { ja:"申込フォーム",       en:"APPLY FORM", url:"/contact/", title:"申込フォーム｜MI-ZA（ミーザ）サービス導入",                                                       desc:"MI-ZA（ミーザ）サブスクリプションサービスの申込フォーム。クリニック情報・電子カルテ種別・プラン選択を入力してください。" },
  { ja:"面談予約",           en:"BOOKING", url:"/contact/", title:"キックオフ面談予約｜MI-ZA（ミーザ）サービス導入",                                                desc:"MI-ZA（ミーザ）サービス導入のキックオフ面談予約。30分Zoomで業務状況・課題を伺い、設定方針をご提案します。" },
  { ja:"申込完了",           en:"THANKS",  url:"/contact/",  title:"申込完了｜MI-ZA（ミーザ）サービス導入",                                                          desc:"MI-ZA（ミーザ）サービス導入のお申込みを受付しました。2営業日以内にご連絡いたします。" },
  { ja:"在宅医療事務長の仕事", en:"BLOG 1", url:"/blog/home-medical-secretary-day/", title:"在宅医療事務長の仕事の全体像：医事課・経営分析・渉外・組織開発まで広がる8領域｜MI-ZA",                                                       desc:"事務長の仕事はひとつではありません。医事課上がり型・データ分析型・渉外型・組織開発型——バックグラウンドにより重心が違います。在宅医療クリニックの事務長業務を8領域に整理し、タイプ別の特徴と、事務長機能をどう確保するかを10年経験者が解説します。" },
  { ja:"2026年改定対応",     en:"BLOG 2", url:"/blog/2026-reimbursement-revision/", title:"2026年診療報酬改定で在宅医療クリニックが対応すべき5項目｜MI-ZA",                                       desc:"2026年診療報酬改定で在宅医療クリニックが押さえるべき5つの実務ポイント。BCP策定・施設基準・加算対応を現役事務長が解説。" },
  { ja:"マイティーチェッカー比較", en:"BLOG 3", url:"/blog/mighty-checker-comparison/", title:"マイティーチェッカーとMI-ZAの病名チェック・レセプト事前チェックは何が違うのか｜MI-ZA",                  desc:"レセプト点検ソフト「マイティーチェッカー」とMI-ZAのAI×事務長レセチェックの違いを解説。在宅医療特有の病名・指示書・加算要件を網羅するMI-ZAの設計思想。" },
];

/* ─── Fade ─── */
function useFade() {
  const ref = useRef(null);
  const [vis, setVis] = useState(true);
  return [ref, vis];
}

function F({ children, delay = 0 }) {
  const [ref, vis] = useFade();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(19px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── Layout ─── */
function Sec({ children, bg = C.white, py = 88 }) {
  return (
    <section style={{ background: bg, padding: `${py}px 25px` }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function WideSec({ children, bg = C.white, py = 88 }) {
  return (
    <section style={{ background: bg, padding: `${py}px 25px` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function SH({ en, ja }) {
  return (
    <F>
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: enFont, fontSize: 12, color: C.light, letterSpacing: 4, marginBottom: 8 }}>{en}</p>
        <h2 style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.navy, textWrap: "balance" }}>{ja}</h2>
      </div>
    </F>
  );
}

function P({ children, style: s = {} }) {
  return (
    <p style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.85, color: C.dark, marginBottom: 16, ...s }}>
      {children}
    </p>
  );
}

function Btn({ children, href, onClick, full = false, type = "button", disabled = false }) {
  const s = {
    background: C.navy, color: C.white, border: "none",
    padding: "15px 41px", cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: sans, fontSize: 14, fontWeight: 600, letterSpacing: 1,
    transition: "opacity 0.2s", textDecoration: "none", display: "inline-block",
    width: full ? "100%" : "auto", boxSizing: "border-box",
    opacity: disabled ? 0.6 : 1,
  };
  if (href) return (
    <a href={href} className="mz-btn" style={s}>{children}</a>
  );
  return (
    <button type={type} onClick={onClick} className="mz-btn" disabled={disabled} style={s}>{children}</button>
  );
}

/* ─── Nav ─── */
function Nav({ cur, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const transparent = cur === 0 && !scrolled;
  const nav = (i) => { go(i); setMenuOpen(false); };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: transparent ? "transparent" : "rgba(255,255,255,0.97)",
      borderBottom: transparent ? "none" : `2px solid ${C.line}`,
      transition: "all 0.3s",
    }}>
      <div className="site-header-inner" style={{
        maxWidth: 1000, margin: "0 auto", padding: "0 29px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 120,
      }}>
        <img
          className="site-logo"
          src={transparent ? "logo-white.svg" : "logo-color.svg"}
          alt="MI-ZA（ミーザ）"
          onClick={() => nav(0)}
          style={{ height: 99, width: "auto", cursor: "pointer", display: "block" }}
        />

        {/* Desktop */}
        <div className="pc-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[0, 1, 4, 2, 3, 5, 12].map(i => {
            const p = PAGES[i];
            return (
              <a key={i} href={p.url} onClick={(e) => { e.preventDefault(); nav(i); }} style={{
                textDecoration: "none", background: "none", cursor: "pointer",
                fontFamily: sans, fontSize: 13, letterSpacing: 1, padding: 0,
                color: transparent
                  ? (cur === i ? C.white : "rgba(255,255,255,0.9)")
                  : (cur === i ? C.navy  : C.mid),
                fontWeight: cur === i ? 700 : 400,
                transition: "color 0.3s",
              }}>{p.ja}</a>
            );
          })}
        </div>

        {/* Hamburger */}
        <button className="sp-nav" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"} aria-expanded={menuOpen} aria-controls="sp-mobile-nav" style={{
          background: "none", border: "none", cursor: "pointer",
          display: "none", padding: 6, flexDirection: "column", gap: 5,
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 2,
              background: transparent ? C.white : C.navy,
              marginBottom: i < 2 ? 5 : 0,
              transition: "all 0.25s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(6px,6px)"
                : i === 2 ? "rotate(-45deg) translate(6px,-6px)"
                : "none"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div id="sp-mobile-nav" role="navigation" aria-label="モバイルメニュー" style={{ background: C.white, borderTop: `2px solid ${C.line}` }}>
          {[0, 1, 4, 2, 3, 5, 12].map((i, idx, arr) => {
            const p = PAGES[i];
            return (
              <a key={i} href={p.url} onClick={(e) => { e.preventDefault(); nav(i); }} style={{
                display: "block", width: "100%",
                background: "none", cursor: "pointer",
                fontFamily: sans, fontSize: 15, textAlign: "left",
                padding: "15px 29px",
                color: cur === i ? C.navy : C.mid,
                fontWeight: cur === i ? 700 : 400,
                borderBottom: idx < arr.length - 1 ? `2px solid ${C.line}` : "none",
                textDecoration: "none",
              }}>{p.ja}</a>
            );
          })}
        </div>
      )}
    </nav>
  );
}

/* ─── HOME ─── */
const CHALLENGES = [
  { title: "院長がいないと動かない",                   desc: "訪問診療中に問題が起きても、スタッフが判断できずに院長の帰りを待っている。院長のスマホには1日30件以上の連絡が来る。" },
  { title: "忙しいのに利益が残らない",                 desc: "患者数は増えているのに、なぜか手元に残るお金が減っている。人件費が何%なのか、すぐに答えられない。" },
  { title: "看護師や医事の連鎖退職の発生",     desc: "一人辞めると残ったスタッフへの負荷が増え、疲弊が拡がり、さらにまた一人辞めてしまう。補充採用が追いつかず、さらにスタッフが辞めないかと不安が拡がる。" },
  { title: "算定できているはずの加算が、取れていない", desc: "診療報酬の改定内容を把握する担当者がいない。要件を満たしているのに気づかず、数ヶ月分の加算を取りこぼしていた。" },
];

const FUNCTIONS = [
  { n: "01", t: "経営企画", v: "経営を動かす", d: "制度・数字・データを整理・分析し、院長が根拠を持って判断できる状態をつくる" },
  { n: "02", t: "組織開発", v: "組織と人を活かす", d: "人・チーム・仕組みを構築し、院長がいなくても動く組織をつくる" },
  { n: "03", t: "マーケティング", v: "地域に広める", d: "地域・広報・情報発信を整え、選ばれ続けるクリニックをつくる" },
];

const STATS = [
  { n: "7年+",   label: "支援実績" },
  { n: "14機関", label: "支援機関数" },
  { n: "6年連続", label: "学会講演" },
];

const VOICES = [
  { src: "在支診（関東）", q: "組織が不安定だったときに入っていただき、大分落ち着いた。その後、組織が安定したからか、収益も上がった。組織の良さを活かしてくれた。" },
  { src: "在支病（東海）", q: "管理者の研修をお願いしたが、自らが主体的に課題を拾って考える素地が身についた。" },
  { src: "在支診（関東）", q: "部署を超えて意見をまとめる必要な場で合意形成を支援してくれた。利害関係はないが、現場の感覚がわかる人が入ることで、意見がまとまった。" },
  { src: "在支病（関東）", q: "退職が増えている中入っていただき、課題を抽出し分析して対策を出してくれたので、これからの方針を確かに決めていくことができた。自院だけでは何もできなかった。" },
];

// NewsletterForm: お問い合わせフォームへ誘導するボタン式（旧 form 入力廃止）
function NewsletterForm({ go }) {
  return (
    <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} className="mz-btn" style={{
      display: "inline-block",
      background: C.gold, color: C.white, border: "none",
      padding: "12px 28px",
      fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
      fontSize: 14, fontWeight: 700, letterSpacing: 1.5,
      textDecoration: "none", cursor: "pointer",
    }}>メルマガを申し込む →</a>
  );
}

function Home({ go }) {
  return (
    <>
      {/* Hero */}
      <section className="hero-section" style={{
        minHeight: "auto",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        backgroundColor: C.navy,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        padding: "120px 29px 88px",
        overflow: "hidden",
      }}>
        <div style={{ textAlign: "center", maxWidth: 680, position: "relative", zIndex: 2 }}>
          <F>
            <p style={{ fontFamily: enFont, fontSize: 11, letterSpacing: 5, color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>
              IN-HOME MEDICAL CARE MANAGEMENT
            </p>
          </F>
          <F delay={0.15}>
            <h1 className="hero-title" style={{
              fontFamily: serif,
              fontSize: "clamp(21px, 3.8vw, 31px)",
              fontWeight: 700, color: C.white,
              lineHeight: 1.85, letterSpacing: 2, marginBottom: 22,
            }}>
              チームビルディングから、AIの実装まで。<br />一連の流れに、ひとつの呼吸を。
            </h1>
          </F>
          <F delay={0.3}>
            <p style={{ fontFamily: sans, fontSize: 12, color: C.gold, letterSpacing: 2, marginBottom: 18, wordBreak: "keep-all" }}>
              院長・看護師・事務に並走し、自院に育つAIで日々を支える。
            </p>
          </F>
          <F delay={0.42}>
            <p className="hero-sub" style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.95, marginBottom: 28, letterSpacing: 0.5 }}>
              増収・経費減を、<strong style={{ color: C.gold, fontWeight: 700 }}>組織生産性向上</strong>と共に実現する。
            </p>
          </F>
          <F delay={0.54}>
            <a href="/service/" onClick={(e) => { e.preventDefault(); go(1); }} className="mz-btn" style={{
              background: C.gold, color: C.white, border: "none",
              padding: "14px 46px", cursor: "pointer",
              fontFamily: sans, fontSize: 15, fontWeight: 700, letterSpacing: 2,
              transition: "opacity 0.2s", textDecoration: "none", display: "inline-block",
            }}>サービスを見る</a>
          </F>
        </div>
      </section>

      {/* Why MI-ZA Now（差別化1行・コンセプト画像背景） */}
      <Sec py={48} bg={C.bg}>
        <F>
          <div className="bg-concept-care" style={{ maxWidth: 920, margin: "0 auto", position: "relative", overflow: "hidden", minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center", backgroundSize: "cover", backgroundPosition: "center", padding: "44px 24px", borderLeft: `4px solid ${C.gold}` }}>
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <p style={{ fontFamily: enFont, fontSize: 11, color: C.gold, letterSpacing: 4, marginBottom: 10, fontWeight: 700 }}>WHY MI-ZA, NOW</p>
              <p style={{ fontFamily: serif, fontSize: 18, color: C.navy, fontWeight: 700, lineHeight: 1.7 }}>
                在宅医療<strong className="why-accent" style={{ color: C.gold }}>特化</strong> ×<br className="sp-only-br" />
                事務長経験10年超の<strong className="why-accent why-accent-2" style={{ color: C.gold }}>現場力</strong> ×<br className="sp-only-br" />
                AI<strong className="why-accent why-accent-3" style={{ color: C.gold }}>実装</strong>
              </p>
              <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85, marginTop: 12 }}>
                この3点が揃うのは MI-ZA だけ。在宅医療の現場で磨かれた最新の生成AIサービスを提供します。
              </p>
            </div>
          </div>
        </F>
      </Sec>

      {/* Challenge */}
      <Sec>
        <SH en="CHALLENGE" ja="こんな状況、ありませんか？" />
        {/* Challenge イメージ2枚 */}
        <F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 24, maxWidth: 920, margin: "0 auto 24px" }}>
            <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="photo-challenge-doctor.webp" type="image/webp" />
                <img src="photo-challenge-doctor.jpg" alt="一人で抱え込む院長の悩み" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </picture>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 14px", background: "linear-gradient(transparent, rgba(0,0,0,0.65))", color: C.white }}>
                <p style={{ fontFamily: serif, fontSize: 13, fontWeight: 700, color: C.white, margin: 0 }}>判断の重さ — 院長一人で抱え込む</p>
              </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="photo-challenge-papers.webp" type="image/webp" />
                <img src="photo-challenge-papers.jpg" alt="積み上がる書類業務" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </picture>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 14px", background: "linear-gradient(transparent, rgba(0,0,0,0.65))", color: C.white }}>
                <p style={{ fontFamily: serif, fontSize: 13, fontWeight: 700, color: C.white, margin: 0 }}>業務量の重さ — 月末の書類とレセ対応</p>
              </div>
            </div>
          </div>
        </F>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(281px, 1fr))",
          gap: 12, marginBottom: 40,
        }}>
          {CHALLENGES.map((c, i) => (
            <F key={i} delay={i * 0.07}>
              <div style={{
                padding: "23px 21px",
                borderLeft: `3px solid ${[C.accent, C.sun, C.coral, C.sky][i]}`,
              }}>
                <p style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 8, lineHeight: 1.6 }}>{c.title}</p>
                <p style={{ fontFamily: sans, fontSize: 15, color: C.mid, lineHeight: 1.9 }}>{c.desc}</p>
              </div>
            </F>
          ))}
        </div>
        <F delay={0.35}>
          <P>在宅医療クリニックの院長は、就業時間の大半を訪問先の施設や患者宅、そして移動時間に費やします。その間、組織は院長の目の届かない場所で動いています。経営・電子カルテ管理・各種書類作成・レセ算定・スタッフ管理（採用含）・診療報酬改定への対応——それらを一人で判断、フォローし続けることには、物理的にも精神的にも限界があります。</P>
          <P><strong>MI-ZAは、クリニックが抱える課題解決にアドバイスするだけでなく、</strong>変化が根づくまで一緒に考え、最新他院事例を基に、組織の改善を促していきます。</P>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, marginTop: 16, lineHeight: 1.85 }}>
            📖 関連記事：
            <a href="/blog/home-medical-secretary-day/" onClick={(e) => { e.preventDefault(); go(12); }} style={{ color: C.accent, textDecoration: "underline", marginLeft: 4 }}>事務長の1日</a>
            <span style={{ marginLeft: 8, marginRight: 8 }}>／</span>
            <a href="/blog/2026-reimbursement-revision/" onClick={(e) => { e.preventDefault(); go(13); }} style={{ color: C.accent, textDecoration: "underline" }}>2026年診療報酬改定対応</a>
          </p>
        </F>
      </Sec>

      {/* SOLUTIONS — 4課題 → MI-ZA の打ち手マッピング */}
      <Sec py={56} bg={C.bg}>
        <SH en="SOLUTIONS" ja="それぞれの課題に、MI-ZAはこう応えます" />
        <F>
          <div style={{ maxWidth: 920, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {[
              {
                c: "院長がいないと動かない",
                a: "スタッフが判断できる仕組みづくりと、事務長機能の代行・育成。判断の集中を解消し、組織として動ける状態へ。",
                s: ["個別コンサル「組織開発」", "個別コンサル「経営相談（壁打ち）」"],
              },
              {
                c: "忙しいのに利益が残らない",
                a: "月次の損益・人件費・単価を可視化し、ボトルネックを特定。書類作成や事務作業については、業務自動化を含めた生成AIによる業務効率化を実現、利益体質に。",
                s: ["AI伴走サービス（月次レポート）", "個別コンサル「経営企画」"],
              },
              {
                c: "看護師や医事の連鎖退職の発生",
                a: "標準業務から、他職種との業務分担の最適化や、生成AIによる事務負荷を軽減し、看護師が本来の看護に専念できる環境を少しづつ実現。並行して採用・定着の仕組みを整備していく。",
                s: ["AI伴走サービス", "個別コンサル「組織開発」"],
              },
              {
                c: "加算が取れていない",
                a: "レセファイル分析による一次分析、1号用紙や2号用紙のAIを活用した自動収集・分析によるレセ処理サポート、診療報酬改定時のシミュレーションや算定可能加算の取得対応も伴走。",
                s: ["AI伴走サービス（病名チェック・改定対応）"],
              },
            ].map((item, i) => (
              <div key={i} style={{ background: C.white, padding: "24px 24px", borderTop: `3px solid ${[C.accent, C.sun, C.coral, C.sky][i]}`, display: "flex", flexDirection: "column" }}>
                <p style={{ fontFamily: enFont, fontSize: 11, color: [C.accent, C.sun, C.coral, C.sky][i], letterSpacing: 3, marginBottom: 6 }}>0{i+1}</p>
                <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 10, lineHeight: 1.5 }}>{item.c}</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85, marginBottom: 14, flexGrow: 1 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </F>
        <F delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href="/service/" onClick={(e) => { e.preventDefault(); go(1); }} style={{ fontFamily: sans, fontSize: 13, color: C.navy, background: "transparent", border: `2px solid ${C.navy}`, padding: "11px 29px", letterSpacing: 1, transition: "all 0.2s", textDecoration: "none", display: "inline-block" }}
              onMouseOver={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.white; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.navy; }}>
              サービス全体を見る →
            </a>
          </div>
        </F>
      </Sec>

      {/* TRUST BADGES (Hero下・信頼バッジ3点) */}
      <Sec py={56} bg={C.white}>
        <F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, maxWidth: 920, margin: "0 auto" }}>
            {[
              { ic: "01", t: "在宅事務長 10年以上の現場力", d: "代表・役員は在宅事務長10年超の経験を有し、多くのクリニックで業務の仕組み化・チームビルディング・診療報酬最適化・トラブル対応等を実体験で蓄積・共有しています。難しいスタッフの中でも数多くの成果を実現しています。", img: "photo-jimucho-desk.jpg", alt: "在宅医療事務長の業務イメージ — 計算機とノート" },
              { ic: "02", t: "自院に育つ、専属AIを実装", d: "医師の声がカルテに、書類とレセはAIが下書き、レポートも分析。自院仕様にチューニングされた専属AIが、日々の業務を生成AIが自動化しサポートします。事務長は判断と顧客対応に集中できます。", img: "photo-ai-collab.jpg", alt: "自院に育つ専属AI ― 医師の音声・書類・レセ業務を支援" },
              { ic: "03", t: "1週間無料お試し可能", d: "サービス開始までの設定期間中（最長1週間）は無料。気に入ればそのまま継続利用可能。クレジットカード登録不要・サービス開始後の請求書払い。", img: null, alt: "" },
            ].map((b, i) => (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.line}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {b.img && (
                  <div style={{ height: 140, overflow: "hidden", background: C.bg }}>
                    <picture style={{ display: "contents" }}>
                      <source srcSet={b.img.replace(/\.jpg$/, '.webp')} type="image/webp" />
                      <img src={b.img} alt={b.alt} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </picture>
                  </div>
                )}
                {!b.img && (
                  <div style={{ height: 140, background: `linear-gradient(135deg, ${C.bg} 0%, rgba(201,169,90,0.15) 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 36, color: C.gold, fontFamily: serif, fontWeight: 700, letterSpacing: 4 }}>無料お試し</span>
                  </div>
                )}
                <div style={{ padding: "16px 18px", borderTop: `3px solid ${C.gold}` }}>
                  <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 3, marginBottom: 8 }}>0{i+1}</p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 8, lineHeight: 1.5 }}>{b.t}</p>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85 }}>{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </F>
      </Sec>

      {/* SERVICES — 4サービス概要 */}
      <Sec py={72} bg={C.white}>
        <SH en="SERVICES" ja="4 つのサービス" />
        <F>
          <div style={{ maxWidth: 920, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { n: "01", t: "AI伴走サービス", d: "自院に育つ専属AIで、書類作成・レセ事前チェック・医師音声カルテ・月次分析を自動化。月単位契約。" },
              { n: "02", t: "個別コンサルティング", d: "経営企画・組織開発・マーケティングの3軸で、院長と現場の判断を支援。半年・1年契約で伴走します。" },
              { n: "03", t: "事務長養成プログラム", d: "現役事務長経験者が直接伝える、3ヶ月・全12回の個別育成プログラム。実務の優先順位から院長との関わり方まで。" },
              { n: "04", t: "ホームページ製作", d: "医療広告ガイドライン準拠のホームページ・医師採用ページ・広報誌制作。ロゴ・イラスト制作にも対応します。" },
            ].map((s, i) => (
              <div key={i} style={{ background: C.white, padding: "32px 24px", borderTop: `3px solid ${C.gold}`, display: "flex", flexDirection: "column" }}>
                <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 3, marginBottom: 8 }}>{s.n}</p>
                <p style={{ fontFamily: serif, fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 12, lineHeight: 1.5 }}>{s.t}</p>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85, marginBottom: 16, flexGrow: 1 }}>{s.d}</p>
                <a href="/service/" onClick={(e) => { e.preventDefault(); go(1); }} style={{ fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline", fontWeight: 600, alignSelf: "flex-start" }}>
                  詳細を見る →
                </a>
              </div>
            ))}
          </div>
        </F>
      </Sec>

      {/* MAIN SERVICE — AI伴走サービス */}
      <Sec bg={C.bg} py={72}>
        <F>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>MAIN SERVICE</p>
            <h2 style={{ fontFamily: sans, fontSize: 24, fontWeight: 700, color: C.navy, marginBottom: 12, textWrap: "balance" }}>
              01　AI伴走サービス
            </h2>
            <p style={{ fontFamily: serif, fontSize: 17, color: C.gold, fontWeight: 700, lineHeight: 1.7, marginBottom: 8 }}>
              最新AI技術をお届けします。
            </p>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85 }}>
              在宅医療クリニックの業務全体に、AI×現役事務長が月単位で伴走。<br className="sp-only-br" />
              常に最新のAI技術で、院長と現場の負担を軽くしていきます。
            </p>
            <p style={{ fontFamily: sans, fontSize: 12, color: C.gold, fontWeight: 700, marginTop: 10, lineHeight: 1.7 }}>
              ※ 対応カルテ・レセコン：<strong>モバカルネット＋ORCA</strong>（この組合せのみ対応）
            </p>
          </div>
        </F>
        {/* AI伴走サービス・メインカード */}
        <F delay={0.05}>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <div className="bg-ai-tablet" style={{ backgroundColor: C.navy, backgroundSize: "cover", backgroundPosition: "center", padding: "40px 32px", borderTop: `5px solid ${C.gold}`, position: "relative" }}>
              <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.gold, color: C.white, fontSize: 11, fontWeight: 700, padding: "4px 14px", letterSpacing: 2, whiteSpace: "nowrap" }}>⭐ MAIN SERVICE</span>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <p style={{ fontFamily: enFont, fontSize: 11, color: C.gold, letterSpacing: 4, marginBottom: 8, fontWeight: 700 }}>AI EMBEDDED PARTNER</p>
                <h3 style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: C.white, marginBottom: 12, lineHeight: 1.4 }}>AI伴走サービス</h3>
                <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.85, maxWidth: 620, margin: "0 auto" }}>
                  月2回×1時間のオンライン定例（Zoom）＋月32時間リモートによる生成AI稼働で、レセプト事前チェック・指示書下書き・月次レポート・データ分析まで業務全体に伴走します。全てオンライン対応のため全国どこのクリニック様でもご利用いただけます。
                </p>
              </div>

              {/* 含まれるサービス */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
                {[
                  { icon: "📋", title: "レセプト事前AIチェック", h: "週次", d: "病名・算定・加算・施設基準を網羅的にチェック" },
                  { icon: "📝", title: "在宅医療における AI 活用", h: "", d: "音声カルテ入力・指示書下書き・書類自動化など、業務全体を AI で効率化" },
                  { icon: "📊", title: "月次レポート＋データ分析", h: "", d: "業務指標・医師パフォーマンス・累計効果" },
                  { icon: "💻", title: "AI支援（オンライン定例）", h: "月2回×1時間（Zoom）", d: "現状ヒアリング・課題整理・AI運用調整" },
                  { icon: "💬", title: "メール対応", h: "随時", d: "院長からのご相談に随時対応" },
                  { icon: "📧", title: "メルマガ購読", h: "週1回", d: "在宅医療最新情報・診療報酬・制度動向" },
                ].map((item, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.07)", padding: "14px 16px", borderLeft: `3px solid ${C.gold}` }}>
                    <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 4, lineHeight: 1.4 }}>
                      <span style={{ fontSize: 16, marginRight: 6 }}>{item.icon}</span>{item.title}
                    </p>
                    {item.h && <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, fontWeight: 700, marginBottom: 4 }}>{item.h}</p>}
                    <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{item.d}</p>
                  </div>
                ))}
              </div>

              {/* AI活用事例 */}
              <div style={{ marginBottom: 22, paddingTop: 8 }}>
                <p style={{ fontFamily: enFont, fontSize: 10, color: C.gold, letterSpacing: 3, marginBottom: 6, fontWeight: 700 }}>AI USE CASES</p>
                <h4 style={{ fontFamily: serif, fontSize: 16, color: C.white, fontWeight: 700, marginBottom: 4 }}>在宅医療における AI 活用事例</h4>
                <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 14, lineHeight: 1.7 }}>
                  上記の月次伴走に加え、貴院の状況に応じて以下のような AI 活用にも対応可能です。
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { h: "臨床支援", items: ["音声によるカルテ入力", "音声による新患メモの自動入力", "未来カルテ（予測カルテ）の自動生成", "訪問看護指示書作成の自動化", "紹介状・診療情報提供書の下書き自動生成", "オンコール時のトリアージ支援", "ポリファーマシーチェック", "医療材料・衛生材料の負担者判定"] },
                    { h: "レセプト・診療報酬", items: ["レセプトチェック（病名・多重投与・不要病名等）", "在宅医療充実体制加算の最適取得検討", "施設基準の充足状況モニタリング", "診療報酬改定の影響額シミュレーション"] },
                    { h: "経営分析", items: ["レセ締め即日の実績集計＋過去2年比較＋医師パフォーマンス分析（PPT自動作成）", "BU評価料のスタッフ配分検討", "患者紹介元・連携先の分析", "将来患者数・収益予測シミュレーション"] },
                    { h: "業務効率化", items: ["訪問ルートの最適化", "スタッフシフト・訪問スケジュール最適化", "カンファレンス・打合せ議事録の自動作成", "雇用契約書・労働条件通知書の自動生成"] },
                    { h: "その他", items: ["（オプション）WEBサイト構築サポート", "（オプション）BCP（事業継続計画）策定支援"] },
                  ].map((cat, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "12px 14px", borderTop: `2px solid ${C.gold}` }}>
                      <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{cat.h}</p>
                      <ul style={{ paddingLeft: 14, margin: 0 }}>
                        {cat.items.map((item, j) => (
                          <li key={j} style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,0.78)", lineHeight: 1.65, marginBottom: 4 }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 12, lineHeight: 1.6, textAlign: "center" }}>
                  ※ 上記はあくまでも活用例となります。実際の実装は貴院の状況・優先順位に応じて月次伴走の中で順次実装を進めます。
                </p>
              </div>

              {/* 料金・契約 */}
              <div style={{ background: "rgba(201,169,90,0.12)", padding: "20px 24px", marginBottom: 22, borderLeft: `4px solid ${C.gold}`, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div>
                  <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>月額料金</p>
                  <p style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 4 }}>月 ¥98,000<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 4 }}>（税別）／1事業所</span></p>
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>契約期間</p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.white }}>1年契約</p>
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>お試し</p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.white }}>1週間無料お試し</p>
                  <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>違約金なしでキャンセル可能</p>
                </div>
              </div>

              {/* CTA */}
              <div style={{ textAlign: "center" }}>
                <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ background: C.gold, color: C.white, border: "none", padding: "14px 40px", fontFamily: sans, fontSize: 15, fontWeight: 700, letterSpacing: 2, textDecoration: "none", display: "inline-block" }}>
                  AI伴走サービスを問い合わせてみる →
                </a>
              </div>
            </div>

          </div>
        </F>
        {/* マトリクス・補助プランは削除（AI伴走サービス1本に集約） */}
        <F delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <div style={{ padding: "16px 20px", background: C.white, border: `2px solid ${C.navy}`, maxWidth: 600, marginLeft: "auto", marginRight: "auto", textAlign: "left" }}>
              <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 6, letterSpacing: 0.5 }}>📋 ご契約後のご協力のお願い</p>
              <p style={{ fontFamily: sans, fontSize: 12, color: C.dark, lineHeight: 1.85, marginBottom: 6 }}>
                AI×現役事務長で精度を出すため、初期設定時に貴クリニックから次のような情報のご提供をお願いしています。<strong>設定作業はMI-ZAが代行</strong>しますが、データ抽出・連携・現場の運用情報共有にはクリニック側のご協力が不可欠です。
              </p>
              <ul style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.85, paddingLeft: 18, margin: 0 }}>
                <li>過去カルテ・訪問看護指示書（医師の文体学習用）</li>
                <li>レセプトデータ・保険病名（病名チェック用）</li>
                <li>経営数字・KPI（経営相談・月次レポート用）</li>
                <li>電子カルテ・請求システム種別／業務フロー</li>
              </ul>
              <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.7, marginTop: 8 }}>
                ※ 1週間無料お試し期間中もデータご提供のうえ運用を試していただきます。詳細は契約前のご面談でご案内します。
              </p>
            </div>
            <p style={{ marginTop: 12 }}>
              <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ fontFamily: sans, fontSize: 13, color: C.accent, textDecoration: "underline" }}>
                各プランの詳細を見る →
              </a>
            </p>
            <p style={{ marginTop: 8, fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85 }}>
              💡 参照記事：<a href="/blog/mighty-checker-comparison/" onClick={(e) => { e.preventDefault(); go(14); }} style={{ color: C.accent, textDecoration: "underline" }}>マイティーチェッカーとMI-ZAの病名チェック・レセプト事前チェックは何が違うのか</a>
            </p>
          </div>
        </F>
      </Sec>

      {/* Function (個別コンサルティング - コンパクト版・画像付き) */}
      <Sec bg={C.bg} py={56}>
        <F>
          <div style={{ maxWidth: 920, margin: "0 auto", background: C.white, display: "grid", gridTemplateColumns: "minmax(220px, 1fr) 2fr", gap: 0 }} className="consul-grid">
            <div style={{ position: "relative", overflow: "hidden", minHeight: 220 }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="photo-consul-support.webp" type="image/webp" />
                <img src="photo-consul-support.jpg" alt="MI-ZA 個別コンサルティング — オンライン伴走" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </picture>
            </div>
            <div style={{ padding: "28px 28px", borderLeft: `4px solid ${C.accent}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ fontFamily: enFont, fontSize: 11, color: C.accent, letterSpacing: 3, marginBottom: 4 }}>CONSULTING</p>
                  <h3 style={{ fontFamily: sans, fontSize: 17, fontWeight: 700, color: C.navy }}>個別コンサルティング</h3>
                </div>
                <span style={{ background: "#fff4e8", color: "#a65a17", fontFamily: sans, fontSize: 11, fontWeight: 700, padding: "4px 10px", letterSpacing: 1, alignSelf: "flex-start" }}>
                  現在フル稼働中
                </span>
              </div>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85, marginBottom: 14 }}>
                経営企画・組織開発・マーケティングの3領域で、テーマ別に個別ご相談をお受けしています。
              </p>
              <div style={{ background: C.bg, padding: "12px 14px", borderLeft: `3px solid ${C.gold}`, marginBottom: 14 }}>
                <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 4 }}>料金：ヒアリング後にお見積もり</p>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.navy, fontWeight: 700, marginBottom: 4 }}>
                  契約期間：半年契約 または 1年契約
                </p>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.6 }}>
                  現在は既存クリニック様で枠が埋まっており、新規受付は順番制でご案内しています。経営伴走の継続性を担保するため、半年・1年単位でのご契約となります。
                </p>
              </div>
              <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline", fontWeight: 600 }}>
                順番待ちエントリーはこちら →
              </a>
            </div>
          </div>
        </F>
      </Sec>

      {/* 単発サービス導線（軽い導線） */}
      <Sec py={56}>
        <F>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: enFont, fontSize: 11, color: C.accent, letterSpacing: 4, marginBottom: 8 }}>SINGLE SERVICES</p>
            <h3 style={{ fontFamily: sans, fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 16 }}>個別サービス</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 20 }}>
              <a href="/service/" onClick={(e) => { e.preventDefault(); go(1); }} style={{ background: C.bg, textDecoration: "none", display: "block", borderLeft: `3px solid ${C.gold}`, textAlign: "left", overflow: "hidden" }}>
                <picture style={{ display: "contents" }}>
                  <source srcSet="photo-jimucho-training.webp" type="image/webp" />
                  <img src="photo-jimucho-training.jpg" alt="事務長養成プログラム" loading="lazy" decoding="async" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                </picture>
                <div style={{ padding: "16px 18px" }}>
                  <p style={{ fontFamily: sans, fontSize: 11, color: C.accent, fontWeight: 700, marginBottom: 4 }}>📹 動画教材／買い切り（3ヶ月視聴）</p>
                  <p style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4 }}>事務長養成プログラム</p>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.6 }}>¥49,800 ／ 2026年8月販売開始予定</p>
                </div>
              </a>
              <a href="/service/" onClick={(e) => { e.preventDefault(); go(1); }} style={{ background: C.bg, textDecoration: "none", display: "block", borderLeft: `3px solid ${C.gold}`, textAlign: "left", overflow: "hidden" }}>
                <picture style={{ display: "contents" }}>
                  <source srcSet="photo-hp-build.webp" type="image/webp" />
                  <img src="photo-hp-build.jpg" alt="HP・採用ページ制作" loading="lazy" decoding="async" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                </picture>
                <div style={{ padding: "16px 18px" }}>
                  <p style={{ fontFamily: sans, fontSize: 11, color: C.accent, fontWeight: 700, marginBottom: 4 }}>🎨 プロジェクト型</p>
                  <p style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4 }}>HP・採用ページ制作</p>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.6 }}>在宅医療専門・コンテンツ作成も含む</p>
                </div>
              </a>
            </div>
            <a href="/service/" onClick={(e) => { e.preventDefault(); go(1); }} style={{ fontFamily: sans, fontSize: 13, color: C.accent, textDecoration: "underline" }}>
              全サービスを詳しく見る →
            </a>
          </div>
        </F>
      </Sec>

      {/* Results + Voice */}
      <Sec py={72}>
        <SH en="RESULTS" ja="実績" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(131px, 1fr))", gap: 16, marginBottom: 48 }}>
          {STATS.map((r, i) => (
            <F key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", padding: "25px 13px", borderBottom: `3px solid ${C.navy}` }}>
                <p style={{ fontFamily: enFont, fontSize: 31, fontWeight: 600, color: C.navy, marginBottom: 8 }}>{r.n}</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, letterSpacing: 1 }}>{r.label}</p>
              </div>
            </F>
          ))}
        </div>
        <F delay={0.2}>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.light, letterSpacing: 3, marginBottom: 8 }}>VOICE</p>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, marginBottom: 20, fontWeight: 600 }}>※ 以下は<strong style={{ color: C.navy }}>過去の個別コンサルティング支援実績</strong>におけるお声です。AI伴走サービス（2026年5月開始）の導入予定クリニック様のお声は、リリース後に順次掲載いたします。</p>
        </F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(281px, 1fr))", gap: 20 }}>
          {VOICES.map((v, i) => (
            <F key={i} delay={i * 0.07}>
              <div style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: 16, paddingTop: 4, paddingBottom: 4 }}>
                <p style={{ fontFamily: sans, fontSize: 14, color: C.dark, lineHeight: 1.7, marginBottom: 8 }}>「{v.q}」</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.light, letterSpacing: 0.5 }}>{v.src}</p>
              </div>
            </F>
          ))}
        </div>
      </Sec>

      {/* ブログ入口（事務長コラム） */}
      <Sec bg={C.navy} py={72}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>BLOG ／ COLUMN</p>
          <h2 style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 10, textWrap: "balance" }}>
            在宅医療事務長10年の知見を、<br className="sp-only-br" />記事で公開しています。
          </h2>
          <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.85 }}>
            サブスク・コンサルをご検討の前に、まず読み物としてMI-ZAの考え方をお試しいただけます。
          </p>
        </div>
        <F delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, maxWidth: 920, margin: "0 auto" }}>
            {BLOG_POSTS.slice(0, 3).map((p, i) => (
              <a key={p.id} href={p.url || `/blog/${p.slug}/`} onClick={(e) => { e.preventDefault(); go(p.id); }} style={{ background: C.white, padding: "20px 20px", textDecoration: "none", display: "flex", flexDirection: "column", borderTop: `4px solid ${C.gold}` }}>
                <p style={{ fontFamily: enFont, fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 6 }}>{p.category}</p>
                <p style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 8, lineHeight: 1.5, flex: 1 }}>{p.title}</p>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.7, marginBottom: 10 }}>{p.excerpt.slice(0, 70)}{p.excerpt.length > 70 ? '…' : ''}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.line}`, paddingTop: 8, fontSize: 11 }}>
                  <span style={{ fontFamily: sans, color: C.light }}>{p.date} ／ 約{p.readTime}分</span>
                  <span style={{ fontFamily: sans, color: C.accent, fontWeight: 700 }}>読む →</span>
                </div>
              </a>
            ))}
          </div>
        </F>
        <F delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href="/blog/" onClick={(e) => { e.preventDefault(); go(5); }} style={{ background: C.gold, color: C.white, padding: "12px 32px", fontFamily: sans, fontSize: 13, fontWeight: 700, letterSpacing: 2, textDecoration: "none", display: "inline-block" }}>
              ブログ記事一覧を見る →
            </a>
          </div>
        </F>
      </Sec>

      {/* Member Preview（コンパクト版・写真+1行プロフ） */}
      <Sec py={56}>
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <p style={{ fontFamily: enFont, fontSize: 11, color: C.accent, letterSpacing: 4, marginBottom: 6 }}>STAFF</p>
          <h3 style={{ fontFamily: sans, fontSize: 17, fontWeight: 700, color: C.navy }}>伴走サポーター</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 720, margin: "0 auto" }}>
          {[
            { role: "CEO", img: "photo-ceo.jpg", name: "代表取締役　石塚（波村）美絵", short: "事務長10年・組織開発／個別コンサル・03経営相談・事務長養成プログラム・HP制作 担当", alt: "石塚美絵 MI-ZA代表 在宅医療コンサルタント" },
            { role: "DIRECTOR", img: "photo-director.jpg", name: "取締役　石塚 秀俊", short: "現役事務長・AI実装／AI伴走サービス（レセプト事前チェック・訪問看護指示書下書き・月次レポート）のAI実装と現場実証 担当", alt: "石塚秀俊 MI-ZA取締役 在宅医療コンサルタント" },
          ].map((m, i) => (
            <F key={i} delay={i * 0.1}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 16px", background: C.bg }}>
                <picture style={{ display: "contents" }}>
                  <source srcSet={m.img.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img src={m.img} alt={m.alt} loading="lazy" decoding="async" width="56" height="56" style={{ width: 56, height: 56, flexShrink: 0, objectFit: "cover", objectPosition: "center top", borderRadius: "50%" }} />
                </picture>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: enFont, fontSize: 10, color: C.accent, letterSpacing: 2, marginBottom: 2 }}>{m.role}</p>
                  <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 2, lineHeight: 1.4 }}>{m.name}</p>
                  <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{m.short}</p>
                </div>
              </div>
            </F>
          ))}
        </div>
        <F delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <a href="/member/" onClick={(e) => { e.preventDefault(); go(4); }} style={{ fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline" }}>
              スタッフの詳細を見る →
            </a>
          </div>
        </F>
      </Sec>

      {/* 開発進行中ノート */}
      <Sec bg={C.bg} py={56}>
        <F>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", padding: "30px 26px", background: C.white, borderLeft: `4px solid ${C.gold}` }}>
            <p style={{ fontFamily: enFont, fontSize: 11, color: C.gold, letterSpacing: 4, marginBottom: 10, fontWeight: 700 }}>EVOLVING SERVICE</p>
            <p style={{ fontFamily: serif, fontSize: 18, color: C.navy, fontWeight: 700, marginBottom: 14, lineHeight: 1.5 }}>
              MI-ZAは、現在進行形で進化中です。
            </p>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.dark, lineHeight: 1.95 }}>
              本サイトに掲載中のサービスは <strong>2026年5月時点の構成</strong>です。<br className="sp-only-br" />
              他にも複数の機能・プランを並行して開発中で、<strong>準備が整い次第、随時リリース</strong>します。<br className="sp-only-br" />
              在宅医療現場の最新ニーズに応えるべく、立ち止まらずにサービスを磨き続けています。
            </p>
            <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.7, marginTop: 14 }}>
              ※ サブスク契約者には、新機能・新プランのリリースを優先的にご案内します。
            </p>
          </div>
        </F>
      </Sec>

      {/* メルマガ申込 */}
      <Sec py={64} bg={C.bg}>
        <F>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: enFont, fontSize: 11, color: C.gold, letterSpacing: 4, marginBottom: 8, fontWeight: 700 }}>NEWSLETTER</p>
            <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 12 }}>在宅医療の最新情報を、週1回メールで。</h3>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.95, marginBottom: 24 }}>
              診療報酬・制度動向・他院の事例など、院長と事務長に役立つ情報をお届けします。
            </p>
            <NewsletterForm go={go} />
            <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.7, marginTop: 14 }}>
              ※ 医療従事者以外はお断りすることがあります。配信停止はメール内のリンクからいつでも可能です。
            </p>
          </div>
        </F>
      </Sec>

      {/* CTA — 画像付き2カラム */}
      <Sec py={80}>
        <F>
          <div style={{ maxWidth: 920, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "stretch", background: C.white, border: `1px solid ${C.line}` }} className="cta-grid">
            <div style={{ position: "relative", overflow: "hidden", minHeight: 300 }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="photo-cta-zoom-doctor.webp" type="image/webp" />
                <img src="photo-cta-zoom-doctor.jpg" alt="MI-ZAとの30分Zoom相談 — 売り込みなし" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </picture>
            </div>
            <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
              <p style={{ fontFamily: serif, fontSize: 20, color: C.navy, letterSpacing: 1, marginBottom: 12, lineHeight: 1.5 }} className="sp-heading">現状を整理するところから、<br />始めませんか。</p>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85, marginBottom: 24 }}>
                Zoom 30分を通じて「貴院の課題」に基づき「使えるサービス」をご提案します。<br />
                売り込みなし・契約なしでもOKです。
              </p>
              <div>
                <Btn href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }}>無料相談申込み</Btn>
              </div>
            </div>
          </div>
        </F>
      </Sec>
    </>
  );
}

/* ─── SERVICE ─── */
const BRIDGE = [
  ["院長がいないと動かない",                   "院長不在時でも機能する権限委譲ルールを現場とともに設計します。「誰が何を決めるか」を明文化し、院長への連絡件数を減らす仕組みをつくります。"],
  ["忙しいのに利益が残らない",                 "月次の部門別・職種別損益を可視化し、人件費率の実態を把握します。数字の根拠をもとに、採用形態や残業管理の改善策を一緒に実行します。"],
  ["看護師や医事の連鎖退職の発生",     "離職の構造を現場ヒアリングで特定します。オンコール負荷の分散・面談の仕組みを導入し、辞めにくい組織に変えます。"],
  ["算定できているはずの加算が、取れていない", "改定のたびに施設基準と算定状況を網羅的に点検します。担当者を決め、取りこぼしゼロの確認プロセスを制度化します。"],
  ["誰かが辞めると業務が止まる",               "属人化リスクの高い業務を洗い出し、マニュアル整備・複数担当制・管理システムへの集約を段階的に進めます。"],
  ["中間管理職がいるのに、何も変わらない",     "任用要件と権限を明文化し、1on1・外部研修・定例会議の設計を行います。「院長に確認しなくていい判断」の範囲を広げます。"],
  ["2026年の改定に、まだ手をつけていない",     "BCP策定に必要な要素（訪問中被災・患者リスト・医薬品供給・安否確認・代替連絡）を施設基準に合わせて整備します。"],
];

const SERVICES = [
  {
    n:"01", t:"経営企画", v:"経営を動かす",
    sub:"制度・数字・打ち手を整理し、院長が根拠を持って判断できる状態をつくる",
    items:[
      {h:"診療報酬改定対応", p:"改定のたびに「何が変わり、現場にどう影響するか」を整理し、届出変更・算定点検・施設基準の確認・HP掲載要件まで一括で対応します。"},
      {h:"レセプト・算定データのAI活用", p:"レセプトデータをAIで分析し、算定漏れや要件の適否を客観的に点検します。「データに基づく評価」として整理することで、院長が現場に伝えやすい根拠をつくります。"},
      {h:"経営判断の支援", p:"損益分岐点の明確化、患者あたり単価・経費の分析など、院長が根拠を持って判断できる状態をつくります。"},
      {h:"各種申請・届出支援", p:"保健所や地方厚生局への申請書類作成、立入検査や個別指導時の対応についても助言いたします。"},
    ],
  },
  {
    n:"02", t:"組織開発", v:"組織を整える",
    sub:"人・チーム・仕組みを整え、院長とともに組織の最適な形をつくる",
    items:[
      {h:"院長の経営判断をサポート", p:"「他院はどうしているのか」「この判断で大丈夫か」——定期的な相談を通じて、院長が一人では持てない視点を提供します。"},
      {h:"事務長候補育成支援", p:"院長には伝えきれない、事務長としての実務や判断の仕方を、現役の事務長経験者が直接伝えます。全12回・3ヶ月の個別育成。扱うテーマ：診療報酬・算定の実務／収支・人件費の読み方／スタッフ指示・マネジメント／院長との情報共有の仕組み／組織課題の特定と改善実行。"},
      {h:"医師の採用・定着支援", p:"面接設計から入職前後のフォロー、案内資料作成まで、医師が安心して働ける体制を一緒に整えます。"},
    ],
  },
  {
    n:"03", t:"マーケティング", v:"地域に広める",
    sub:"地域・広報・情報発信を整え、地域から選ばれ続けるクリニックをつくる",
    items:[
      {h:"マーケティング戦略の立案・実行", p:"自院の強みの分析、患者構成の把握、競合との差別化など、データに基づいた戦略を立案し実行まで伴走します。"},
      {h:"地域連携の仕組みづくり", p:"病院・居宅介護支援事業所・訪問看護・薬局・施設など、地域の関係機関との信頼関係を築くための仕組みづくりを支援します。"},
      {h:"ホームページの作成・運用", p:"HP作成・運用、医師採用ページの企画、広報誌の制作、医療広告ガイドラインに準拠した情報発信を支援します。ロゴ・イラスト制作にも対応しています。", link:"https://www.instagram.com/miza_illustration/", linkText:"イラストデモ（Instagram）", link2:"https://note.com/miza_painting", linkText2:"フリーイラスト配布（note）"},
    ],
  },
];

const CASES = [
  {d:"在支診｜関東｜常勤医師5名", t:"医師採用のため自院の求人サイトを強化したい", p:"医師採用に苦戦しており、自院のHPでの求人情報を強化したいというご相談でした。", s:"院長へのヒアリングと訪問診療への同行から始め、自院の診療スタイルや文化を現場で把握。実務の流れを踏まえた上で、求人ページのコンテンツ構成・文章・レイアウトを一から作成しました。"},
  {d:"在支診｜関東｜常勤医師2名", t:"忙しいのに利益が残らない。原因が分からない", p:"患者数が少なく、スタッフが時間を持て余している一方で、院長だけが忙しい状態でした。", s:"月次の損益を部門別・職種別に整理し、収支の構造を図示。どこに何がかかっているかを院長と一緒に確認できる形に組み直しました。"},
  {d:"在支診｜関東｜常勤医師1名", t:"月1回、経営のことを相談できる相手がほしい", p:"日々の判断に迷うたびに「他院はどうしているのか」と一人で抱えていました。", s:"Zoomで1回、院長の壁打ち相手として関わりました。診療報酬改定の動き、他院の事例、組織運営の勘所など、判断の材料を一緒に整理しました。"},
  {d:"在支診｜関東｜常勤医師2名", t:"診療報酬改定のたびに対応が後手に回る", p:"改定のたびに整理が追いつかず、届出変更や算定の見直しが後手に回っていました。", s:"改定の内容を項目ごとに整理し、自院に関係する届出変更・算定要件・HP掲載要件を一覧化。対応漏れが出ないよう、順を追って確認・手続きを進めました。"},
  {d:"在支診｜関東｜常勤医師1名", t:"事務長経験のないスタッフを事務長に育てたい", p:"事務長経験のないスタッフを起用したいが、育てる時間がないというご相談でした。", s:"現役の事務長経験者が伴走する個別育成プログラムを実施。実務の優先順位の立て方、院長との関わり方、スタッフへの指示の出し方など、経験から直接伝えました。全12回・3ヶ月。"},
];

function Service({ go, scrollAnchorRef }) {
  useEffect(() => {
    const hashId = window.location.hash ? window.location.hash.slice(1) : null;
    const anchorId = scrollAnchorRef?.current || hashId;
    if (scrollAnchorRef) scrollAnchorRef.current = null;
    if (!anchorId) return;
    const el = document.getElementById(anchorId);
    if (el) {
      setTimeout(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }, 50);
    }
  }, []);
  return (
    <>
      <section style={{ background: `linear-gradient(rgba(15,34,56,0.78), rgba(15,34,56,0.86)), url(photo-hero-visit.jpg) center/cover no-repeat`, paddingTop: 108, paddingBottom: 60, textAlign: "center", position: "relative" }}>
        <F>
          <p style={{ fontFamily: enFont, fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: 5, marginBottom: 10 }}>SERVICE MAP</p>
          <h1 style={{ fontFamily: sans, fontSize: 25, color: C.white, fontWeight: 700, margin: 0 }}>MI-ZAのサービス全体</h1>
          <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 14, lineHeight: 1.85 }}>
            サブスク・単発・個別コンサルの<br className="sp-only-br" />3つのご利用方法をご用意しています
          </p>
        </F>
      </section>

      {/* サービス全体マップ（3カテゴリ早見表） */}
      <Sec py={64}>
        <F>
          <div style={{ marginBottom: 28, textAlign: "center" }}>
            <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>OVERVIEW</p>
            <h2 style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 8, textWrap: "balance" }}>3つのご利用方法</h2>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85 }}>
              貴院のニーズに合わせて、定額・単発・個別の3形態からお選びいただけます
            </p>
          </div>
        </F>
        <F delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 0 }}>
            {/* メイン：サブスク */}
            <a href="#sub-section" onClick={(e) => { e.preventDefault(); document.getElementById('sub-section').scrollIntoView({behavior:'smooth', block:'start'}); }} style={{ background: C.navy, color: C.white, textDecoration: "none", display: "block", position: "relative", borderTop: `4px solid ${C.gold}`, overflow: "hidden" }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="photo-ai-tablet.webp" type="image/webp" />
                <img src="photo-ai-tablet.jpg" alt="AIタブレットを操作するシーン" loading="lazy" decoding="async" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
              </picture>
              <div style={{ padding: "20px 22px" }}>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>🌟 メインサービス</p>
                <p style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 8 }}>サブスクリプション</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.85)", lineHeight: 1.85, marginBottom: 12 }}>
                  生成AIをフル活用したクリニック運営を目指すサブスクリプションサービス。生成AIの進化に合わせて、クリニックの成長と生産性向上を実現します。
                </p>
                <p style={{ fontFamily: sans, fontSize: 14, color: C.gold, fontWeight: 700 }}>月 ¥98,000（税別）／1事業所</p>
              </div>
            </a>
            {/* 単発 */}
            <a href="#single-section" onClick={(e) => { e.preventDefault(); document.getElementById('single-section').scrollIntoView({behavior:'smooth', block:'start'}); }} style={{ background: C.white, border: `2px solid ${C.line}`, textDecoration: "none", display: "block", overflow: "hidden" }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="photo-jimucho-training.webp" type="image/webp" />
                <img src="photo-jimucho-training.jpg" alt="事務長養成プログラム・動画教材" loading="lazy" decoding="async" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
              </picture>
              <div style={{ padding: "20px 22px" }}>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.accent, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>💼 単発・買い切り（動画教材は3ヶ月視聴）</p>
                <p style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 8 }}>動画教材・HP制作</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85, marginBottom: 12 }}>
                  必要なときだけご利用いただける単発サービス。買い切り型・プロジェクト型。
                </p>
                <p style={{ fontFamily: sans, fontSize: 14, color: C.dark, fontWeight: 700 }}>動画 ¥49,800（税別）／1人　／ HP 個別お見積</p>
              </div>
            </a>
            {/* 個別コンサル */}
            <a href="#consul-section" onClick={(e) => { e.preventDefault(); document.getElementById('consul-section').scrollIntoView({behavior:'smooth', block:'start'}); }} style={{ background: C.white, border: `2px solid ${C.line}`, textDecoration: "none", display: "block", overflow: "hidden" }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="photo-consul-support.webp" type="image/webp" />
                <img src="photo-consul-support.jpg" alt="個別コンサル・オンライン伴走" loading="lazy" decoding="async" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
              </picture>
              <div style={{ padding: "20px 22px" }}>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.accent, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>🤝 個別コンサル</p>
                <p style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 8 }}>テーマ別ご相談</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85, marginBottom: 12 }}>
                  経営企画・組織開発・マーケティングの3領域で個別に伴走。
                </p>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.dark, fontWeight: 700 }}>ヒアリング後にお見積もり<span style={{ fontSize: 11, color: "#a65a17", fontWeight: 600, marginLeft: 6 }}>※満枠</span></p>
              </div>
            </a>
          </div>
        </F>
      </Sec>

      {/* ① サブスクリプション概要 */}
      <Sec bg={C.bg} py={72}>
        <div id="sub-section" style={{ scrollMarginTop: 80 }}>
          <F>
            <div style={{ marginBottom: 28, textAlign: "center" }}>
              <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>① MAIN SERVICE</p>
              <h2 style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 10, textWrap: "balance" }}>サブスクリプション（月額制）</h2>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85 }}>
                在宅医療事務長10年の経験とAIで、業務全体に伴走します。<br className="sp-only-br" />4つのプランから貴院に合わせてお選びください。
              </p>
            </div>
          </F>
          {/* 医療DXコンセプトバナー */}
          <F delay={0.03}>
            <div style={{ maxWidth: 920, margin: "0 auto 24px", overflow: "hidden", position: "relative" }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="illust-medical-dx.webp" type="image/webp" />
                <img src="illust-medical-dx.jpg" alt="医療DX — レセプト点検・カルテ・AI・遠隔診療を統合" loading="lazy" decoding="async" style={{ width: "100%", aspectRatio: "3 / 1", objectFit: "cover", objectPosition: "left center", display: "block" }} />
              </picture>
              <div className="dx-banner-text" style={{ position: "absolute", top: "50%", right: "6%", transform: "translateY(-50%)", maxWidth: "44%", textAlign: "right" }}>
                <p style={{ fontFamily: enFont, fontSize: 13, color: C.navy, letterSpacing: 4, fontWeight: 700, marginBottom: 8 }}>MEDICAL DX</p>
                <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.navy, lineHeight: 1.5, marginBottom: 8 }}>レセプト点検も、カルテも、AIで。</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.dark, lineHeight: 1.85 }}>
                  在宅医療の業務全体を AI と現役事務長で支える、在宅医療DX 伴走パートナー。
                </p>
              </div>
            </div>
          </F>
          {/* AI伴走サービス・メインカード（トップから移植） */}
          <F delay={0.05}>
            <div style={{ maxWidth: 920, margin: "0 auto" }}>
              <div className="bg-ai-tablet" style={{ backgroundColor: C.navy, backgroundSize: "cover", backgroundPosition: "center", padding: "40px 32px", borderTop: `5px solid ${C.gold}`, position: "relative" }}>
                <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.gold, color: C.white, fontSize: 11, fontWeight: 700, padding: "4px 14px", letterSpacing: 2, whiteSpace: "nowrap" }}>⭐ MAIN SERVICE</span>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <p style={{ fontFamily: enFont, fontSize: 11, color: C.gold, letterSpacing: 4, marginBottom: 8, fontWeight: 700 }}>AI EMBEDDED PARTNER</p>
                  <h3 style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: C.white, marginBottom: 12, lineHeight: 1.4 }}>AI伴走サービス</h3>
                  <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.85, maxWidth: 620, margin: "0 auto" }}>
                    月2回×1時間のオンライン定例（Zoom）＋月32時間リモートによる生成AI稼働で、レセプト事前チェック・指示書下書き・月次レポート・データ分析まで業務全体に伴走します。全てオンライン対応のため全国どこのクリニック様でもご利用いただけます。
                  </p>
                </div>

                {/* 含まれるサービス */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
                  {[
                    { icon: "📋", title: "レセプト事前AIチェック", h: "週次", d: "病名・算定・加算・施設基準を網羅的にチェック" },
                    { icon: "📝", title: "在宅医療における AI 活用", h: "", d: "音声カルテ入力・指示書下書き・書類自動化など、業務全体を AI で効率化" },
                    { icon: "📊", title: "月次レポート＋データ分析", h: "", d: "業務指標・医師パフォーマンス・累計効果" },
                    { icon: "💻", title: "AI支援（オンライン定例）", h: "月2回×1時間（Zoom）", d: "現状ヒアリング・課題整理・AI運用調整" },
                    { icon: "💬", title: "メール対応", h: "随時", d: "院長からのご相談に随時対応" },
                    { icon: "📧", title: "メルマガ購読", h: "週1回", d: "在宅医療最新情報・診療報酬・制度動向" },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.07)", padding: "14px 16px", borderLeft: `3px solid ${C.gold}` }}>
                      <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 4, lineHeight: 1.4 }}>
                        <span style={{ fontSize: 16, marginRight: 6 }}>{item.icon}</span>{item.title}
                      </p>
                      {item.h && <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, fontWeight: 700, marginBottom: 4 }}>{item.h}</p>}
                      <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{item.d}</p>
                    </div>
                  ))}
                </div>

                {/* AI活用事例 */}
                <div style={{ marginBottom: 22, paddingTop: 8 }}>
                  <p style={{ fontFamily: enFont, fontSize: 10, color: C.gold, letterSpacing: 3, marginBottom: 6, fontWeight: 700 }}>AI USE CASES</p>
                  <h4 style={{ fontFamily: serif, fontSize: 16, color: C.white, fontWeight: 700, marginBottom: 4 }}>在宅医療における AI 活用事例</h4>
                  <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 14, lineHeight: 1.7 }}>
                    上記の月次伴走に加え、貴院の状況に応じて以下のような AI 活用にも対応可能です。
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                    {[
                      { h: "臨床支援", items: ["音声によるカルテ入力", "音声による新患メモの自動入力", "未来カルテ（予測カルテ）の自動生成", "訪問看護指示書作成の自動化", "紹介状・診療情報提供書の下書き自動生成", "オンコール時のトリアージ支援", "ポリファーマシーチェック", "医療材料・衛生材料の負担者判定"] },
                      { h: "レセプト・診療報酬", items: ["レセプトチェック（病名・多重投与・不要病名等）", "在宅医療充実体制加算の最適取得検討", "施設基準の充足状況モニタリング", "診療報酬改定の影響額シミュレーション"] },
                      { h: "経営分析", items: ["レセ締め即日の実績集計＋過去2年比較＋医師パフォーマンス分析（PPT自動作成）", "BU評価料のスタッフ配分検討", "患者紹介元・連携先の分析", "将来患者数・収益予測シミュレーション"] },
                      { h: "業務効率化", items: ["訪問ルートの最適化", "スタッフシフト・訪問スケジュール最適化", "カンファレンス・打合せ議事録の自動作成", "雇用契約書・労働条件通知書の自動生成"] },
                      { h: "その他", items: ["（オプション）WEBサイト構築サポート", "（オプション）BCP（事業継続計画）策定支援"] },
                    ].map((cat, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "12px 14px", borderTop: `2px solid ${C.gold}` }}>
                        <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{cat.h}</p>
                        <ul style={{ paddingLeft: 14, margin: 0 }}>
                          {cat.items.map((item, j) => (
                            <li key={j} style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,0.78)", lineHeight: 1.65, marginBottom: 4 }}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 12, lineHeight: 1.6, textAlign: "center" }}>
                    ※ 上記はあくまでも活用例となります。実際の実装は貴院の状況・優先順位に応じて月次伴走の中で順次実装を進めます。
                  </p>
                </div>

                {/* 料金・契約 */}
                <div style={{ background: "rgba(201,169,90,0.12)", padding: "20px 24px", marginBottom: 22, borderLeft: `4px solid ${C.gold}`, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>月額料金</p>
                    <p style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 4 }}>月 ¥98,000<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 4 }}>（税別）／1事業所</span></p>
                    </div>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>契約期間</p>
                    <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.white }}>1年契約</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>お試し</p>
                    <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.white }}>1週間無料お試し</p>
                    <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>違約金なしでキャンセル可能</p>
                  </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: "center" }}>
                  <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ background: C.gold, color: C.white, border: "none", padding: "14px 40px", fontFamily: sans, fontSize: 15, fontWeight: 700, letterSpacing: 2, textDecoration: "none", display: "inline-block" }}>
                    AI伴走サービスを問い合わせてみる →
                  </a>
                </div>
              </div>
            </div>
          </F>
          {/* 実装イメージ・ビジュアル（月次レポート / AI音声入力） */}
          <F delay={0.15}>
            <div style={{ maxWidth: 920, margin: "32px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              <div style={{ background: C.white, border: `1px solid ${C.line}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <picture style={{ display: "contents" }}>
                  <source srcSet="illust-monthly-report.webp" type="image/webp" />
                  <img src="illust-monthly-report.jpg" alt="月次レポート — 業務指標・医師パフォーマンス・累計効果を可視化" loading="lazy" decoding="async" style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", background: C.white, display: "block" }} />
                </picture>
                <div style={{ padding: "16px 18px", borderTop: `3px solid ${C.gold}` }}>
                  <p style={{ fontFamily: enFont, fontSize: 11, color: C.gold, letterSpacing: 3, marginBottom: 6, fontWeight: 700 }}>MONTHLY REPORT</p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 6, lineHeight: 1.5 }}>月次レポート＋データ分析</p>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85 }}>
                    業務指標・医師パフォーマンス・累計効果を毎月レポーティング。経営判断に必要な数字を可視化します。
                  </p>
                </div>
              </div>
              <div style={{ background: C.white, border: `1px solid ${C.line}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <picture style={{ display: "contents" }}>
                  <source srcSet="photo-doorstep.webp" type="image/webp" />
                  <img src="photo-doorstep.jpg" alt="AI支援（オンライン定例）— 月2回×1時間、現場のヒアリング・課題整理・AI運用調整" loading="lazy" decoding="async" style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block" }} />
                </picture>
                <div style={{ padding: "16px 18px", borderTop: `3px solid ${C.sky}` }}>
                  <p style={{ fontFamily: enFont, fontSize: 11, color: C.accent, letterSpacing: 3, marginBottom: 6, fontWeight: 700 }}>ONLINE SUPPORT</p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 6, lineHeight: 1.5 }}>月2回×1時間のオンラインAI支援（Zoom）</p>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85 }}>
                    現役事務長がZoomで、現場のヒアリング・課題整理・AI運用調整を直接実施。AI と人の両輪で伴走します。全てオンライン対応のため全国どこのクリニック様でもご利用いただけます。
                  </p>
                </div>
              </div>
            </div>
          </F>
          <F delay={0.25}>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <div style={{ padding: "16px 20px", background: C.white, border: `2px solid ${C.navy}`, maxWidth: 600, marginLeft: "auto", marginRight: "auto", textAlign: "left" }}>
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 6, letterSpacing: 0.5 }}>📋 ご契約後のご協力のお願い</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.dark, lineHeight: 1.85, marginBottom: 6 }}>
                  AI×現役事務長で精度を出すため、初期設定時に貴クリニックから次のような情報のご提供をお願いしています。<strong>設定作業はMI-ZAが代行</strong>しますが、データ抽出・連携・現場の運用情報共有にはクリニック側のご協力が不可欠です。
                </p>
                <ul style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.85, paddingLeft: 18, margin: 0 }}>
                  <li>過去カルテ・訪問看護指示書（医師の文体学習用）</li>
                  <li>レセプトデータ・保険病名（病名チェック用）</li>
                  <li>経営数字・KPI（経営相談・月次レポート用）</li>
                  <li>電子カルテ・請求システム種別／業務フロー</li>
                </ul>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.7, marginTop: 8 }}>
                  ※ 1週間無料お試し期間中もデータご提供のうえ運用を試していただきます。詳細は契約前のご面談でご案内します。
                </p>
              </div>
              <p style={{ marginTop: 8, fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85 }}>
                💡 参照記事：<a href="/blog/mighty-checker-comparison/" onClick={(e) => { e.preventDefault(); go(14); }} style={{ color: C.accent, textDecoration: "underline" }}>マイティーチェッカーとMI-ZAの病名チェック・レセプト事前チェックは何が違うのか</a>
              </p>
            </div>
          </F>
        </div>
      </Sec>

      {/* ② 単発・買い切り */}
      <Sec py={72}>
        <div id="single-section" style={{ scrollMarginTop: 80 }}>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>② INDIVIDUAL SERVICES</p>
          <h2 style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 10, textWrap: "balance" }}>個別サービス</h2>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85 }}>
            必要なときだけご利用いただける、買い切り型・プロジェクト型のサービスです。
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            {
              n: "01",
              t: "事務長養成プログラム（動画版）",
              d: "事務長10年の経験から、在宅医療クリニックの事務長業務を体系化した全12回（各1時間）の動画教材＋パワポ資料。3ヶ月間、繰り返し視聴可能。新任事務長の研修にも最適です。",
              tag: "動画教材／買い切り（3ヶ月視聴）",
              price: "¥49,800（税別）",
              priceNote: "🎁 発売記念 先着10名様 ¥39,800（税別）／ 動画12本×各1時間＋パワポ資料・3ヶ月間、繰り返し視聴可能",
              cta: "販売開始のお知らせを受け取る",
              ctaHref: "/contact/",
              ctaPage: 6,
              comingSoon: "2026年8月 販売開始予定",
            },
            {
              n: "02",
              t: "HP・採用ページ制作",
              d: "在宅医療クリニック専門の視点で、目的に合ったサイトを制作します。コンテンツ（原稿・写真・SEO）の作成まで一括対応。医療広告ガイドラインにも準拠。",
              tag: "プロジェクト型／オンライン対応",
              price: "ヒアリング後にお見積もり",
              priceNote: "コンテンツ作成（原稿・写真・SEO）・医療広告ガイドライン準拠チェックまで一括対応",
              cta: "ヒアリングを依頼する",
              ctaHref: "/contact/",
              ctaPage: 6,
            },
          ].map((s, i) => (
            <F key={i} delay={i * 0.1}>
              <div style={{ background: C.white, padding: "29px 25px", display: "flex", flexDirection: "column", borderTop: `4px solid ${C.gold}`, position: "relative" }}>
                {s.comingSoon && (
                  <div style={{ position: "absolute", top: -10, right: 16, background: C.accent, color: C.white, fontFamily: sans, fontSize: 10, fontWeight: 700, padding: "4px 12px", letterSpacing: 1 }}>
                    COMING SOON
                  </div>
                )}
                <p style={{ fontFamily: enFont, fontSize: 11, color: C.accent, letterSpacing: 3, marginBottom: 8 }}>{s.tag}</p>
                <p style={{ fontFamily: sans, fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 12 }}>{s.n}. {s.t}</p>
                {s.comingSoon && (
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 12, padding: "6px 10px", background: "rgba(61,107,142,0.08)", display: "inline-block", alignSelf: "flex-start" }}>
                    🗓 {s.comingSoon}
                  </p>
                )}
                <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.9, marginBottom: 16, flex: 1 }}>{s.d}</p>
                <div style={{ marginBottom: 12, padding: "12px 14px", background: C.bg, borderLeft: `3px solid ${C.gold}` }}>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{s.price}</p>
                  <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.6 }}>{s.priceNote}</p>
                </div>
                {s.optionTitle && (
                  <div style={{ marginBottom: 16, padding: "12px 14px", background: "rgba(201,169,90,0.08)", border: `1px solid ${C.gold}` }}>
                    <p style={{ fontFamily: sans, fontSize: 12, color: C.gold, fontWeight: 700, marginBottom: 4, letterSpacing: 0.5 }}>{s.optionTitle}</p>
                    <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{s.optionPrice}</p>
                    <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.7 }}>{s.optionDesc}</p>
                  </div>
                )}
                <a href={s.ctaHref} onClick={e => { e.preventDefault(); go(s.ctaPage); }} style={{ display: "inline-block", fontFamily: sans, fontSize: 12, color: C.navy, background: "transparent", border: `2px solid ${C.navy}`, padding: "10px 24px", letterSpacing: 1, transition: "all 0.2s", textDecoration: "none", alignSelf: "flex-start", fontWeight: 600 }}
                  onMouseOver={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.white; }}
                  onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.navy; }}>
                  {s.cta} →
                </a>
              </div>
            </F>
          ))}
        </div>
        </div>
      </Sec>

      {/* ③ 個別コンサルティング */}
      <Sec bg={C.bg} py={72}>
        <div id="consul-section" style={{ scrollMarginTop: 80 }}>
          <F>
            <div style={{ marginBottom: 28, textAlign: "center" }}>
              <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>③ INDIVIDUAL CONSULTING</p>
              <h2 style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 10, textWrap: "balance" }}>個別コンサルティング</h2>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85 }}>
                経営企画・組織開発・マーケティングの3領域で、テーマ別に個別ご相談をお受けしています。
              </p>
            </div>
          </F>
          <F delay={0.1}>
            <div style={{ maxWidth: 720, margin: "0 auto", background: C.white, borderLeft: `4px solid ${C.accent}`, overflow: "hidden" }}>
              <picture style={{ display: "contents" }}>
                <source srcSet="photo-clinic-meeting.webp" type="image/webp" />
                <img src="photo-clinic-meeting.jpg" alt="院内会議 — 院長・看護師・事務とMI-ZAの伴走" loading="lazy" decoding="async" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
              </picture>
              <div style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.navy }}>3領域：経営企画／組織開発／マーケティング</p>
                <span style={{ background: "#fff4e8", color: "#a65a17", fontFamily: sans, fontSize: 11, fontWeight: 700, padding: "4px 10px", letterSpacing: 1 }}>
                  現在フル稼働中
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 18 }}>
                {FUNCTIONS.map((f, i) => (
                  <div key={i} style={{ background: C.bg, padding: "16px 16px", borderTop: `3px solid ${C.navy}` }}>
                    <p style={{ fontFamily: enFont, fontSize: 18, color: C.line, fontWeight: 300, marginBottom: 6 }}>{f.n}</p>
                    <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{f.t}</p>
                    <p style={{ fontFamily: sans, fontSize: 11, color: C.accent, fontWeight: 600, marginBottom: 6 }}>─ {f.v}</p>
                    <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.7 }}>{f.d}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: C.bg, padding: "12px 14px", borderLeft: `3px solid ${C.gold}`, marginBottom: 14 }}>
                <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 4 }}>料金：ヒアリング後にお見積もり</p>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.mid, lineHeight: 1.6 }}>
                  現在は既存クリニック様で枠が埋まっており、新規受付は順番制でご案内しています。
                </p>
              </div>
              <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline", fontWeight: 600 }}>
                順番待ちエントリーはこちら →
              </a>
              </div>
            </div>
          </F>
        </div>
      </Sec>

      {/* ④ 共通プロセス */}
      <Sec py={72}>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>PROCESS</p>
          <h2 style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 10, textWrap: "balance" }}>ご利用までの流れ</h2>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85 }}>
            サービスにより流れは異なります。詳細は各サービスのページからご確認ください。
          </p>
        </div>
        <F delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 960, margin: "0 auto" }}>
            {/* サブスク用フロー */}
            <div style={{ background: C.bg, padding: "24px 22px", borderTop: `4px solid ${C.gold}` }}>
              <p style={{ fontFamily: sans, fontSize: 12, color: C.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>🌟 サブスク</p>
              <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 12 }}>2〜4週間でサービス開始</p>
              <ol style={{ paddingLeft: 18, margin: 0 }}>
                {["申込フォーム送信","電子契約締結（freeeサイン）","AI導入内容ご相談","AI実装（順次）"].map((t, i) => (
                  <li key={i} style={{ fontFamily: sans, fontSize: 13, color: C.dark, lineHeight: 1.85, marginBottom: 4 }}>{t}</li>
                ))}
              </ol>
              <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ display: "inline-block", marginTop: 12, fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline" }}>
                お問い合わせはこちら →
              </a>
            </div>
            {/* 単発用フロー */}
            <div style={{ background: C.bg, padding: "24px 22px", borderTop: `4px solid ${C.accent}` }}>
              <p style={{ fontFamily: sans, fontSize: 12, color: C.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>💼 単発・買い切り（動画教材は3ヶ月視聴）</p>
              <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 12 }}>動画は購入後即視聴可</p>
              <ol style={{ paddingLeft: 18, margin: 0 }}>
                {["お問い合わせ／販売開始通知ご登録","ヒアリング（HP制作の場合）","お見積もり提示／動画購入","制作・納品 ／ 動画即視聴"].map((t, i) => (
                  <li key={i} style={{ fontFamily: sans, fontSize: 13, color: C.dark, lineHeight: 1.85, marginBottom: 4 }}>{t}</li>
                ))}
              </ol>
              <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ display: "inline-block", marginTop: 12, fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline" }}>
                お問い合わせはこちら →
              </a>
            </div>
            {/* 個別コンサル用フロー */}
            <div style={{ background: C.bg, padding: "24px 22px", borderTop: `4px solid ${C.navy}` }}>
              <p style={{ fontFamily: sans, fontSize: 12, color: C.navy, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>🤝 個別コンサル</p>
              <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 12 }}>順番待ち・空き次第ご案内</p>
              <ol style={{ paddingLeft: 18, margin: 0 }}>
                {["順番待ちエントリー","空き発生時にご連絡（不定期）","Zoom 30分のヒアリング","お見積もり・支援内容ご提案・契約","オンラインAI支援開始"].map((t, i) => (
                  <li key={i} style={{ fontFamily: sans, fontSize: 13, color: C.dark, lineHeight: 1.85, marginBottom: 4 }}>{t}</li>
                ))}
              </ol>
              <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ display: "inline-block", marginTop: 12, fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline" }}>
                順番待ちエントリーはこちら →
              </a>
            </div>
          </div>
        </F>
      </Sec>

      {/* データ取扱の3原則（AI不安への対応） */}
      <Sec py={32} bg={C.bg}>
        <F>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontFamily: enFont, fontSize: 11, color: C.accent, letterSpacing: 4, marginBottom: 8, textAlign: "center", fontWeight: 700 }}>DATA HANDLING — 3 PRINCIPLES</p>
            <h3 style={{ fontFamily: sans, fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 18, textAlign: "center" }}>データ取扱の3原則</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {[
                { n: "①", t: "設定・運用はMI-ZAが代行", d: "クリニック側の作業負担なし。データ抽出・連携もMI-ZAが対応します。" },
                { n: "②", t: "AI出力は必ず人が最終確認", d: "AI×人の二重チェック後に納品。最終的な医学的判断は院長・医師の領域です。" },
                { n: "③", t: "詳細はNDA締結後に開示", d: "AI技術仕様・データ取扱方針・セキュリティ管理体制はご契約時に個別にご説明します。" },
              ].map((item, i) => (
                <div key={i} style={{ background: C.white, padding: "18px 18px", borderTop: `3px solid ${C.navy}` }}>
                  <p style={{ fontFamily: serif, fontSize: 24, color: C.gold, fontWeight: 700, marginBottom: 6 }}>{item.n}</p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 8, lineHeight: 1.5 }}>{item.t}</p>
                  <p style={{ fontFamily: sans, fontSize: 12, color: C.mid, lineHeight: 1.85 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </F>
      </Sec>

      <Sec py={72}>
        <F>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: sans, fontSize: 12, color: C.light, letterSpacing: 4, marginBottom: 16 }}>CASE STUDY</p>
            <p style={{ fontFamily: serif, fontSize: 19, color: C.navy, marginBottom: 16 }} className="sp-heading">支援事例をご覧ください</p>
            <p style={{ fontFamily: sans, fontSize: 14, color: C.mid, lineHeight: 2, marginBottom: 28 }}>実際にどのようなご相談を受け、どう支援したか。<br />具体的な事例を紹介しています。</p>
            <a href="/cases/" onClick={(e) => { e.preventDefault(); go(2); }} style={{ fontFamily: sans, fontSize: 12, color: C.navy, background: "transparent", border: `2px solid ${C.navy}`, padding: "11px 29px", cursor: "pointer", letterSpacing: 1, transition: "all 0.2s", marginBottom: 40, textDecoration: "none", display: "inline-block" }}
              onMouseOver={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.white; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.navy; }}>
              支援事例を見る
            </a>
          </div>
        </F>
        <F delay={0.1}><div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: serif, fontSize: 19, color: C.navy, marginBottom: 8 }} className="sp-heading">同じような状況が、貴院にもありますか。</p>
          <p style={{ fontFamily: sans, fontSize: 15, color: C.mid, lineHeight: 2, marginBottom: 28 }} className="cta-sub">まずZoomで30分、<br className="sp-only-br" />現状をお聞かせください。</p>
          <Btn href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }}>サービスを問い合わせてみる</Btn>
          <p style={{ marginTop: 18 }}>
            <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline" }}>
              まず30分、相談する
            </a>
          </p>
        </div></F>
      </Sec>
    </>
  );
}

/* ─── CASES ─── */
function Cases({ go }) {
  return (
    <>
      <section style={{ background: C.navy, paddingTop: 108, paddingBottom: 48, textAlign: "center" }}>
        <F>
          <p style={{ fontFamily: enFont, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 5, marginBottom: 10 }}>CASE STUDY</p>
          <h1 style={{ fontFamily: sans, fontSize: 25, color: C.white, fontWeight: 700, margin: 0 }}>支援事例</h1>
          <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 14, lineHeight: 1.85 }}>
            以下は<strong style={{ color: C.gold }}>個別コンサルティング</strong>の支援事例です。<br className="sp-only-br" />
            サブスクリプションサービスは2026年5月開始のため、ご契約クリニックの事例は順次掲載予定です。
          </p>
        </F>
      </section>
      <Sec>
        <F><p style={{ fontFamily: sans, fontSize: 12, color: C.light, marginBottom: 32 }}>※ 守秘義務のため、匿名・一部内容を変更しています。すべて個別コンサルティングの実例です。</p></F>
        {CASES.map((c, i) => (
          <F key={i} delay={i * 0.05}>
            <div style={{ padding: "25px 0", borderBottom: `2px solid ${C.line}`, display: "grid", gridTemplateColumns: "33px 1fr", gap: 16 }}>
              <span style={{ fontFamily: enFont, fontSize: 19, color: C.light, fontWeight: 300, paddingTop: 2 }}>0{i+1}</span>
              <div>
                <p style={{ fontFamily: sans, fontSize: 11, color: C.accent, letterSpacing: 1, marginBottom: 8 }}>{c.d}</p>
                <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 6 }} className="case-title">{c.t}</p>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.light, marginBottom: 8 }}>{c.p}</p>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.dark, lineHeight: 1.85 }}>{c.s}</p>
              </div>
            </div>
          </F>
        ))}
      </Sec>
      <Sec py={72}>
        <F><div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: serif, fontSize: 19, color: C.navy, marginBottom: 8 }} className="sp-heading">同じような状況が、貴院にもありますか。</p>
          <p style={{ fontFamily: sans, fontSize: 15, color: C.mid, lineHeight: 2, marginBottom: 32 }} className="cta-sub">まずZoomで30分、<br className="sp-only-br" />現状をお聞かせください。</p>
          <Btn href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }}>サービスを問い合わせてみる</Btn>
          <p style={{ marginTop: 18 }}>
            <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline" }}>
              まず30分、相談する
            </a>
          </p>
        </div></F>
      </Sec>
    </>
  );
}

/* ─── COMPANY ─── */
function Company({ go }) {
  return (
    <>
      <section style={{ background: C.navy, paddingTop: 108, paddingBottom: 48, textAlign: "center" }}>
        <F>
          <p style={{ fontFamily: enFont, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 5, marginBottom: 10 }}>COMPANY</p>
          <h1 style={{ fontFamily: sans, fontSize: 25, color: C.white, fontWeight: 700, margin: 0 }}>会社概要</h1>
        </F>
      </section>

      <Sec bg={C.bg} py={64}>
        <F><div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: enFont, fontSize: 12, color: C.light, letterSpacing: 4, marginBottom: 12 }}>PHILOSOPHY</p>
          <p style={{ fontFamily: serif, fontSize: 22, color: C.navy, lineHeight: 1.9, letterSpacing: 1, textWrap: "balance" }} className="sp-heading">次の在宅医療を、現場から。</p>

        </div></F>
      </Sec>

      <Sec>
        <SH en="ABOUT US" ja="私たちのこと" />
        <F>
          <P>超高齢社会が本格化するなかで、在宅医療の役割はかつてないほど大きくなっています。病院ではなく、住み慣れた場所で最期まで過ごすことを望む人は増え続け、訪問診療クリニックへの期待と需要は今後さらに高まっていく。その現場を担っているのは、全国に点在する小さなクリニックの院長たちです。</P>
          <P>在宅医療の事務長時代、全国の研修会で、院長先生たちからよく声をかけられました。「事務長を探しているが、どういうキャリアの人が良いと思う？」「そばで何でも相談に乗ってくれる人がほしい」——。院長の力になりたい。志と優しさあふれる在宅医療の院長たちに、一医療機関を超えて役に立ちたいと思い立ち、思い切ってMI-ZAをひとりで立ち上げました。あれから7年半、2026年1月に法人化いたしました。</P>
          <P>経営上の課題の背景には、必ず感情があります。スタッフが辞める理由も、院長が判断に迷う理由も、数字の前に人の感情があります。MI-ZAは、その感情を丁寧に読み解きながら、データで判断の根拠をつくります。在宅医療のデータ活用・AI活用の研究にも取り組んでいます。経験と直感を大切にしながら、その判断をデータで裏付けられる——そんな経営の仕組みを、院長と一緒につくっていきたいと考えています。</P>
        </F>
      </Sec>

      <Sec bg={C.bg}>
        <SH en="TEAM" ja="担当者紹介" />
        <F><P style={{ marginBottom: 32 }}>在宅医療クリニックの変化には、現場の感情を理解することと、変えるべきことを変える決断——その両方が必要だと考えています。</P></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(261px, 1fr))", gap: 28, marginBottom: 28 }}>
          {[
            { role: "CEO", img: "photo-ceo.jpg", name: "代表取締役　石塚（波村）美絵", desc: "九州大学大学院法学府修了。琉球大学講師を経て、在宅医療クリニックの事務長として約10年。組織の仕組み化、合意形成支援が得意。", alt: "石塚美絵 MI-ZA代表 在宅医療コンサルタント" },
            { role: "DIRECTOR", img: "photo-director.jpg", name: "取締役　石塚 秀俊", desc: "東京工業大学大学院修了。伊藤忠商事を経て、医療法人の事務長として全事業所の黒字化を達成。その後アクセンチュアで経営コンサルに従事。", alt: "石塚秀俊 MI-ZA取締役 在宅医療コンサルタント" },
          ].map((m, i) => (
            <F key={i} delay={i * 0.1}>
              <div style={{ background: C.white, padding: "29px 23px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <picture style={{ display: "contents" }}>
                  <source srcSet={m.img.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img src={m.img} alt={m.alt} loading="lazy" decoding="async" width="72" height="72" style={{ width: 72, height: 72, flexShrink: 0, objectFit: "cover", objectPosition: "center top" }} />
                </picture>
                <div>
                  <p style={{ fontFamily: enFont, fontSize: 11, color: C.accent, letterSpacing: 3, marginBottom: 4 }}>{m.role}</p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 8 }} className="member-name">{m.name}</p>
                  <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.8 }}>{m.desc}</p>
                </div>
              </div>
            </F>
          ))}
        </div>
        <F delay={0.2}>
          <div style={{ textAlign: "center" }}>
            <a href="/member/" onClick={(e) => { e.preventDefault(); go(4); }} style={{ fontFamily: sans, fontSize: 12, color: C.navy, textDecoration: "none", letterSpacing: 1, transition: "color 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.color = C.accent; }}
              onMouseOut={e => { e.currentTarget.style.color = C.navy; }}>
              スタッフの詳細を見る →
            </a>
          </div>
        </F>
      </Sec>

      <Sec>
        <SH en="INFORMATION" ja="会社情報" />
        <F><div>
          {[["会社名","株式会社MI-ZA（ミーザ）"],["創業","2018年"],["株式会社化","2026年1月"],["所在地","東京都港区北青山1-3-1 アールキューブ青山3F"],["事業内容","在宅医療に特化した経営支援・DXコンサルティング"]].map(([k,v],i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "141px 1fr", borderBottom: `2px solid ${C.line}`, padding: "15px 0" }}>
              <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: C.navy }}>{k}</span>
              <span style={{ fontFamily: sans, fontSize: 14, color: C.dark }}>{v}</span>
            </div>
          ))}
        </div></F>
      </Sec>

    </>
  );
}

/* ─── MEMBER ─── */
function Member({ go }) {
  const MEMBERS = [
    { role: "CEO", img: "photo-ceo.jpg", alt: "在宅医療・訪問診療クリニック専門 経営コンサルタント・事務長支援 石塚美絵（波村美絵）代表取締役 MI-ZA", name: "代表取締役　石塚（波村）美絵", bio: "九州大学大学院法学府修了後、琉球大学で法学を教えるなかで、法律では弱い人を直接支えるには遠すぎると感じるようになりました。もっと身近に人を支えたい——その思いから病院のMSWへ転じました。しかし病院にはない、「その人の家に上がり、家族を知り、人生ごと診る」——在宅医療の考えに共鳴してこの世界に入りました。事務長として約10年、訪問診療クリニックの運営に携わり、仕組み化支援で残業に苦しんでいたスタッフの残業を半年でゼロへ。スタッフが前に進めない時の合意形成のあり方を組織開発の一助として支援してきました。身近な人が在宅医療を知らずに苦しんだ経験が、この仕事を続ける理由になっています。順天堂大学ビジネススクール ヘルスケアマネジメントプログラム入門・修了（2018年）。一般社団法人日本在宅医療事務連絡会理事。", skill: "得意領域：組織の意思決定の流れをつくる（組織プロセスファシリテーション）、診療報酬改定対応、医療広告・HP運用、人事労務整備、医師採用・定着支援、事務長・管理職育成" },
    { role: "DIRECTOR", img: "photo-director.jpg", alt: "在宅医療・訪問診療クリニック専門 経営コンサルタント 石塚秀俊 取締役 MI-ZA", name: "取締役　石塚 秀俊", bio: "伊藤忠商事（豪州駐在4年）にて新規事業立上げやM＆Aを中心に従事、ガリバーインターナショナル経営企画部長・マーケティング部長・FC事業部長・人事部長を経て、医療・介護の現場へ転じました。訪問診療・訪問看護ステーション統括部長を歴任し、医療機関・介護事業所計50カ所以上を運営する医療法人では事務長・統括マネジャーとして全事業所の黒字化を達成。その後アクセンチュア・ シニアプリンシパルとして経営・ヘルスケア領域のコンサルティングに従事。2025年には日本の医療法人にてベトナムでのクリニック2拠点立ち上げに事業開発部長として携わりました。組織を変える仕事を積み重ねるなかで、変化が起きる組織と起きない組織の違いを繰り返し見てきました。現場の状況を正確に読み、変えるべきことを明確に決める——それが、院長の経営判断を支える力になると考えています。東京工業大学大学院修了。一般社団法人日本在宅医療事務連絡会代表理事。", skill: "得意領域：生成AI実装・医療DX（レセプト/書類業務の自動化・データ活用）／経営判断支援・事業計画策定／診療報酬改定対応（在宅医療・訪問看護）／マーケティング・集患・連携先開拓／訪問看護の組織運営・管理職育成" },
  ];
  return (
    <>
      <section style={{ background: C.navy, paddingTop: 108, paddingBottom: 48, textAlign: "center" }}>
        <F>
          <p style={{ fontFamily: enFont, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 5, marginBottom: 10 }}>STAFF</p>
          <h1 style={{ fontFamily: sans, fontSize: 25, color: C.white, fontWeight: 700, margin: 0 }}>スタッフ紹介</h1>
        </F>
      </section>
      <Sec bg={C.bg}>
        <F><P style={{ marginBottom: 40 }}>ふたりとも事務長として、在宅医療の現場を知っています。</P></F>
        {MEMBERS.map((m, i) => (
          <F key={i} delay={i * 0.1}>
            <div style={{ paddingBottom: i === 0 ? 40 : 0, marginBottom: i === 0 ? 40 : 0, borderBottom: i === 0 ? `2px solid ${C.line}` : "none" }}>
              <div style={{ display:'flex', gap:20, alignItems:'flex-start', marginBottom:20 }}>
                <picture style={{ display: "contents" }}>
                  <source srcSet={m.img.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img src={m.img} alt={m.alt || m.name} loading="lazy" decoding="async" width="88" height="88" style={{ width:88, height:88, flexShrink:0, objectFit:'cover', objectPosition:'center top' }} />
                </picture>
                <div>
                  <p style={{ fontFamily: enFont, fontSize: 12, color: C.accent, letterSpacing: 3, marginBottom: 6 }}>{m.role}</p>
                  <p style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy }} className="member-name">{m.name}</p>
                </div>
              </div>
              <P style={{ fontSize: 14 }}>{m.bio}</P>
              <P style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{m.skill}</P>
            </div>
          </F>
        ))}
      </Sec>
      <Sec py={72}>
        <F><div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: serif, fontSize: 19, color: C.navy, marginBottom: 8 }} className="sp-heading">まずZoomで30分、<br className="sp-only-br" />現状をお聞かせください。</p>
          <p style={{ fontFamily: sans, fontSize: 15, color: C.mid, lineHeight: 2, marginBottom: 28 }} className="cta-sub">依頼するかどうかは、<br className="sp-only-br" />その後で決めていただけます。</p>
          <Btn href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }}>サービスを問い合わせてみる</Btn>
          <p style={{ marginTop: 18 }}>
            <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ fontFamily: sans, fontSize: 12, color: C.accent, textDecoration: "underline" }}>
              まず30分、相談する
            </a>
          </p>
        </div></F>
      </Sec>
    </>
  );
}

/* ─── BLOG ─── */
/* ─── BLOG ─── */
const BLOG_POSTS = [
  {
    id: 13,
    slug: "home-medical-secretary-day",
    category: "在宅医療事務長",
    date: "2026-05-01",
    title: "在宅医療事務長の仕事の全体像：8領域とタイプ別の重心",
    excerpt: "事務長の仕事はひとつではありません。医事課上がり型・データ分析型・渉外型・組織開発型——バックグラウンドにより重心が違います。在宅医療クリニックの事務長業務を8領域に整理し、タイプ別の特徴と、事務長機能をどう確保するかを10年経験者が解説します。",
    readTime: 11,
  },
  {
    id: 14,
    slug: "2026-reimbursement-revision",
    category: "診療報酬",
    date: "2026-04-30",
    title: "2026年診療報酬改定で在宅医療クリニックが対応すべき5項目",
    excerpt: "2026年診療報酬改定の影響範囲と、在宅医療クリニックが優先して対応すべき5つの実務ポイント。BCP策定・施設基準・加算対応を現役事務長が解説。",
    readTime: 10,
  },
  {
    id: 15,
    slug: "mighty-checker-comparison",
    category: "レセプト・AI",
    date: "2026-05-01",
    title: "マイティーチェッカーとMI-ZAの病名チェック・レセプト事前チェックは何が違うのか",
    excerpt: "レセプト点検ソフト「マイティーチェッカー」とMI-ZAのAI×事務長レセチェック。両者は競合ではなく補完関係です。在宅医療特有の病名・指示書・加算要件をどう扱うか、現役事務長が解説します。",
    readTime: 7,
  },
];

function Blog({ go }) {
  return (
    <>
      <section style={{ background: C.navy, paddingTop: 108, paddingBottom: 48, textAlign: "center" }}>
        <F>
          <p style={{ fontFamily: enFont, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 5, marginBottom: 10 }}>BLOG</p>
          <h1 style={{ fontFamily: sans, fontSize: 25, color: C.white, fontWeight: 700, margin: 0 }}>在宅医療経営ブログ</h1>
          <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 14, lineHeight: 1.85 }}>
            在宅医療事務長10年の経験から、<br className="sp-only-br" />実務に役立つ情報を発信しています
          </p>
        </F>
      </section>
      <Sec py={72}>
        <F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {BLOG_POSTS.map((p, i) => (
              <a key={p.id} href={p.url || `/blog/${p.slug}/`} onClick={(e) => { e.preventDefault(); go(p.id); }} style={{ background: C.white, border: `2px solid ${C.line}`, padding: "24px 24px", textDecoration: "none", display: "flex", flexDirection: "column", borderTop: `4px solid ${C.gold}` }}>
                <p style={{ fontFamily: enFont, fontSize: 11, color: C.accent, letterSpacing: 3, marginBottom: 6 }}>{p.category}</p>
                <p style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 12, lineHeight: 1.5 }}>{p.title}</p>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.mid, lineHeight: 1.85, marginBottom: 16, flex: 1 }}>{p.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
                  <span style={{ fontFamily: sans, fontSize: 11, color: C.mid }}>{p.date} ／ 約{p.readTime}分</span>
                  <span style={{ fontFamily: sans, fontSize: 12, color: C.accent, fontWeight: 700 }}>続きを読む →</span>
                </div>
              </a>
            ))}
          </div>
        </F>
        <F delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 48, padding: "24px 24px", background: C.bg, borderLeft: `3px solid ${C.gold}`, maxWidth: 600, margin: "48px auto 0" }}>
            <p style={{ fontFamily: sans, fontSize: 13, color: C.dark, lineHeight: 1.85, marginBottom: 12 }}>
              noteでも発信しています。
            </p>
            <a href="https://note.com/miemove" target="_blank" rel="noopener noreferrer" style={{ fontFamily: sans, fontSize: 13, color: C.accent, textDecoration: "underline", fontWeight: 700 }}>
              note.com/miemove を見る →
            </a>
          </div>
        </F>
      </Sec>
    </>
  );
}

/* ─── BLOG POST 共通コンポーネント ─── */
function BlogPostLayout({ post, go, children }) {
  // Article JSON-LD
  React.useEffect(() => {
    const existing = document.getElementById('article-jsonld');
    if (existing) existing.remove();
    const json = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Organization",
        "name": "株式会社MI-ZA",
        "url": "https://mi-za.jp"
      },
      "publisher": {
        "@type": "Organization",
        "name": "株式会社MI-ZA",
        "logo": { "@type": "ImageObject", "url": "https://mi-za.jp/mi-za-icon.png" }
      },
      "mainEntityOfPage": "https://mi-za.jp/blog/" + post.slug + "/",
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'article-jsonld';
    s.textContent = JSON.stringify(json);
    document.head.appendChild(s);
    return () => { const e = document.getElementById('article-jsonld'); if (e) e.remove(); };
  }, [post.slug]);

  return (
    <>
      <section style={{ background: C.navy, paddingTop: 108, paddingBottom: 48 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 25px" }}>
          <F>
            <p style={{ fontFamily: enFont, fontSize: 12, color: C.gold, letterSpacing: 3, marginBottom: 8 }}>{post.category}</p>
            <h1 style={{ fontFamily: serif, fontSize: 26, color: C.white, fontWeight: 700, margin: 0, lineHeight: 1.6 }}>{post.title}</h1>
            <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 16 }}>
              {post.date} ／ 読了 約{post.readTime}分 ／ MI-ZA編集部
            </p>
          </F>
        </div>
      </section>
      <Sec py={64}>
        <article style={{ fontFamily: sans, fontSize: 15, color: C.dark, lineHeight: 2 }}>
          {children}
        </article>
        <F delay={0.3}>
          <div style={{ marginTop: 48, padding: "28px 24px", background: C.bg, borderLeft: `4px solid ${C.gold}` }}>
            <p style={{ fontFamily: sans, fontSize: 12, color: C.gold, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>📌 この記事の発信元</p>
            <p style={{ fontFamily: sans, fontSize: 14, color: C.dark, lineHeight: 1.85, marginBottom: 12 }}>
              在宅医療クリニックの事務長業務をAI×現役事務長で支援するMI-ZA。本記事の知見はそのまま <strong>AI伴走サービス</strong>に組み込まれています。
            </p>
            <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} className="mz-btn" style={{
              background: C.gold, color: C.white, border: "none",
              padding: "11px 28px", cursor: "pointer",
              fontFamily: sans, fontSize: 13, fontWeight: 700, letterSpacing: 1.5,
              textDecoration: "none", display: "inline-block",
            }}>
              サブスクのプランを見る →
            </a>
          </div>
        </F>
        <F delay={0.4}>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <a href="/blog/" onClick={(e) => { e.preventDefault(); go(5); }} style={{ fontFamily: sans, fontSize: 13, color: C.accent, textDecoration: "underline" }}>
              ← ブログ一覧に戻る
            </a>
          </div>
        </F>
      </Sec>
    </>
  );
}

/* ─── BLOG POST 1：在宅医療事務長の1日 ─── */
function BlogPost1({ go }) {
  const post = BLOG_POSTS.find(p => p.slug === 'home-medical-secretary-day');
  return (
    <BlogPostLayout post={post} go={go}>
      <p style={{ marginBottom: 24, fontStyle: "italic", color: C.mid, fontSize: 14 }}>
        「事務長の仕事は何ですか？」——一言で答えるのが難しい質問です。医事課上がりで診療報酬を磨いてきた事務長、データ分析で経営判断を支える事務長、地域連携の渉外を担う事務長、組織開発と翻訳業を中心に動く事務長——。クリニックの規模・院長の志向・事務長のバックグラウンドによって、重心は大きく違います。8つの領域に整理して、その全体像をお伝えします。
      </p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>事務長業務の8領域（全体像）</h2>
      <p style={{ marginBottom: 16 }}>2021年に事務長WG（複数クリニックの現役事務長有志）でまとめた事務長業務カテゴリは、大きく以下の8領域に分かれます。</p>
      <div style={{ marginBottom: 24, padding: "20px 22px", background: C.bg, borderLeft: `3px solid ${C.gold}` }}>
        <ol style={{ paddingLeft: 24, margin: 0 }}>
          <li style={{ marginBottom: 10 }}><strong>① 診療部 — 事業企画・経営理念</strong><br /><span style={{ fontSize: 13, color: C.mid }}>業務フロー設計、人員計画、経営計画立案、診療報酬・介護報酬を見据えた組織戦略、価値観の醸成、多職種連携</span></li>
          <li style={{ marginBottom: 10 }}><strong>② 事務部 — 患者対応・スタッフ対応・診療報酬・IT管理</strong><br /><span style={{ fontSize: 13, color: C.mid }}>クレーム対応、未納金管理、ワクチン業務、院内ルール、レセプトチェック、算定漏れ対策、PCネットワーク、消防点検</span></li>
          <li style={{ marginBottom: 10 }}><strong>③ スタッフ・庶務 — 営繕・契約管理</strong><br /><span style={{ fontSize: 13, color: C.mid }}>設備管理、修繕、訪問車両のタイヤ交換、医療機器購入、保険管理、テナント物件、盗難対策</span></li>
          <li style={{ marginBottom: 10 }}><strong>④ 人事労務 — 採用・勤怠・労務・育成・配置</strong><br /><span style={{ fontSize: 13, color: C.mid }}>求人作成、面接、入職オリエン、勤怠管理、給与計算、社会保険、産業医、36協定、教育研修、評価制度</span></li>
          <li style={{ marginBottom: 10 }}><strong>⑤ 財務・会計 — 会計管理・士業調整</strong><br /><span style={{ fontSize: 13, color: C.mid }}>決算資料作成、金融機関対応、月次管理、士業との調整（会計士・社労士・弁護士・税理士）、補助金手続き</span></li>
          <li style={{ marginBottom: 10 }}><strong>⑥ 広報・マーケティング</strong><br /><span style={{ fontSize: 13, color: C.mid }}>患者満足度調査、集患、広報誌、HP・SEO・MEO、SNS、看板広告</span></li>
          <li style={{ marginBottom: 10 }}><strong>⑦ 行政申請手続</strong><br /><span style={{ fontSize: 13, color: C.mid }}>新規施設基準、定時報告（在支診等）、麻薬施用者免許、個別指導、医療機能情報提供制度</span></li>
          <li style={{ marginBottom: 0 }}><strong>⑧ 対外業務 — 地域連携・渉外</strong><br /><span style={{ fontSize: 13, color: C.mid }}>医師会、地域包括への挨拶回り、連携カンファレンス、地域勉強会、表敬訪問、見学対応、治験</span></li>
        </ol>
      </div>
      <p style={{ marginBottom: 16 }}>これら全部をひとりの事務長がやれるか——答えは <strong>NO</strong> です。クリニックの規模、院長の志向、事務長のバックグラウンドによって、重心は大きく異なります。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>事務長の主な4タイプ</h2>
      <p style={{ marginBottom: 16 }}>10年現場で関わってきて、在宅医療クリニックの事務長は大きく次の4タイプに分かれると感じています。どのタイプが正解ということではなく、<strong>クリニックの状況と必要としている機能</strong>でマッチングが決まります。</p>

      <h3 style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: C.navy, marginTop: 24, marginBottom: 10 }}>① 医事課上がり型</h3>
      <p style={{ marginBottom: 16 }}>診療報酬・算定・施設基準を熟知。レセプトチェックや算定漏れ対策、行政申請が強み。<strong>領域 ② 事務部（診療報酬業務）／⑦ 行政申請</strong> が重心。</p>
      <p style={{ marginBottom: 16 }}>新設クリニック、診療報酬の取りこぼしが課題のクリニック、施設基準の届出整備が必要なクリニックに向いています。一方、組織開発や対外渉外は弱いケースが多い。</p>

      <h3 style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: C.navy, marginTop: 24, marginBottom: 10 }}>② データ分析・経営企画型</h3>
      <p style={{ marginBottom: 16 }}>経営数字を読み解き、KPIを設計し、院長の判断材料を整える。<strong>領域 ① 診療部（事業企画）／⑤ 財務・会計</strong> が重心。</p>
      <p style={{ marginBottom: 16 }}>「なんとなく忙しいけど利益が残らない」「複数拠点を比較したい」「医師パフォーマンスを定量化したい」というクリニックに向きます。在宅の患者数増減監視、レセプト枚数からの増員試算など、数字で語れる事務長です。</p>

      <h3 style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: C.navy, marginTop: 24, marginBottom: 10 }}>③ 渉外・地域連携型</h3>
      <p style={{ marginBottom: 16 }}>医師会、地域包括、ケアマネ、訪問看護ステーション、薬局——外部とのリレーションを担う。<strong>領域 ⑧ 対外業務／⑥ 広報マーケティング</strong> が重心。</p>
      <p style={{ marginBottom: 16 }}>新規開業時の地域への挨拶回り、連携カンファレンスの運営、特養との契約締結、見学対応、新規拠点開設の事前面談など。在宅医療は地域に根付いてこそ成り立つので、このタイプの事務長がいるクリニックは紹介患者数が安定します。</p>

      <h3 style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: C.navy, marginTop: 24, marginBottom: 10 }}>④ 組織開発・翻訳型</h3>
      <p style={{ marginBottom: 16 }}>スタッフの困りごとを吸い上げ、抽象化し、院長と議論して仕組みに落とす。<strong>領域 ① 経営理念／② スタッフ対応／④ 人事労務</strong> が重心。</p>
      <p style={{ marginBottom: 16 }}>「院長一人で抱え込んでいる」「離職が止まらない」「組織が成熟しない」というクリニックに向きます。実務担当ではなく、方針決定・OK出し・合意形成が中心。週1.5日の業務委託でも機能することがあります。私自身（石塚美絵）はこのタイプです。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>クリニック規模との関係</h2>
      <p style={{ marginBottom: 16 }}>事務長を「ひとり」置くか、複数の機能で分担するか——規模で考えると次のように整理できます。</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}><strong>常勤医師1〜2名</strong>：兼務型（院長＋事務員1名で広く浅くカバー、専任事務長は不在のことも）</li>
        <li style={{ marginBottom: 8 }}><strong>常勤医師3〜5名</strong>：専任事務長1名（4タイプのいずれか）。役割分担を明確化しないと事務長の疲弊が早い</li>
        <li style={{ marginBottom: 8 }}><strong>常勤医師6名以上 / 複数拠点</strong>：事務部複数体制（医事課・労務・総務を別建て、事務長は方針・統括）</li>
      </ul>
      <p style={{ marginBottom: 16 }}>MI-ZAがメインターゲットにしているのは <strong>常勤医師1〜5名規模</strong> のクリニック。このゾーンは、事務長を1人雇うかどうかで悩む規模です。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>事務長を採用するのは難しい</h2>
      <p style={{ marginBottom: 16 }}>在宅医療を理解している事務長候補は限られ、年収¥600万〜¥800万でも見つからないクリニックが多いのが現実。さらに、上の4タイプのうち <strong>どのタイプを必要としているか</strong> を院長が言語化できていないと、採用しても噛み合わずに数年で離脱、というケースをよく見ます。</p>
      <p style={{ marginBottom: 16 }}>「事務長を採用すべきか／兼務で回すか」「どのタイプを採用すべきか」——この設計こそが、実は最大の経営判断です。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>AIで何が変わるか</h2>
      <p style={{ marginBottom: 16 }}>8領域のうち、<strong>AIで省力化できる範囲</strong>を整理すると次のようになります。</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}><strong>① 診療部（事業企画）</strong>：データ集計・KPI算出はAIで自動化、判断は人</li>
        <li style={{ marginBottom: 8 }}><strong>② 事務部（診療報酬・IT）</strong>：レセプトチェック・算定漏れ抽出・指示書下書きはAIで大幅省力化</li>
        <li style={{ marginBottom: 8 }}><strong>③ 庶務・契約</strong>：契約書テンプレ生成・スケジュール管理は一部AI化可能、現場対応は人</li>
        <li style={{ marginBottom: 8 }}><strong>④ 人事労務</strong>：勤怠データ抽出・労務リスク検出はAI、面談・配置判断は人</li>
        <li style={{ marginBottom: 8 }}><strong>⑤ 財務・会計</strong>：仕訳・月次レポート自動化、士業との対話は人</li>
        <li style={{ marginBottom: 8 }}><strong>⑥ 広報マーケ</strong>：HP原稿・SNS下書き・MEO対応はAI、関係性構築は人</li>
        <li style={{ marginBottom: 8 }}><strong>⑦ 行政申請</strong>：書類作成補助はAI、行政との折衝は人</li>
        <li style={{ marginBottom: 8 }}><strong>⑧ 対外業務</strong>：基本は人（顔の見える関係性が必須）</li>
      </ul>
      <p style={{ marginBottom: 16 }}>AIで時間が浮く領域は確実にあります。一方で、<strong>判断・関係性・合意形成・現場対応</strong>は人にしかできません。「事務長を置くか／AIで代替できるか」ではなく、「<strong>事務長の時間配分をどう変えるか</strong>」という発想に切り替える時期です。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>MI-ZAの位置づけ</h2>
      <p style={{ marginBottom: 16 }}>MI-ZA は、事務長機能の中で <strong>AI で省力化できる範囲</strong> を AI で肩代わりし、<strong>人にしかできない範囲</strong> を MI-ZA の現役事務長10年経験者が担う設計です。</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}><strong>AI伴走サービス</strong>：8領域横断で、AI×人で業務全体に伴走（病名チェック・レセプト事前チェック・訪問看護指示書下書き・月次レポートを含む）</li>
        <li style={{ marginBottom: 8 }}><strong>個別コンサルティング</strong>：経営企画・組織開発・マーケティングの3領域でテーマ別にご相談</li>
        <li style={{ marginBottom: 8 }}><strong>BCP策定支援</strong>：領域 ⑦ 行政申請の中の単発支援</li>
      </ul>
      <p style={{ marginBottom: 16 }}>「うちのクリニックは何タイプの事務長機能が必要か」「兼務で回せるか、専任が必要か」「どこをAIで省力化できるか」——迷われている院長は、ぜひ一度ご相談ください。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>関連リンク</h2>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>
          📖 <a href="/blog/2026-reimbursement-revision/" onClick={(e) => { e.preventDefault(); go(13); }} style={{ color: C.accent, textDecoration: "underline" }}>2026年診療報酬改定で在宅医療クリニックが対応すべき5項目</a>
        </li>
        <li style={{ marginBottom: 8 }}>
          🌟 <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ color: C.accent, textDecoration: "underline" }}>AI伴走サービスの詳細</a>
        </li>
      </ul>
    </BlogPostLayout>
  );
}

/* ─── BLOG POST 2：2026年診療報酬改定 ─── */
function BlogPost2({ go }) {
  const post = BLOG_POSTS.find(p => p.slug === '2026-reimbursement-revision');
  return (
    <BlogPostLayout post={post} go={go}>
      <p style={{ marginBottom: 24, fontStyle: "italic", color: C.mid, fontSize: 14 }}>
        2026年4月の診療報酬改定で、在宅医療クリニックは何が変わるのか。10年事務長を勤めた立場から、優先して対応すべき5項目を整理しました。
      </p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>1. BCP策定が施設基準に組み込まれる</h2>
      <p style={{ marginBottom: 16 }}>2026年改定で最大の変化は、<strong>BCP（事業継続計画）の策定</strong>が施設基準に組み込まれること。在宅療養支援診療所として届出している場合、BCPなしでは施設基準を維持できなくなります。</p>
      <p style={{ marginBottom: 16 }}>策定すべき要素：</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>訪問中の医師が被災した場合の対応フロー</li>
        <li style={{ marginBottom: 8 }}>緊急時に連絡すべき患者リストの整備</li>
        <li style={{ marginBottom: 8 }}>医薬品の安定供給体制</li>
        <li style={{ marginBottom: 8 }}>患者・家族の安否確認方法</li>
        <li style={{ marginBottom: 8 }}>代替連絡手段（電話・メール・SNS）の確立</li>
      </ul>
      <p style={{ marginBottom: 16 }}>事務長としての経験から言うと、これらは <strong>1ヶ月では作れません</strong>。3ヶ月かけて、現場のスタッフを巻き込みながら作り上げる必要があります。早めの着手が必須です。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>2. 訪問診療の算定要件が厳格化</h2>
      <p style={{ marginBottom: 16 }}>訪問診療の算定要件、特に <strong>「同一月の訪問頻度」</strong>と <strong>「在宅時医学総合管理料の患者数制限」</strong>が見直しの方向にあります。</p>
      <p style={{ marginBottom: 16 }}>大量訪問診療を行うクリニックは、患者一人あたりの訪問頻度を見直す必要があるでしょう。<strong>適正頻度</strong>と <strong>収益性</strong>のバランス再設計が必要です。</p>
      <p style={{ marginBottom: 16 }}>事務長として実務に落とし込む手順：</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>過去6ヶ月の訪問記録を分析</li>
        <li style={{ marginBottom: 8 }}>患者ごとの訪問頻度と収益貢献を可視化</li>
        <li style={{ marginBottom: 8 }}>新基準で算定できなくなる訪問パターンを特定</li>
        <li style={{ marginBottom: 8 }}>医師と相談し、訪問間隔の見直しを実行</li>
      </ul>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>3. 加算取得の最適化（取りこぼしゼロへ）</h2>
      <p style={{ marginBottom: 16 }}>2026年改定では、新加算の追加・既存加算の要件変更が複数あります。<strong>把握しないままだと、年間¥1,000,000以上の収益機会を失う</strong>ことも珍しくありません。</p>
      <p style={{ marginBottom: 16 }}>特に注意すべき加算：</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>在宅患者訪問診療料（要件変更）</li>
        <li style={{ marginBottom: 8 }}>在宅時医学総合管理料（評価軸変更）</li>
        <li style={{ marginBottom: 8 }}>看取り加算（条件追加）</li>
        <li style={{ marginBottom: 8 }}>連携加算（連携実績要件）</li>
      </ul>
      <p style={{ marginBottom: 16 }}>新加算情報をクリニックの実務に落とし込むには、診療報酬改定通知の精読が必要。これを <strong>毎月の月次レポートに組み込む</strong>のが、事務長の重要業務です。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>4. ICT・オンライン診療の活用拡大</h2>
      <p style={{ marginBottom: 16 }}>オンライン診療料の対象範囲拡大、ICT活用加算の新設など、<strong>デジタル医療への評価が拡大</strong>します。</p>
      <p style={{ marginBottom: 16 }}>特に在宅医療では、<strong>訪問前の情報収集をオンラインで行うことの算定</strong>が認められる方向にあります。これにより、訪問あたりの効率が大きく変わります。</p>
      <p style={{ marginBottom: 16 }}>事務長として準備すべきこと：</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>オンライン診療システムの選定・契約</li>
        <li style={{ marginBottom: 8 }}>患者・家族へのオンライン診療同意取得フロー</li>
        <li style={{ marginBottom: 8 }}>レセプト記載要件の確認</li>
        <li style={{ marginBottom: 8 }}>スタッフ研修</li>
      </ul>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>5. 訪問看護指示書の電子化推進</h2>
      <p style={{ marginBottom: 16 }}>訪問看護指示書の <strong>電子発行</strong>が推進されます。紙ベースの指示書から、電子署名付きの電子指示書への移行が、来年以降本格化します。</p>
      <p style={{ marginBottom: 16 }}>これは事務長業務に大きな影響があります。</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>過去カルテからAI下書き作成 → 電子化された指示書テンプレートに自動転記</li>
        <li style={{ marginBottom: 8 }}>医師の電子署名フローの構築</li>
        <li style={{ marginBottom: 8 }}>訪問看護ステーションとの電子授受</li>
        <li style={{ marginBottom: 8 }}>長期保存と検索性の確保</li>
      </ul>
      <p style={{ marginBottom: 16 }}>MI-ZA の <strong>AI伴走サービス（訪問看護指示書下書きを含む）</strong>は、まさにこの電子化の流れに対応した設計です。AI下書き＋医師確認＋電子化までワンストップで対応します。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>まとめ：事務長が居ないクリニックは、誰が対応するのか</h2>
      <p style={{ marginBottom: 16 }}>2026年改定への対応は、<strong>事務長の有無で大きく結果が変わる</strong>領域です。新加算の把握、施設基準の更新、書類の電子化──これらは医師がやるべき仕事ではありません。</p>
      <p style={{ marginBottom: 16 }}>しかし、優秀な事務長を採用するのは至難の業。年収¥800万でも、在宅医療の制度を熟知した事務長は希少です。</p>
      <p style={{ marginBottom: 16 }}>そこで MI-ZA は、<strong>事務長10年経験者×AI</strong> という組合せで、月¥98,000（税別）の伴走サブスクリプションを提供しています。2026年改定対応も、月次レポートで自動的に追跡。「気づいたら漏れていた」をなくします。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>関連リンク</h2>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>
          📖 <a href="/blog/home-medical-secretary-day/" onClick={(e) => { e.preventDefault(); go(12); }} style={{ color: C.accent, textDecoration: "underline" }}>在宅医療事務長の1日：朝礼から月末締めまで</a>
        </li>
        <li style={{ marginBottom: 8 }}>
          🌟 <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ color: C.accent, textDecoration: "underline" }}>AI伴走サービスの詳細（訪問看護指示書下書きを含む）</a>
        </li>
      </ul>
    </BlogPostLayout>
  );
}

/* ─── BLOG POST 3：マイティーチェッカー比較 ─── */
function BlogPost3({ go }) {
  const post = BLOG_POSTS.find(p => p.slug === 'mighty-checker-comparison');
  return (
    <BlogPostLayout post={post} go={go}>
      <p style={{ marginBottom: 24, fontStyle: "italic", color: C.mid, fontSize: 14 }}>
        「うちはマイティーチェッカーを入れているから、MI-ZAの病名チェックは要らないですよね？」——よく訊かれます。結論から言うと、両者は競合ではなく補完関係です。10年事務長の現場感覚から、その違いを整理します。
      </p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>マイティーチェッカーとは</h2>
      <p style={{ marginBottom: 16 }}>マイティーチェッカーは、レセプト提出前の点検を支援する <strong>ルールベース型のソフトウェア</strong>です。診療報酬の算定ルール・薬剤と病名の対応表・施設基準のロジックを内蔵し、レセプトデータと突き合わせて機械的に不整合を検出します。</p>
      <p style={{ marginBottom: 16 }}>導入クリニックも多く、定型的なチェック（投薬と適応病名の対応、入力エラー、明らかな算定要件違反など）には強い実績があります。月末のレセプト点検作業を効率化する基盤ツールとして、業界で広く使われています。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>では、なぜMI-ZAは別の「病名チェック」を提供しているのか</h2>
      <p style={{ marginBottom: 16 }}>在宅医療の現場で10年事務長を務めて感じてきたのは、<strong>ルールベースの点検だけでは、在宅医療特有の論点を拾いきれない</strong>ということです。</p>
      <p style={{ marginBottom: 16 }}>在宅医療には、外来診療と異なる固有の難所があります。</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}><strong>保険病名と実病名の乖離</strong>——同じ「認知症」でも、算定上の病名と医師カルテの記載が微妙にずれている</li>
        <li style={{ marginBottom: 8 }}><strong>訪問看護指示書との連動</strong>——指示書に記載した病名・状態と、レセプト病名が整合しているか</li>
        <li style={{ marginBottom: 8 }}><strong>在宅医療特有の加算要件</strong>——在宅時医学総合管理料・在医総管・施設総管・往診料の組合せルール</li>
        <li style={{ marginBottom: 8 }}><strong>包括算定下での個別対応</strong>——包括の中で取れる加算と取れない加算の境目</li>
        <li style={{ marginBottom: 8 }}><strong>状態変化に伴う病名追加忘れ</strong>——褥瘡発生・新規疾患の発症など、月の途中で起きる変化</li>
      </ul>
      <p style={{ marginBottom: 16 }}>これらは「ルール上の不整合」ではなく、<strong>「現場の文脈で起きるズレ」</strong>です。マイティーチェッカーが見るのは前者、MI-ZAが見るのは後者を含む全体像、と言えます。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>並べて比較すると</h2>
      <div style={{ overflowX: "auto", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.bg }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: `2px solid ${C.line}`, fontWeight: 700 }}>観点</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: `2px solid ${C.line}`, fontWeight: 700 }}>マイティーチェッカー</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: `2px solid ${C.line}`, fontWeight: 700, color: C.gold }}>MI-ZA（病名チェック / レセ事前チェック）</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}`, fontWeight: 700 }}>手法</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>ルールベース（マスタ参照）</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>AI（文脈読解）＋ 現役事務長の最終チェック</td></tr>
            <tr><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}`, fontWeight: 700 }}>専門領域</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>診療報酬全般（外来・入院・在宅）</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>在宅医療・訪問診療に特化</td></tr>
            <tr><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}`, fontWeight: 700 }}>検知対象</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>機械的不整合（投薬と病名の対応など）</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>文脈不整合（保険病名と実病名のずれ・指示書連動・在宅加算の組合せ）</td></tr>
            <tr><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}`, fontWeight: 700 }}>指示書連動</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>レセプトのみ</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>訪問看護指示書の病名記載まで横断チェック</td></tr>
            <tr><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}`, fontWeight: 700 }}>報告</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>エラーリスト（要解釈）</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>AI抽出 ＋ 月次レポート ＋ 人による解説</td></tr>
            <tr><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}`, fontWeight: 700 }}>導入工数</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>マスタ設定・運用学習が必要</td><td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.line}` }}>設定はMI-ZAが代行</td></tr>
            <tr><td style={{ padding: "10px 12px", fontWeight: 700 }}>料金（参考）</td><td style={{ padding: "10px 12px" }}>ソフト導入＋月額（規模に応じる）</td><td style={{ padding: "10px 12px" }}>AI伴走サービスに内包：月 ¥98,000（税別）／1事業所</td></tr>
          </tbody>
        </table>
      </div>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>「病名チェック」と「レセプト事前チェック」の違い</h2>
      <p style={{ marginBottom: 16 }}>MI-ZA内でも紛らわしいので整理します。AI伴走サービスでは両方を実施しています。</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}><strong>病名チェック</strong>——病名と処方薬・指示書・保険病名の整合性に特化。月次でのレセ提出前点検。</li>
        <li style={{ marginBottom: 8 }}><strong>レセプト事前チェック</strong>——病名チェックを含み、点数算定・加算・施設基準要件まで広げた週次の事前点検。</li>
      </ul>
      <p style={{ marginBottom: 16 }}>つまり <strong>レセプト事前チェック ⊃ 病名チェック</strong> の関係です。AI伴走サービスでは、両方を一括して提供しています。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>マイティーチェッカー導入済みクリニックでの併用</h2>
      <p style={{ marginBottom: 16 }}>「すでにマイティーチェッカーを入れている」というクリニックでも、MI-ZAの導入は意味があります。</p>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>マイティーチェッカーが <strong>機械的不整合の一次フィルター</strong>として機能</li>
        <li style={{ marginBottom: 8 }}>MI-ZAが <strong>在宅医療特有の文脈不整合の二次フィルター</strong>として機能</li>
        <li style={{ marginBottom: 8 }}>結果、ルールにも文脈にも漏れがない状態に</li>
      </ul>
      <p style={{ marginBottom: 16 }}>実際、当社が支援する在宅クリニックの中にはマイティーチェッカーを併用しているケースが複数あります。「マイティーで見つからなかった在宅特有の取りこぼしを、MI-ZAが拾ってくれた」という声をいただいています。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>選び方の目安</h2>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>外来も含めた汎用レセ点検が中心 → <strong>マイティーチェッカー</strong>で十分なケースが多い</li>
        <li style={{ marginBottom: 8 }}>在宅医療・訪問診療が主軸で、指示書・在宅加算・状態変化も含めて見たい → <strong>MI-ZAのAI伴走サービス</strong></li>
        <li style={{ marginBottom: 8 }}>事務長が不在 or 採用難で、業務全体を伴走してほしい → <strong>MI-ZAのAI伴走サービス</strong></li>
        <li style={{ marginBottom: 8 }}>既存ツール（マイティー含む）を残したまま、在宅特有の取りこぼしだけ補強したい → <strong>MI-ZAのAI伴走サービス（病名チェック・レセプト事前チェックを含む）と併用</strong></li>
      </ul>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>まとめ</h2>
      <p style={{ marginBottom: 16 }}>マイティーチェッカーは <strong>ルールベース×汎用診療向け</strong>の堅実な点検基盤。MI-ZAの病名チェック / レセプト事前チェックは <strong>AI×現役事務長×在宅医療特化</strong>の補完レイヤーです。</p>
      <p style={{ marginBottom: 16 }}>「どちらか」ではなく、「自院の診療スタイル・体制に合わせて、両者を組み合わせる」のが現実的な選び方です。お試し1週間の間にどの範囲の指摘が出るかを実データで確認していただけます。</p>

      <h2 style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.navy, marginTop: 36, marginBottom: 12 }}>関連リンク</h2>
      <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>
          📖 <a href="/blog/home-medical-secretary-day/" onClick={(e) => { e.preventDefault(); go(12); }} style={{ color: C.accent, textDecoration: "underline" }}>在宅医療事務長の1日：朝礼から月末締めまで</a>
        </li>
        <li style={{ marginBottom: 8 }}>
          📖 <a href="/blog/2026-reimbursement-revision/" onClick={(e) => { e.preventDefault(); go(13); }} style={{ color: C.accent, textDecoration: "underline" }}>2026年診療報酬改定で在宅医療クリニックが対応すべき5項目</a>
        </li>
        <li style={{ marginBottom: 8 }}>
          🌟 <a href="/contact/" onClick={(e) => { e.preventDefault(); go(6); }} style={{ color: C.accent, textDecoration: "underline" }}>AI伴走サービスの詳細（病名チェック・レセプト事前チェックを含む）</a>
        </li>
      </ul>
    </BlogPostLayout>
  );
}

/* ─── PRIVACY ─── */
function Privacy() {
  const items = [
    { h: "事業者名", d: "株式会社MI-ZA（ミーザ）" },
    { h: "個人情報保護管理者", d: "代表取締役　石塚（波村）美絵" },
    { h: "所在地", d: "東京都港区北青山1-3-1 アールキューブ青山3F" },
  ];
  const sections = [
    { h: "収集する個人情報", d: "お問い合わせフォームを通じて、氏名・医療機関名・役職・メールアドレス・電話番号・ご相談内容を収集します。" },
    { h: "利用目的", d: "収集した個人情報は、お問い合わせへの回答・ご連絡、およびサービスのご提案のみに使用します。それ以外の目的には使用しません。" },
    { h: "第三者への提供", d: "法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供することはありません。" },
    { h: "個人情報の管理", d: "個人情報への不正アクセス・紛失・破壊・改ざん・漏洩を防ぐため、適切な安全管理措置を講じます。" },
    { h: "個人情報の開示・訂正・削除", d: "ご本人から個人情報の開示・訂正・削除のご請求があった場合は、合理的な範囲で速やかに対応します。" },
    { h: "お問い合わせ窓口", d: "個人情報の取り扱いに関するご質問・ご請求は、本サイトのお問い合わせフォームよりご連絡ください。" },
    { h: "プライバシーポリシーの変更", d: "本ポリシーは、法令の改正やサービス内容の変更に応じて改定することがあります。改定後はこのページに掲載します。" },
  ];
  return (
    <>
      <section style={{ background: C.navy, paddingTop: 108, paddingBottom: 48, textAlign: "center" }}>
        <F>
          <p style={{ fontFamily: enFont, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 5, marginBottom: 10 }}>PRIVACY POLICY</p>
          <h1 style={{ fontFamily: sans, fontSize: 25, color: C.white, fontWeight: 700, margin: 0 }}>プライバシーポリシー</h1>
        </F>
      </section>
      <Sec>
        <F>
          <P style={{ marginBottom: 40 }}>株式会社MI-ZA（ミーザ）（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、以下の方針に従って適切に取り扱います。</P>
        </F>
        <F delay={0.1}>
          <div style={{ background: C.bg, padding: "29px 33px", marginBottom: 48 }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 24, paddingBottom: 12, marginBottom: 12, borderBottom: i < items.length - 1 ? `2px solid ${C.line}` : "none" }}>
                <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.navy, minWidth: 160, flexShrink: 0 }}>{item.h}</p>
                <p style={{ fontFamily: sans, fontSize: 14, color: C.mid, lineHeight: 1.8 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </F>
        {sections.map((s, i) => (
          <F key={i} delay={i * 0.05}>
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{i + 1}. {s.h}</p>
              <P style={{ fontSize: 14 }}>{s.d}</P>
            </div>
          </F>
        ))}
        <F>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.light, marginTop: 48 }}>制定日：2026年3月</p>
        </F>
      </Sec>
    </>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const [sendError, setSendError] = React.useState("");
  const [sending, setSending] = React.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    setSendError("");
    setSending(true);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(() => { setSubmitted(true); setSending(false); })
      .catch(() => { setSendError("送信に失敗しました。お手数ですが再度お試しください。"); setSending(false); });
  }
  return (
    <>
      <section style={{ background: C.navy, paddingTop: 108, paddingBottom: 48, textAlign: "center" }}>
        <F>
          <p style={{ fontFamily: enFont, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 5, marginBottom: 10 }}>CONTACT</p>
          <h1 style={{ fontFamily: sans, fontSize: 25, color: C.white, fontWeight: 700, margin: 0 }}>お問い合わせ</h1>
        </F>
      </section>
      {submitted ? (
        <Sec py={96}>
          <F>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: serif, fontSize: 21, color: C.navy, lineHeight: 1.9, marginBottom: 16 }} className="sp-heading">ご送信いただきありがとうございます。</p>
              <p style={{ fontFamily: sans, fontSize: 15, color: C.mid, lineHeight: 2 }}>3営業日以内にご連絡いたします。</p>
            </div>
          </F>
        </Sec>
      ) : (
        <Sec>
          <F><P>フォームにご入力いただき、送信するをクリックください。3営業日以内にご連絡します。</P></F>

          {/* 送信後の流れ */}
          <F delay={0.1}>
            <div style={{ display: "flex", alignItems: "center", gap: 0, margin: "33px 0 41px", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { n: "01", t: "フォームに入力" },
                { n: "02", t: "送信するをクリック" },
                { n: "03", t: "3営業日以内にご連絡" },
              ].map((s, i) => (
                <React.Fragment key={i}>
                  <div style={{ textAlign: "center", padding: "17px 21px", minWidth: 140 }}>
                    <p style={{ fontFamily: enFont, fontSize: 12, color: C.accent, letterSpacing: 3, marginBottom: 6 }}>{s.n}</p>
                    <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.navy, lineHeight: 1.6 }}>{s.t}</p>
                  </div>
                  {i < 2 && <p style={{ color: C.line, fontSize: 21, padding: "0 5px" }}>›</p>}
                </React.Fragment>
              ))}
            </div>
          </F>

          <F>
            <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} style={{ background: C.bg, padding: "41px 33px", marginTop: 24 }}>
              <input type="hidden" name="form-name" value="contact" />
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 6 }}>
                  お問い合わせ種別
                </label>
                <select name="お問い合わせ種別" defaultValue="" style={{ width: "100%", padding: "11px 15px", border: `2px solid ${C.line}`, fontFamily: sans, fontSize: 14, outline: "none", boxSizing: "border-box", background: C.white, color: C.navy, appearance: "auto" }}>
                  <option value="">選択してください（任意）</option>
                  <option value="無料相談（30分）の予約">無料相談（30分）の予約</option>
                  <option value="メルマガ登録">メルマガ登録</option>
                  <option value="AI伴走サービスについて">AI伴走サービスについて</option>
                  <option value="個別コンサルティングについて">個別コンサルティングについて</option>
                  <option value="動画教材（事務長養成プログラム）について">動画教材（事務長養成プログラム）について</option>
                  <option value="HP・採用ページ制作について">HP・採用ページ制作について</option>
                  <option value="取材・メディア掲載のご依頼">取材・メディア掲載のご依頼</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              {[["お名前",true],["医療機関名",true],["お役職",false],["メールアドレス",true],["お電話番号",false]].map(([l,req],i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 6 }}>
                    {l}{req && <span style={{ fontSize: 11, color: C.accent, marginLeft: 6 }}>必須</span>}
                  </label>
                  <input type="text" name={l} style={{ width: "100%", padding: "11px 15px", border: `2px solid ${C.line}`, fontFamily: sans, fontSize: 14, outline: "none", boxSizing: "border-box", background: C.white }} />
                </div>
              ))}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 6 }}>ご相談内容</label>
                <textarea rows={5} name="ご相談内容" style={{ width: "100%", padding: "11px 15px", border: `2px solid ${C.line}`, fontFamily: sans, fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", background: C.white }} />
              </div>
              {sendError && (
                <div role="alert" aria-live="assertive" style={{ background: "#fff4f4", border: "1px solid #d9534f", color: "#a73535", padding: "12px 16px", borderRadius: 4, marginBottom: 16, fontFamily: "sans-serif", fontSize: 14, textAlign: "center" }}>
                  {sendError}
                </div>
              )}
              <div style={{ textAlign: "center" }}><Btn type="submit" disabled={sending}>{sending ? "送信中..." : "送信する"}</Btn></div>
            </form>
          </F>
        </Sec>
      )}
    </>
  );
}

/* ─── APPLY (プラン選択) ─── */
// 04プラン先着10社の残り数（手動更新）
const REMAINING_FLAGSHIP = 10;


/* ─── APPLY FORM (申込フォーム) ─── */

/* ─── APPLY BOOKING (面談予約 / TimeRex placeholder) ─── */

/* ─── APPLY THANKS (申込完了) ─── */

/* ─── FOOTER ─── */
function Footer({ go }) {
  return (
    <footer style={{ background: C.navy, padding: "53px 25px 33px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 28, marginBottom: 36 }}>
          <div>
            <img src="logo-white.svg" alt="MI-ZA（ミーザ）" style={{ height: 100, width: "auto", marginBottom: 16, display: "block" }} />
            <p style={{ fontFamily: serif, fontSize: 13, color: "rgba(255,255,255,0.55)", letterSpacing: 1, marginBottom: 8 }}>次の在宅医療を、現場から。</p>
            <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.95 }}>
              株式会社MI-ZA（ミーザ）<br />東京都港区北青山1-3-1 アールキューブ青山3F<br />在宅医療に特化した経営支援・DXコンサルティング
            </p>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "flex-end", alignSelf: "flex-start" }}>
              {[0, 1, 4, 2, 3, 12, 5, 6, 7].map(i => {
                const p = PAGES[i];
                return <a key={i} href={p.url} onClick={(e) => { e.preventDefault(); go(i); }} style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.4)", cursor: "pointer", textDecoration: "none" }}>{p.ja}</a>;
              })}
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "center", marginTop: 36, paddingTop: 24, borderTop: "2px solid rgba(255,255,255,0.07)" }}>
          <a href="https://note.com/miemove" target="_blank" rel="noopener noreferrer" title="note（代表ブログ）" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", display: "inline-flex", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"} onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}><path d="M0 .279c4.623 0 10.953-.235 15.498-.117 6.099.156 8.39 2.813 8.468 9.374.077 3.71 0 14.335 0 14.335h-6.598c0-9.296.04-10.83 0-13.759-.078-2.578-.814-3.807-2.795-4.041-2.097-.235-7.975-.04-7.975-.04v17.84H0Z"/></svg>
          </a>
          <a href="https://www.instagram.com/miza_illustration/" target="_blank" rel="noopener noreferrer" title="Instagram（イラストデモ）" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", display: "inline-flex", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"} onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ display: "block" }}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
        </div>
        <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.18)", textAlign: "center", marginTop: 16 }}>© 2026 株式会社MI-ZA（ミーザ）</p>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
function App() {
  const getInitPage = () => {
    const raw = window.location.pathname || "/";
    const path = raw.endsWith("/") ? raw : raw + "/";
    const idx = PAGES.findIndex(p => {
      if (p.url === "/") return path === "/";
      const target = p.url.endsWith("/") ? p.url : p.url + "/";
      return path === target;
    });
    return Math.max(0, idx);
  };
  const [cur, setCur] = useState(getInitPage);
  const scrollAnchorRef = useRef(null);
  const updateMeta = (i) => {
    const p = PAGES[i];
    document.title = p.title;
    const set = (sel, prop, val) => { const el = document.querySelector(sel); if (el) el[prop] = val; };
    set('meta[name="description"]', 'content', p.desc);
    set('meta[name="robots"]', 'content', (p.url === "/privacy/" || p.url === "/contact/" || p.url.startsWith("/contact/form") || p.url.startsWith("/contact/booking") || p.url.startsWith("/contact/thanks")) ? "noindex, follow" : "index, follow");
    set('link[rel="canonical"]', 'href', "https://mi-za.jp" + p.url);
    set('meta[property="og:url"]', 'content', "https://mi-za.jp" + p.url);
    set('meta[property="og:title"]', 'content', p.title);
    set('meta[property="og:description"]', 'content', p.desc);
    set('meta[name="twitter:title"]', 'content', p.title);
    set('meta[name="twitter:description"]', 'content', p.desc);
    const oldBc = document.getElementById("breadcrumb-jsonld");
    if (oldBc) oldBc.remove();
    if (p.url !== "/") {
      const bc = document.createElement("script");
      bc.type = "application/ld+json";
      bc.id = "breadcrumb-jsonld";
      bc.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: "https://mi-za.jp/" },
          { "@type": "ListItem", position: 2, name: p.ja, item: "https://mi-za.jp" + p.url }
        ]
      });
      document.head.appendChild(bc);
    }
  };
  const go = (i, anchor) => {
    scrollAnchorRef.current = anchor || null;
    setCur(i);
    const p = PAGES[i];
    const url = p.url + (anchor ? "#" + anchor : "");
    history.pushState({ page: i }, p.title, url);
    updateMeta(i);
    if (!anchor) window.scrollTo({ top: 0, behavior: "instant" });
  };
  useEffect(() => {
    // 初期ロード時にメタ更新（直接 /privacy/ にアクセスした場合のnoindex等）
    updateMeta(cur);
    const handlePop = (e) => {
      const i = e.state?.page ?? getInitPage();
      setCur(i);
      updateMeta(i);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);
  return (
    <div>
      <Nav cur={cur} go={go} />
      <main>
        {cur === 0 && <Home    go={go} />}
        {cur === 1 && <Service go={go} scrollAnchorRef={scrollAnchorRef} />}
        {cur === 2 && <Cases   go={go} />}
        {cur === 3 && <Company go={go} />}
        {cur === 4 && <Member  go={go} />}
        {cur === 5 && <Blog        go={go} />}
        {cur === 6 && <Contact />}
        {cur === 7 && <Privacy />}
        {cur === 12 && <BlogPost1   go={go} />}
        {cur === 13 && <BlogPost2   go={go} />}
        {cur === 14 && <BlogPost3   go={go} />}
      </main>
      <Footer go={go} />
    </div>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />);
