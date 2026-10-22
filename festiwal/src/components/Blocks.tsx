import { Album } from "@/components/Album";
import { FadeImg } from "@/components/FadeImg";
import { GoingWidget } from "@/components/GoingWidget";
import { ShopGallery } from "@/components/ShopGallery";
import type { Block, Section, Text } from "@/data/pages";
import { TICKETS_URL, type Lang } from "@/data/site";
import { fixOrphans } from "@/lib/typography";
import { useFitText } from "@/lib/useFitText";
import { useState, type ReactNode } from "react";

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*([^*]+)\*/g;

function Rich({ text: raw }: { text: string }) {
  const text = fixOrphans(raw);
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const at = match.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    parts.push(
      match[1] ? (
        <a
          key={at}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-1 underline-offset-[0.18em] transition-opacity hover:opacity-70"
        >
          {match[1]}
        </a>
      ) : (
        <em key={at}>{match[3]}</em>
      ),
    );
    last = at + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function FitLine({
  text,
  as: Tag = "p",
  className,
}: {
  text: string;
  as?: "p" | "h2";
  className?: string;
}) {
  const ref = useFitText<HTMLElement>(0.5, text);
  const setRef = (element: HTMLElement | null) => {
    ref.current = element;
  };
  return (
    <Tag
      ref={setRef}
      className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}
    >
      <Rich text={text} />
    </Tag>
  );
}

function Paragraphs({
  items,
  nowrap = [],
  textClassName = "text-[calc(6.4rem*var(--type))]",
}: {
  items: string[];
  nowrap?: number[];
  textClassName?: string;
}) {
  return (
    <div
      className={`flex max-w-[128.4rem] flex-col gap-[5.76rem] font-classico ${textClassName} leading-[0.9]`}
    >
      {items.map((paragraph, index) =>
        nowrap.includes(index) ? (
          <FitLine key={index} text={paragraph} />
        ) : (
          <p key={index} className="whitespace-pre-line">
            <Rich text={paragraph} />
          </p>
        ),
      )}
    </div>
  );
}

function Faq({
  items,
  lang,
}: {
  items: { question: Text; answer: Record<Lang, string[]> }[];
  lang: Lang;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={index}
            className={index > 0 ? "border-t border-current" : ""}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-start justify-between gap-[4rem] border-0 bg-transparent py-[3.2rem] text-left font-classico text-[calc(6.4rem*var(--type))] leading-[0.9] text-inherit"
            >
              <span>{fixOrphans(item.question[lang])}</span>
              <span
                aria-hidden
                className="shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>
            <div
              id={`faq-${index}`}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pb-[4.4rem]">
                  <Paragraphs
                    items={item.answer[lang]}
                    textClassName="text-[calc(4.2rem*var(--type))]"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Facts({
  items,
  lang,
}: {
  items: { label: Text; value: Text }[];
  lang: Lang;
}) {
  return (
    <dl className="flex flex-nowrap max-md:flex-col max-md:gap-y-[4rem]">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex min-w-0 flex-col gap-[1.6rem] md:pr-[5rem] ${
            index > 0 ? "md:border-l-[0.2rem] md:border-current md:pl-[5rem]" : ""
          } max-md:flex-row max-md:items-baseline max-md:justify-between max-md:gap-[4rem]`}
        >
          <dt className="font-hanken text-[calc(2.4rem*var(--type))] leading-none uppercase">
            {item.label[lang]}
          </dt>
          <dd className="font-classico text-[calc(10rem*var(--type))] leading-[0.9] whitespace-nowrap">
            {item.value[lang]}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CopyCode({ code, label, lang }: { code: string; label: Text; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="flex flex-col items-start gap-[1.6rem]">
      <span className="font-hanken text-[calc(2.4rem*var(--type))] leading-none uppercase">
        {label[lang]}
      </span>
      <button
        type="button"
        onClick={copy}
        className="flex max-w-full cursor-pointer items-baseline gap-[4rem] rounded-full border-[0.2rem] border-current bg-transparent px-[5rem] py-[2.6rem] text-inherit transition-opacity hover:opacity-70 max-md:flex-col max-md:items-start max-md:gap-[1.2rem] max-md:rounded-[4.4rem]"
      >
        <span className="font-classico text-[calc(8.2rem*var(--type))] leading-[0.9] tracking-[0.02em] break-all">
          {code}
        </span>
        <span aria-live="polite" className="font-hanken text-[calc(2.4rem*var(--type))] leading-none uppercase">
          {copied
            ? lang === "pl" ? "Skopiowano" : "Copied"
            : lang === "pl" ? "Kopiuj" : "Copy"}
        </span>
      </button>
    </div>
  );
}

function BlockView({ block, lang }: { block: Block; lang: Lang }) {
  switch (block.type) {
    case "heading":
      return (
        <FitLine
          as="h2"
          text={block.text[lang]}
          className="-mb-[0.15em] pb-[0.15em] font-classico text-[calc(12.8rem*var(--type))] leading-[0.9]"
        />
      );
    case "text":
      return (
        <Paragraphs
          items={block.paragraphs[lang]}
          nowrap={block.nowrap}
          textClassName={
            block.textSize === "small" ? "text-[calc(3.2rem*var(--type))]" : undefined
          }
        />
      );
    case "facts":
      return <Facts items={block.items} lang={lang} />;
    case "code":
      return <CopyCode code={block.code} label={block.label} lang={lang} />;
    case "statement":
      return (
        <p className="max-w-[128.4rem] font-classico text-[calc(10rem*var(--type))] leading-none">
          <Rich text={block.text[lang]} />
        </p>
      );
    case "photos":
      return (
        <div className="flex gap-[4.4rem]">
          {block.photos.map((photo) => (
            <div
              key={photo.src}
              className="relative h-[70.58rem] shrink-0 overflow-hidden rounded-[50%] bg-[color-mix(in_srgb,currentColor_12%,transparent)]"
              style={{ width: `${photo.width}rem` }}
            >
              <FadeImg src={asset(photo.src)} alt={photo.alt[lang]} />
            </div>
          ))}
        </div>
      );
    case "links":
      return (
        <div className="flex flex-col items-start gap-[2.6rem] font-classico text-[calc(6.4rem*var(--type))] leading-[0.9]">
          {block.links.map((link, index) => (
            <a
              key={index}
              href={(typeof link.href === "string" ? link.href : link.href[lang]) || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-current pb-[0.9rem] transition-opacity hover:opacity-70"
            >
              {link.label[lang]}
            </a>
          ))}
        </div>
      );
    case "embed":
      return block.src ? (
        <iframe
          src={block.src}
          title={block.title[lang]}
          loading="lazy"
          className="w-full rounded-[2.4rem] border-0"
          style={{ height: `${block.height}rem` }}
        />
      ) : (
        <a
          href={TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start rounded-[2.4rem] border-[0.2rem] border-current px-[3.2rem] py-[2rem] font-classico text-[calc(6.4rem*var(--type))] leading-[0.9] transition-opacity hover:opacity-70"
        >
          {lang === "pl" ? "Kup bilet w Going" : "Buy tickets on Going"}
        </a>
      );
    case "going":
      return <GoingWidget lang={lang} />;
    case "gallery":
      return <ShopGallery items={block.items} lang={lang} />;
    case "faq":
      return <Faq items={block.items} lang={lang} />;
    case "album":
      return <Album photos={block.photos} lang={lang} />;
  }
}

export function Blocks({
  sections,
  lang,
}: {
  sections: Section[];
  lang: Lang;
}) {
  return (
    <>
      {sections.map((section, index) => (
        <section
          key={index}
          className={`flex flex-col gap-[5rem] py-[6rem] ${
            index > 0 ? "border-t-[0.2rem] border-current" : ""
          }`}
        >
          {section.map((block, blockIndex) => (
            <BlockView key={blockIndex} block={block} lang={lang} />
          ))}
        </section>
      ))}
    </>
  );
}
