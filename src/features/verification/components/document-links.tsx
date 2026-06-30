import { ExternalLink, FileText } from "lucide-react";
import type { VerificationDocument } from "../types";

export function DocumentLinks({
  documents,
}: {
  documents: VerificationDocument[];
}) {
  if (documents.length === 0) {
    return <span className="text-sm font-semibold text-[#8b95a4]">Sin documentos</span>;
  }

  return (
    <div className="flex flex-col gap-2">
      {documents.map((document) => (
        <a
          key={document.id}
          href={document.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-3 rounded-2xl border border-[#e5e7eb] bg-[#fbfcff] px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-[#6d7cff]/35 hover:bg-white hover:shadow-sm"
        >
          <span className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-[#6d7cff]" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-black text-[#16215c]">
                {document.documentType}
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-[#8b95a4]">
                {formatDate(document.createdAt)}
              </span>
            </span>
          </span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#8b95a4] transition group-hover:text-[#6d7cff]" />
        </a>
      ))}
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}
