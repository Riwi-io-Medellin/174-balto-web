import { ExternalLink, FileText } from "lucide-react";
import type { VerificationDocument } from "../types";

export function DocumentLinks({
  documents,
}: {
  documents: VerificationDocument[];
}) {
  if (documents.length === 0) {
    return <span className="text-sm text-zinc-500">Sin documentos</span>;
  }

  return (
    <div className="flex flex-col gap-2">
      {documents.map((document) => (
        <a
          key={document.id}
          href={document.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 transition hover:border-[#9dd0d0]/40 hover:bg-white/[0.07]"
        >
          <span className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-[#9dd0d0]" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-white">
                {document.documentType}
              </span>
              <span className="mt-0.5 block text-xs text-zinc-500">
                {formatDate(document.createdAt)}
              </span>
            </span>
          </span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-500 transition group-hover:text-[#9dd0d0]" />
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
