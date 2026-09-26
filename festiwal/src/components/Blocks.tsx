import { FadeImg } from "@/components/FadeImg";
import type { Block, Section, Text } from "@/data/pages";
import { TICKETS_URL, type Lang } from "@/data/site";
import { useState, type ReactNode } from "react";

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*([^*]+)\*/g;

function Rich({ text }: { text: string }) {
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

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex max-w-[128.4rem] flex-col gap-[5.76rem] font-classico text-[6.4rem] leading-[0.9]">
      {items.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line">
          <Rich text={paragraph} />
        </p>
      ))}
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
              className="flex w-full cursor-pointer items-start justify-between gap-[4rem] border-0 bg-transparent py-[3.2rem] text-left font-classico text-[6.4rem] leading-[0.9] text-inherit"
            >
              <span>{item.question[lang]}</span>
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
                  <Paragraphs items={item.answer[lang]} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BlockView({ block, lang }: { block: Block; lang: Lang }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="font-classico text-[12.8rem] leading-[0.9]">
          {block.text[lang]}
        </h2>
      );
    case "text":
      return <Paragraphs items={block.paragraphs[lang]} />;
    case "statement":
      return (
        <p className="max-w-[128.4rem] font-classico text-[10rem] leading-none">
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
        <div className="flex flex-col items-start gap-[2.6rem] font-classico text-[6.4rem] leading-[0.9]">
          {block.links.map((link, index) => (
            <a
              key={index}
              href={link.href || undefined}
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
          className="self-start rounded-[2.4rem] border-[0.2rem] border-current px-[3.2rem] py-[2rem] font-classico text-[6.4rem] leading-[0.9] transition-opacity hover:opacity-70"
        >
          {lang === "pl" ? "Kup bilet w Going" : "Buy tickets on Going"}
        </a>
      );
    case "faq":
      return <Faq items={block.items} lang={lang} />;
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
